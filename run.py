#!/usr/bin/python
# -*- coding:utf-8 -*-

"""Documentation"""

from sanic import Sanic, response
from sanic.exceptions import *
import markdown
import os
import aiofiles


import generate

app = Sanic()

#静态文件
app.static('/static', './static/')
app.static('/favicon.ico','./static/images/favicon.png')
app.static('/articles/','./articles/')

@app.route("/api/articles/")
async def article_list(request):
    _json = generate.get_article_list()
    return response.json(_json)
    
@app.route("/api/upload/", methods=['POST'])
async def article_list(request):

    f = request.files.get('file')
    [pwd] = request.args['pwd']
    
    if await checkPassword(pwd):
        
        async with aiofiles.open(os.path.join('articles',f.name[:-3]+'.html'),mode='w',encoding='utf-8') as html:
            file = markdown.markdown(f.body.decode())
            await html.write(file)
        return response.text('上传成功')
    return response.text('口令错误')

    

async def checkPassword(pwd):
    async with aiofiles.open('password') as f:
        ans = await f.read()
        if pwd == ans:
            return True
        return False



@app.route("/")

async def page_index(request):
    """页面-首页
    """
    return await response.file('./static/index.html')


# 注册api接口的blueprint


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5002,

        debug=True,
    )
    pass

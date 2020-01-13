import aiofiles
import os
# 返回包含title，modify_time的json
def get_article_list():
    dir_list = os.listdir('articles')
    try:
        dir_list.remove('about.html')
        dir_list.remove('contact.html')
        dir_list.remove('intro.html')
    except:
        pass
    
    return [{'title':title[:-5],'modify_time':os.path.getmtime(os.path.join('articles',title)) } for title in dir_list]

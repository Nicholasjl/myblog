

function get_head(name){
    url='/articles/' + name + '.html';
    $.ajax({
        type: "get",
        dataType: "html",
        url: url,
        success: function(data) {
            $('#'+name+'-b').html(data);
        }
    });
    
}

function get_article(name){
    url='/articles/' + name + '.html';
    $.ajax({
        type: "get",
        dataType: "html",
        url: url,
        success: function(data) {
            $("#article-b").html(data);
            
        }
    });
    
    
}

var ARTICLE_ITEM_TEMPLATE ="\
    <a href='#article' onclick=get_article('{title}')>\
    <h3>{title}</h3>\
    <h4>{modify_time}</h4>\
    </a>\
";



function sort(data) {
    var separator = "{#}";
    var ls = [];
    for (var k in data) {
        ls.push(data[k]["modify_time"] + separator + k);
    }
    ls.sort();

    var sortedData = {};
    for (var i = ls.length - 1; i >= 0; i--) {
        var key = ls[i].split(separator)[1];
        sortedData[key] = data[key];
    }
    return sortedData;

}

function renderArticleItem(data) {
    
    
    var articleHtml = "";
    for (var key in data) {
        
        if (data[key]["title"]){
                articleHtml += ARTICLE_ITEM_TEMPLATE
                .replace(/\{title}/g, data[key]["title"])
                .replace(/\{modify_time}/g, jutils.formatDate(new Date(data[key]["modify_time"]*1000),"YYYY-MM-DD 周W"))
        }
            

    }
    $("#list-b").html(articleHtml);
}



function getArticleList() {
    var url = "/api/articles/";
    $.ajax({
        type: "get",
        dataType: "json",
        url: url,
        success: function(data) {
            renderArticleItem(data);
        }
    });
};
$(function(){
    getArticleList();
    get_head('intro');
    get_head('about');
    get_head('contact');
    $('body').keydown(function(){
		
		if(event.keyCode==116) {
            
            location.href="#";
           
        }
        return;
	});
})
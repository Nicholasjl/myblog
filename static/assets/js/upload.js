var uploadFiles = new Array();

$(function(){ 
    //阻止浏览器默认行为。 
    $(document).on({ 
        dragleave:function(e){    //拖离 
            e.preventDefault(); 
        }, 
        drop:function(e){  //拖后放 
            e.preventDefault(); 
        }, 
        dragenter:function(e){    //拖进 
            e.preventDefault(); 
        }, 
        dragover:function(e){    //拖来拖去 
            e.preventDefault(); 
        } 
    }); 
    var box = document.getElementById('md_file'); //拖拽区域 
    box.addEventListener("drop",function(e){ 
        e.preventDefault(); //取消默认浏览器拖拽效果 
        var fileList = e.dataTransfer.files; //获取文件对象 
        //检测是否是拖拽文件到页面的操作 
        if(fileList.length == 0){ 
            return false; 
        } 
        AddFiles(fileList);
    },false); 
}); 

function Upload(){
    
    if(uploadFiles.length <= 0){
        return;
    }
    
    
    uploadcount = uploadFiles.length ;
    
    var url = "/api/upload/?pwd="+sha256($('#pwd').val());                    // 接收上传文件的后台地址
    // FormData 对象
    var form = new FormData();
    
    for (var i=0; i< uploadcount; i++){
        form.append("file",uploadFiles[i]); 
        
        $.ajax({
            url: url,
            type:'post',
            data: form,
            contentType: false,
            processData: false,
            success: function(data){
                alert(data);
                
            }
        });
    }

    
    
}
function onc(){
    var files = document.getElementById("md_file").files;
    if(files.length < 0){
        return ;
    }
    AddFiles(files);
}
function AddFiles(files){
    var errstr = "";
    for(var i=0; i< files.length; i++){
        var filename = files[i].name;
        var isfind = false;
        for(var j=0; j< uploadFiles.length; j++){
            if(uploadFiles[j].name == filename){
                isfind = true;
                break;
            }
        }
        var index1=filename.lastIndexOf(".");  
        var index2=filename.length;
        var postf=filename.substring(index1+1,index2);//后缀名  
        var myarray = new Array('md');
        if($.inArray(postf,myarray) == -1){
            errstr += filename + "/";
            continue;
        }
        if(isfind == false){
            uploadFiles.push(files[i]);
        }
    }
    if(errstr != ""){
        alert("文件格式错误:"+errstr);
    }
    var fileliststring = "";
    for(var j=0; j< uploadFiles.length; j++){
        fileliststring += uploadFiles[j].name + "</br>";
    }
    document.getElementById("mask").innerHTML=fileliststring;
}

function fileUpload(file) {        
    const xhr= new XMLHttpRequest();
    xhr.open('GET',`/sign-s3?file-name=${encodeURIComponent(file.name)}&file-type=${file.type}`);
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===4 && xhr.status===200){
            const response=JSON.parse(xhr.responseText);            
            uploadFile(file,response.signedRequest,response.url)
        }
    }
    xhr.send();
}
function uploadFile(file,signedRequest,url){    
    const xhr=new XMLHttpRequest();
    xhr.open('PUT',signedRequest);
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===4 && xhr.status===200){
            document.getElementById('Poster-url').value=url;
        }
    }
    xhr.send(file);
}

exports.fileUpload=fileUpload;

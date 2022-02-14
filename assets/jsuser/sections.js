function hideall(){
    document.getElementById('dashboard_section').classList.add("d-none");
    document.getElementById('profile_section').classList.add("d-none");
    document.getElementById('file_section').classList.add("d-none");
}

function showdashboard_section(){
    hideall();
    // var a=document.getElementsByClassName('inputDiv')
    // for(let i=0;i<a.length;i++){
    //     a[i].id=`inputDiv${i}`
    // }
    document.getElementById('dashboard_section').classList.remove("d-none");
}


function showprofile_section(){
    hideall();
    document.getElementById('profile_section').classList.remove("d-none");
}
function showfile_section(){
    hideall();
    document.getElementById('file_section').classList.remove("d-none");
}



//Function for File Inputs View

function openInputDrop(a){
    var html=document.getElementById(`inputDrop${a}`).innerHTML;
  
    
    document.getElementById('uploadSection').innerHTML=html;
    
}





//Function to validate uploaded file.

function fileUpload(elem){
    
    elem.children[1].click();
    elem.style.background="green";
    elem.innerHTML=`<i class="fa fa-lg fa-check"></i>Uploaded`;
    console.log("DONE");
    

    
    
}
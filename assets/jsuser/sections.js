function hideall(){
    document.getElementById('dashboard_section').classList.add("d-none");
    document.getElementById('file_section').classList.add("d-none");
    // document.getElementById('profile_section').classList.add("d-none");
    document.getElementById('courseFile_section').classList.add("d-none");
    document.getElementById('home_section').classList.add("d-none");
}


var courseName=null
var semValue=null
var sessionValue=null

function showdashboard_section(){
    hideall();
    courseName=prompt("Name of the Course")
    semValue=prompt("Even or Odd Semester")
    sessionValue=prompt("Enter Session")

    console.log(courseName,semValue,sessionValue)
    document.getElementById('dashboard_section').classList.remove("d-none");
    
}

function showfile_section(){
    hideall();
    document.getElementById('fileViewIcon').classList.remove('fa-file');
    document.getElementById('fileViewIcon').classList.add('fa-spinner');
    document.getElementById('fileViewIcon').classList.add('fa-spin');
    showAllFiles();
   

}
function showhome_section(){
    hideall();
    document.getElementById('home_section').classList.remove("d-none");
}

//Function for File Inputs View

function openInputDrop(a){
    var html=document.getElementById(`inputDrop${a}`).innerHTML;
  
    
    document.getElementById('uploadSection').innerHTML=html;
    
}









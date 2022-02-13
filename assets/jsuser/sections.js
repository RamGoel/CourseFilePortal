function hideall(){
    document.getElementById('dashboard_section').classList.add("d-none");
    document.getElementById('profile_section').classList.add("d-none");
    document.getElementById('file_section').classList.add("d-none");
}

function showdashboard_section(){
    hideall();
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
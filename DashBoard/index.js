function viewSideBar(){
   

    var elem1=document.getElementById('sideBar').classList;
    elem1.toggle('dNone')
    console.log(elem1)
    
}

function openDropDown(a){

    var e1=document.getElementById(`dropList${a}`).classList
    e1.toggle('dropOpen');
    

    console.log( document.getElementById(`dropList${a}`).classList)

}


function viewInfo(){
    var elem3=document.getElementById('infoList').classList;
    elem3.toggle('dNone')
}



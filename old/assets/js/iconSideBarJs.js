function viewSideBar(){
   

    var elem1=document.getElementById('sideBar').classList;
    elem1.toggle('viewSide')
    console.log(elem1)
    
}

function openDropDown(a){

    var e1=document.getElementById(`dropList${a}`).classList;
    e1.toggle('dNone')
    e1.toggle('dropOpen')
    
    var e2=document.getElementsByClassName('sideBarItemToolTip');
    for(var i=0;i<e2.length;i++){
        e2[i].classList.toggle('dNone')
    }
    
    document.getElementById(`sideBarItem${a}`).classList.toggle('bgb')

    console.log( document.getElementById(`dropList${a}`).classList)

}


function viewInfo(){
    var elem3=document.getElementById('infoList').classList;
    elem3.toggle('dNone')
}



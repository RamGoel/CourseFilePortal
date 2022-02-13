firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        location.replace("index.html")
    }
    var Name = user.displayName;
    var Email = user.email;
    var Roll_No = user.photoURL;
    document.getElementById("user-name-card").innerHTML = Name;
})

// Logout Function with Prompt
function logoutwithprompt() {
    Swal.fire({
        icon: 'question',
        title: 'Are you sure you want to logout?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`
    }).then((result) => {
        if (result.isConfirmed) {
            firebase.auth().signOut()
        }
    })
}

function logout() {
    firebase.auth().signOut()
}


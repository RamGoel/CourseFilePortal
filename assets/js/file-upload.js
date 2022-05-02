var arr = []
document.getElementById('mainForm').addEventListener('submit', (e) => {
  e.preventDefault()
  const inputs = document.querySelectorAll('input')
  arr = Array.from(inputs);
  arr.filter((elem) => {
    return elem.type == "file"
  })

  alert("File has been Created, View in View Files Section")

  // download(doc)


})

const names = []

function uploadFile(event, elem) {
  var uploader = elem.parentElement.previousElementSibling;
  var elemeFather = elem.parentElement
  elem.parentElement.innerHTML = `<i class="my-0 fa fa-spinner fa-spin fa-2x "></i>`
  var file = event.target.files[0];
  var storageRef = firebase.storage().ref();
  let userName = document.getElementById('user-name-card').innerText
  var fileRef = storageRef.child(`${userName}/${sessionValue}/${semValue}/${courseName}/${file.name}`);
  fileRef.put(file).then((result) => {
    const url = `gs://${result.ref.location.bucket}/${result.ref.location.path}`
    console.log(url)
    percentage = (result.bytesTransferred / result.totalBytes) * 100;
    uploader.value = percentage;
    if (percentage == 100) {

      elemeFather.innerHTML = `<i class="fa fa-lg fa-check"></i><p class="my-0">Uploaded</p>`
      elemeFather.style.backgroundColor = "green"
    }

  })
  names.push(file.name);



}


function showAllFiles() {
  const container = document.getElementById('allFilesContainer');
  console.log('executed')
  let sessionValue = prompt("Which Session")
  let semValue = prompt("Even or Odd semester")

  // Create a reference under which you want to list
  var storageRef = firebase.storage().ref();
  let userName = document.getElementById('user-name-card').innerText
  var listRef = storageRef.child(`${userName}/${sessionValue}/${semValue}`);

  // Find all the prefixes and items.
  listRef.listAll()
    .then((res) => {
      if (res.prefixes.length >= 1) {

        container.innerHTML = ""
        res.prefixes.forEach((folderRef) => {
          // All the items under listRef.
          console.log(folderRef)
          const fileVar = folderRef.location.path_.split('/');
          const fileName = fileVar[fileVar.length - 1]
          const authorName = folderRef.location.path_.split('/')[0]
          console.log(fileName)

          const newNode = ` <div class="fileDiv">
          <div class="fileText">
      
              <p class="fileTitle">${fileName}</p>
              <p class="filePara">${authorName}</p>
              <p class="d-none " id="respectiveRef">${folderRef.location.path_}</p>
          </div>
      
          <div class="fileIcons">
              <div class="icon" onclick="deleteFile(this.parentElement.previousElementSibling.lastElementChild.innerText)">
                  <i class="fa fa-2x fa-trash "></i>
                  <p class="fileToolTip">Delete</p>
              </div>
              <div class="icon" onclick="viewFile(this.parentElement.previousElementSibling.lastElementChild.innerText)">
                  <i class="fa fa-2x fa-eye "></i>
                  <p class="fileToolTip">View</p>
              </div>
              <div class="icon">
                  <i class="fa fa-2x fa-share "></i>
                  <p class="fileToolTip">Share</p>
              </div>
      
      
      
          </div>
      
      </div>`



          container.innerHTML += newNode;

        });

      } else {
        container.innerHTML = "<p>No Files availible for this Data</p>"
      }

      document.getElementById('file_section').classList.remove("d-none");
      document.getElementById('fileViewIcon').classList.remove('fa-spinner');
      document.getElementById('fileViewIcon').classList.remove('fa-spin');
      document.getElementById('fileViewIcon').classList.add('fa-file');


    }).catch((error) => {
      console.log("Uh-oh, an error occurred!", error)
    });
}



function deleteInnerFiles(pathToFile, fileName) {
  const ref = firebase.storage().ref(pathToFile);
  const childRef = ref.child(fileName);
  childRef.delete()
}

function deleteFile(path) {


  const ref = firebase.storage().ref(path);
  const choice = window.confirm("Do you really want to delete this File?")
  document.getElementById('allFilesContainer').innerHTML = '<i class="fa fa-2x fa-spinner fa-spin"></i>'

  if (choice) {
    ref.listAll().then(dir => {
      dir.items.forEach(fileRef => this.deleteInnerFiles(ref.fullPath, fileRef.name));
      dir.prefixes.forEach(folderRef => this.deleteFolder(folderRef.fullPath))
      showAllFiles()
    }).catch(error => console.log(error));
  } else {

  }




}



function viewFile(path) {
  alert("Veomm")
  console.log("Ashok")
  var container = document.getElementById('subFileContainer')
  container.innerHTML = ""
  var storageRef = firebase.storage().ref();
  var listRef = storageRef.child(path);

  var folderName=path.split('/')

  document.getElementById('courseFileName').innerText=folderName[folderName.length-1]
  listRef.listAll().then((res) => {
    if (res.items.length >= 1) {

      res.items.forEach((itemRef) => {
        // All the items under listRef.
        console.log(itemRef)
        const fileVar = itemRef.location.path_.split('/');
        const fileName = fileVar[fileVar.length - 1]
        const authorName = itemRef.location.path_.split('/')[0]
        console.log(fileName)

        var subFileRef = storageRef.child(`${path}/${fileName}`)
        subFileRef.getDownloadURL().then((url) => {
          console.log(url)
          const newNode = `<button id="subFileName" class="btn btn-dark w-100 my-1" onclick="document.getElementById('subFileIframe').src='${url}'">${fileName}</button>`
          container.innerHTML += newNode;
        }).catch((response) => {
          alert(response.message)
        })






      });

    } else {
      container.innerHTML = "<p>No Files availible in this Course File</p>"
    }
  })

  hideall()
  document.getElementById('courseFile_section').classList.remove("d-none");

}
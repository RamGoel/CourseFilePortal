// function mergeAllPDFs(nameArr) {

//   var urls = []
//   if (nameArr.length >= 1) {
//     const storageRef = firebase.storage().ref()
//     let i = 0;
//     for (i = 0; i < nameArr.length; i++) {
//       let userName = document.getElementById('user-name-card').innerText
//       var fileRef = storageRef.child(`${userName}/${nameArr[i]}`);
//       fileRef.getDownloadURL().then((url) => {
//         urls.push(url)
//         console.log("Link Found")
//       }).catch((response) => {
//         alert(response.message)
//       })
//     }

//     console.log("URL Array is", urls)
//     copyPages(urls)

//   } else {
//     alert("No File Selected")
//   }


// }




// async function copyPages(urlArr) {
//   const url = ['https://firebasestorage.googleapis.com/v0/b/course-file-portal-abesec.appspot.com/o/Ram%2FE-cell%20Synopsis-2.pdf?alt=media&token=0a52b282-c9ef-41a5-b86e-105d801a9764','https://pdf-lib.js.org/assets/with_update_sections.pdf']

//   // const url=Array.from(urlArr)
//   console.log("*****",url)
//   const pdfDoc = await PDFLib.PDFDocument.create();
//   const numDocs = url.length;
//   console.log("hitted")
//   var  count=0;
//   for(var i = 0; i < numDocs; i++) {
//       const doc=url[i]
//       console.log(doc)
//       const donorPdfBytes = await fetch(doc).then(res => res.arrayBuffer()).catch((err)=>{
//         console.log("myError",err)
//       });
//       const donorPdfDoc = await PDFLib.PDFDocument.load(donorPdfBytes);
//       console.log(donorPdfDoc)
//       const docLength = donorPdfDoc.getPageCount();
//       console.log(docLength)

//       for(var k = 0; k < docLength; k++) {

//           const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);
//           console.log("Doc " + i+ ", page " + k);
//           pdfDoc.insertPage(count,donorPage);
//           count++;
//       }

//   const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

//   document.getElementById('dashboard_section').innerHTML=`<iframe id="pdf" src="${pdfDataUri}" style="width: 100%; height: 90vh;"></iframe>`
// }

// }




document.getElementById('mainForm').addEventListener('submit', (e) => {
  e.preventDefault()
  const inputs = document.querySelectorAll('input')

  var arr = Array.from(inputs);
  arr.filter((elem) => {
    return elem.type == "file"
  })

  var doc = new jsPDF();
  doc.text("Hello world!", 20, 20);
  doc.text("This is client-side Javascript, pumping out a PDF.", 20, 30);
  doc.addPage("a6", "l");
  doc.text("Do you like that?", 20, 20);

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
  var fileRef = storageRef.child(`${userName}/${file.name}`);
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
  // Create a reference under which you want to list
  var storageRef = firebase.storage().ref();
  let userName = document.getElementById('user-name-card').innerText
  var listRef = storageRef.child(`${userName}/`);

  // Find all the prefixes and items.
  listRef.listAll()
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        folderRef.listAll()
      });
      if (res.items.length >= 1) {
        container.innerHTML = ""
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          const fileName = itemRef.location.path_.split('/')[1];
          const authorName = itemRef.location.path_.split('/')[0]
          console.log(fileName)

          const newNode = ` <div class="fileDiv">
          <div class="fileText">
      
              <p class="fileTitle">${fileName}</p>
              <p class="filePara">${authorName}</p>
          </div>
      
          <div class="fileIcons">
              <div class="icon" onclick="deleteFile(this.parentElement.previousElementSibling.childNodes[1].innerText)">
                  <i class="fa fa-2x fa-trash "></i>
                  <p class="fileToolTip">Delete</p>
              </div>
              <div class="icon">
                  <i class="fa fa-2x fa-download "></i>
                  <p class="fileToolTip">Download</p>
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
        container.innerHTML = "<p>No Files have been Created Yet</p>"
      }

      document.getElementById('file_section').classList.remove("d-none");
      document.getElementById('fileViewIcon').classList.remove('fa-spinner');
      document.getElementById('fileViewIcon').classList.remove('fa-spin');
      document.getElementById('fileViewIcon').classList.add('fa-file');


    }).catch((error) => {
      console.log("Uh-oh, an error occurred!", error)
    });
}


function deleteFile(text) {

  let userName = document.getElementById('user-name-card').innerText
  var storageRef = firebase.storage().ref();

  var deleteFileRef = storageRef.child(`${userName}/${text}`);

  const choice = window.confirm("Do you really want to delete this File?")
  document.getElementById('allFilesContainer').innerHTML = '<i class="fa fa-2x fa-spinner fa-spin"></i>'

  if (choice) {
    deleteFileRef.delete().then((res) => {
      console.log(res)
      showAllFiles()
    })
  } else {
    return
  }



}
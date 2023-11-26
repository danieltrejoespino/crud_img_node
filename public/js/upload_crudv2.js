const btn_image=document.querySelector('#btn_image')
const uploadInput = document.getElementById('formFileLg')
const add_img = document.getElementById('add_img');
const showImg=document.querySelector('#showImg')
const showFile=document.querySelector('#showFile')
const showAudio=document.querySelector('#showAudio')
const dropContainer = document.getElementById("dropcontainer")

document.addEventListener("DOMContentLoaded", function() {
  getIMG()
  getFILE()
  getAUDIO()


});

function getAUDIO() {

  fetch('/allAudios') 
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo completar la solicitud.');
    }
    return response.json(); // Si esperas una respuesta JSON
  })
  .then(data => {    
    if (data.length === 0) {
      // alert('sin datos')
      return false
    }
    console.log(data);
    let newData=''
    data.forEach(element => {   
      newData+=`
            <tr>
              <td colspan="2">${element}</td>
              <td>                
                <audio controls>                  
                  <source src="./uploads/audio/${element}" type="audio/mpeg">
                </audio>                
              </td>
            </tr>            
        `
    });
    showAudio.innerHTML=newData
  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  });
  
}

function getFILE() {

  fetch('/allFiles') 
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo completar la solicitud.');
    }
    return response.json(); // Si esperas una respuesta JSON
  })
  .then(data => {    
    if (data.length === 0) {
      // alert('sin datos')
      return false
    }
    console.log(data);
    let newFile=''
    data.forEach(element => {   
      newFile+=`
            <tr>
              <td colspan="2">${element}</td>
              <td>
                <a href="./uploads/files/${element}" download="${element}">
                <i class=" _icons fa-solid fa-file-arrow-down fa-2xl"></i>                
                </a>
              </td>
            </tr>            
        `
    });
    showFile.innerHTML=newFile
  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  });
  
}

// ---------------------------------------------------------------------


function getIMG() {
  fetch('/allImg_1') 
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo completar la solicitud.');
    }
    return response.json(); // Si esperas una respuesta JSON
  })
  .then(data => {    
    if (data.length === 0) {
      // alert('sin datos')
      return false
    }
    let newImg=''
    let imgClass
    data.forEach(element => {        

      imgClass = element.substring(0, 10)
      console.log(imgClass);

      newImg+=`
        <tr>
          <td>${element}</td>
          <td>
            <img src="./uploads/img/${element}" style="height: 50px; width: 50px; border-radius: 10px;" >    
          </td>
          <td>
            <a href="./uploads/img/${element}" download="${element}">
             <i class=" _icons fa-solid fa-download fa-2xl"></i>            
            </a>
          </td>
        </tr>            
    `
    });
    showImg.innerHTML=newImg
  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  });

}
// ---------------------------------------------------------------------



function valida(){
  const allowedTypes = [
    'image/png',
    'image/jpeg',
    'application/pdf',
    'text/plain',
    'audio/mpeg',
    'audio/mp3',
    'text/csv',
    'application/msword', // Tipo de archivo para documentos de Word (.doc)
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/x-javascript',
    'text/html',
    'application/zip'
    
  ];
  
  const upload = uploadInput.files[0];

  if (!upload) {
    show_alert(2, 'Agrega un archivo para subir');
    return false;
  }  
  if (!allowedTypes.includes(upload.type)) {
    console.log(upload.type);
    show_alert(2, 'Formato de archivo no valido. Se admiten tipos como JPEG, PDF, texto y MP3.');
    return false;
  }  
  return true;
}

function upload() { 
  btn_image.disabled=true
  const upload = uploadInput.files[0];  
  console.log(upload.type);
  let ruta
  switch (upload.type) {
    case 'application/zip':
        ruta='/uploadFile'  
      break;     
    case 'application/pdf':
        ruta='/uploadPDF'  
      break;
    case 'text/csv':
        ruta='/uploadFile'  
      break;
    case 'image/png':
      ruta='/uploadImage'  
    break;  
    case 'image/jpeg':
      ruta='/uploadImage'  
    break;  
    case 'audio/mp3':
      ruta='/uploadAudio'  
    break;     
    case 'audio/mpeg':
      ruta='/uploadAudio'  
    break;

    default:
      ruta='/uploadFile'
    break;
  }  

  const formData = new FormData();
  formData.append('file', upload);
    fetch(ruta, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      console.log(response);
      if (response.ok) {        
        show_alert(1,'Exito')
        uploadInput.value=''
        btn_image.disabled=false      
        getIMG()
        getFILE()
        getAUDIO()
      }else{
        show_alert(2,'Error')        
      }
    })
    .catch((err) => {
      console.error('Error al subir el archivo:', err);
    });  
}


btn_image.addEventListener('click', function () {
  if (valida()== true) {
    upload()
  }
});

showImg.addEventListener('mouseover', function () {
  console.log('sobre la imagen');
});

dropContainer.addEventListener("dragover", (e) => {
    // prevent default to allow drop
    e.preventDefault()
  }, false)

  dropContainer.addEventListener("dragenter", () => {
    dropContainer.classList.add("drag-active")
  })

  dropContainer.addEventListener("dragleave", () => {
    dropContainer.classList.remove("drag-active")
  })

  dropContainer.addEventListener("drop", (e) => {
    e.preventDefault()
    dropContainer.classList.remove("drag-active")
    uploadInput.files = e.dataTransfer.files
  })
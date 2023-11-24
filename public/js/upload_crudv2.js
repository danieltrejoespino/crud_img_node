const btn_image=document.querySelector('#btn_image')
const uploadInput = document.getElementById('formFileLg')
const add_img = document.getElementById('add_img');
const showImg=document.querySelector('#showImg')
const showFile=document.querySelector('#showFile')
const dropContainer = document.getElementById("dropcontainer")

document.addEventListener("DOMContentLoaded", function() {
  getIMG()
  getFILE()


});

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
            <li class="list-group-item">${element}              
              <a href="./uploads/files/${element}" download="${element}">
                <button type="button" class="btn btn-outline-info">Descargar Archivo</button>
              </a>
            </li>            
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
    data.forEach(element => {        
        newImg+=`
            <li class="list-group-item">${element}
              <img src="./uploads/img/${element}" style="height: 100px; width: 100px;" >    
              <a href="./uploads/img/${element}" download="${element}">
                <button type="button" class="btn btn-outline-info">Descargar Imagen</button>
              </a>
            </li>            
        `
    });
    showImg.innerHTML=newImg
  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  });

}

btn_image.addEventListener('click', function () {
  if (valida()== true) {
    upload()
  }
});

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
  let ruta
  switch (upload.type) {
    case 'application/pdf':
        ruta='/uploadPDF'  
      break;
    case 'text/csv':
        ruta='/uploadFile'  
      break;
    case 'image/png':
      ruta='/uploadImage'  
    break;  
    case 'audio/mp3':
      ruta='/uploadAudio'  
    break;     
    case 'audio/mpeg':
      ruta='/uploadAudio'  
    break;
    case 'application/zip':
      ruta='/uploadFile'  
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
      }else{
        show_alert(2,'Error')        
      }
    })
    .catch((err) => {
      console.error('Error al subir el archivo:', err);
    });  
}




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
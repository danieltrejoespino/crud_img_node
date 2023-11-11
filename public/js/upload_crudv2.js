const btn_image=document.querySelector('#btn_image')
const uploadInput = document.getElementById('formFileLg')
const add_img = document.getElementById('add_img');
const showImg=document.querySelector('#showImg')
const dropContainer = document.getElementById("dropcontainer")

document.addEventListener("DOMContentLoaded", function() {
  getIMG()


});


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
            <img src="./uploads/img/${element}" style="height: 50px; width: 50px;" >        
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
  const allowedTypes = ['image/png','image/jpeg', 'application/pdf', 'text/plain', 'audio/mpeg','audio/mp3'];
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
    case 'image/png':
      ruta='/uploadImage'  
    break;  
    case 'audio/mp3':
      ruta='/uploadAudio'  
    break;     
    case 'audio/mpeg':
      ruta='/uploadAudio'  
    break;     

    default:
      ruta='/uploadImage'
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
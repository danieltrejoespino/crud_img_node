const btn_image=document.querySelector('#btn_image')
const uploadInput = document.getElementById('formFileLg')
const add_img = document.getElementById('add_img');

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
    console.log(data);
    let html = '';
    data.forEach((image, index) => {
      // Determinar si la imagen actual debe tener la clase 'active'
      const isActive = index === 0 ? 'active' : '';
    
      // Construir el código HTML para cada imagen
      html += `<div class="carousel-item ${isActive}">
                  <img src="./uploads/img/${image}" class="d-block w-50" style="height: 300px;" alt="Imagen ${index + 1}">
                </div>`;
    });
    add_img.innerHTML=html
  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  });

}

btn_image.addEventListener('click', function () {
  if (valida()== true) {
    upload()
  }
  //  else {
  //   show_alert(2,'Agrega una archivo a subir')
  // }  
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
      }else{
        show_alert(2,'Error')        
      }
    })
    .then((result) => {
      btn_image.disabled=false
    })
    .catch((err) => {
      console.error('Error al subir el archivo:', err);
    });  
}
const btn_image=document.querySelector('#btn_image')
const uploadInput = document.getElementById('formFileLg')



btn_image.addEventListener('click', function () {
  if (valida()== true) {
    upload()
  }
  //  else {
  //   show_alert(2,'Agrega una archivo a subir')
  // }  
});

function valida(){
  const allowedTypes = ['image/png','image/jpeg', 'application/pdf', 'text/plain', 'audio/mpeg'];
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
  const ruta='/uploadImage'

  const formData = new FormData();
  formData.append('imagen', upload);
    fetch(ruta, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      console.log(response);
      if (response.ok) {        
        show_alert(1,'Imagen subida exitosamente')
      }else{
        show_alert(2,'Error al subir la imagen')        
      }
    })
    .then((result) => {
      btn_image.disabled=false
    })
    .catch((err) => {
      console.error('Error al subir la imagen:', error);
    });  
}
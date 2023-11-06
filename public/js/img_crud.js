const btn_image=document.querySelector('#btn_image')
const imagenInput = document.getElementById('formFileLg')

btn_image.addEventListener('click', function () {
  const imagen = imagenInput.files[0];
  if (imagen) {
    const formData = new FormData();
    formData.append('imagen', imagen);

    fetch('/uploadImage', {
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
    }).catch((err) => {
      console.error('Error al subir la imagen:', error);
    });
  }else{
    show_alert(2,'Agrega una foto para continuar')
  }
});

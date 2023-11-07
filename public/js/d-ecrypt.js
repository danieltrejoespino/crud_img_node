const btn_next=document.querySelector('#btn_next')
const txt_texto=document.querySelector('#txt_texto')
const txt_result=document.querySelector('#txt_result')
const sel_accion = document.getElementById('sel_accion');

const tipo_encript = (option,data) => {
  let action = option == 1 ? btoa(data) : atob(data)
  return action
  };

function valida() {
  if (!txt_texto.value || !sel_accion.value ) {
    show_alert(2,'Agrega un texto para generar')
    return false
  } 
  return true
}

function generar() {
  let rspta= tipo_encript(sel_accion.value,txt_texto.value)
  txt_result.value=rspta
  txt_result.select();
  document.execCommand('copy');
  txt_result.blur();
  btn_next.textContent = '¡Copiado!';
  setTimeout(() => {
    btn_next.textContent = 'Generar';
  }, 3000);
}

btn_next.addEventListener('click', function () {   
  valida()  
  generar()      
})

sel_accion.addEventListener('change', function() {
  valida()  
  generar() 
})
 
function show_alert(tipo,texto) {
  let icon = tipo === 1 ? 'success' : 'error'

  Swal.fire({
    position: "center",
    icon: icon,
    title: texto,
    showConfirmButton: false,
    timer: 1500
  });
}
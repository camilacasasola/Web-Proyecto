document.addEventListener('DOMContentLoaded', () => {
    const inputFecha1 = document.getElementById('filtro-consultas');
    const tableBody1 = document.querySelector('#consultas tbody');
  
    function cargarConsultas(fecha, tableBody) {
      let url = '/api/createconsulta';
      if (fecha) {
        url += `?fecha=${fecha}`;
      }
  
      fetch(url)
        .then(response => response.json())
        .then(reservas => {
          tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla
          reservas.forEach(reserva => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = reserva.fecha.split('T')[0];
            row.insertCell(1).textContent = reserva.nombreCompleto;
            row.insertCell(2).textContent = reserva.telefono;
            row.insertCell(3).textContent = reserva.hora;
            row.insertCell(4).textContent = reserva.correo;
            row.insertCell(5).textContent = reserva.descripcion;
          });
        })
        .catch(error => console.error('Error al cargar las reservas:', error));
    }
  
    if (inputFecha1) {
      inputFecha1.addEventListener('change', (event) => {
        cargarConsultas(event.target.value, tableBody1);
      });
      cargarConsultas(undefined, tableBody1); // Cargar todas las reservas inicialmente para la primera tabla
    }
  });
  
    
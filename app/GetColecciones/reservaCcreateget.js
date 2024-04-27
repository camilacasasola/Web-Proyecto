document.addEventListener('DOMContentLoaded', () => {
    const inputFecha1 = document.getElementById('filtro-reservas');
    const tableBody1 = document.querySelector('#reservas tbody');
  
    const inputFecha2 = document.getElementById('filtro-reservas2');
    const tableBody2 = document.querySelector('#reservasC2 tbody');
    function cargarReservas(fecha, tableBody) {
      let url = '/api/reservaC';
      if (fecha) {
        url += `?fecha=${fecha}`; // La fecha ya está en el formato YYYY-MM-DD
      }
      
      fetch(url)
        .then(response => response.json())
        .then(reservas => {
          tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de añadir nuevas filas
          reservas.forEach(reserva => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = reserva.fecha.split('T')[0]; // Fecha en formato YYYY-MM-DD
            row.insertCell(1).textContent = reserva.hora;
            row.insertCell(2).textContent = reserva.nombrerestaurante;
            row.insertCell(3).textContent = reserva.numeromesa;
          });
        })
        .catch(error => console.error('Error al cargar las reservas:', error));
    }
  
    if (inputFecha1) {
      inputFecha1.addEventListener('change', (event) => {
        cargarReservas(event.target.value, tableBody1);
      });
      cargarReservas(undefined, tableBody1); // Cargar todas las reservas inicialmente para la primera tabla
    }
  
    if (inputFecha2) {
      inputFecha2.addEventListener('change', (event) => {
        cargarReservas(event.target.value, tableBody2);
      });
      cargarReservas(undefined, tableBody2); // Cargar todas las reservas inicialmente para la segunda tabla
    }
  });
  
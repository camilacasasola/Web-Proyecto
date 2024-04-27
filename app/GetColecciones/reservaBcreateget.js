document.addEventListener('DOMContentLoaded', () => {
    const inputFecha = document.getElementById('filtro-reservas');
    
    function cargarReservas(fecha) {
      let url = '/api/reservaB';
      if (fecha) {
        url += `?fecha=${fecha}`; // La fecha ya está en el formato YYYY-MM-DD
      }
      
      fetch(url)
        .then(response => response.json())
        .then(reservas => {
          const tableBody = document.querySelector('#reservas tbody');
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
  
    inputFecha.addEventListener('change', (event) => {
      cargarReservas(event.target.value);
    });
  
    cargarReservas(); // Cargar todas las reservas inicialmente
  });
  
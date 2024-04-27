//Esta parte se conecta a la direccion en la que ingresan los parametros en el html
//y con el get obterner la informacion de la tabla
fetch('/api/admin/registro')
            .then(response => response.json())
            .then(admins => {
                const tableBody = document.getElementById('tablaadmin').getElementsByTagName('tbody')[0];
                admins.forEach(admin => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = admin.username;
                });
            })
            .catch(error => console.error('Error al cargar los colecciones:', error));


//se crea unas constantes para obtener el form y table mediante el id
document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('tablaadmin');
    const form = document.getElementById('adminform');
    const usernameinput = form.querySelector('input[name="username"]');
    const messageContainer = form.querySelector('.message');
     //Evento de click para todas las filas de la tabla
     //esta seccion sirve para traer la informacion que form y mediante 
     //el click poder seleccionar la linea de la tabla y mandar la informacion de la tabla al form de vuelta
     // Verificar si los elementos existen
    if (!table || !form || !usernameinput || !messageContainer) {
        console.error('Algunos elementos del DOM no están disponibles');
        return;
    }
    
     table.addEventListener('click', function(event) {
        let target = event.target;
        while (target && target.nodeName !== "TR") {
            target = target.parentNode;
        }
        if (target && target.nodeName === "TR") { // Hemos encontrado la fila en la que se hizo clic
            const cells = target.getElementsByTagName('td');
            usernameinput.value = cells[0].textContent;
            sessionStorage.setItem('selectedusername', cells[0].textContent);
            if (messageContainer) messageContainer.textContent = '';
            // Recargar la página después de un breve retraso
        setTimeout(() => {
          window.location.reload();
      }, 1000);
        }
    });

    //por si se navega o se actualiza
    const selectedusername =  sessionStorage.getItem('selectedusername');
    if (selectedusername){
        usernameinput.value = selectedusername;
    }
    const username = sessionStorage.getItem('selectedusername');
console.log('Username almacenado en sessionStorage:', username);


//Evento de clic para el botón de editar y poder actualizar y guardar cambios
// Evento de clic para el botón de editar y poder actualizar y guardar cambios
document.getElementById('adminform').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('codigoUsuario').value;
    const currentPassword = document.getElementById('contrasenaActual').value;
    const newPassword = document.getElementById('contrasenaNueva').value;
  
    try {
      const response = await fetch(`/api/get/registro/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: currentPassword, newpassword: newPassword }),
      });
  
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
  
      const data = await response.text();
      console.log('Respuesta recibida:', data);
      document.querySelector('.message').textContent = 'Contraseña actualizada con éxito.';
      setTimeout(() => {
        window.location.reload();
    }, 1000);
    } catch (error) {
      console.error('Error:', error);
      document.querySelector('.message').textContent = 'Error al actualizar la contraseña: ' + error.message;
    }
  });
  
});

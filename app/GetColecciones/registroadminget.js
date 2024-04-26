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
    const messageContainer = form.querySelector('.message');
     //Evento de click para todas las filas de la tabla
     //esta seccion sirve para traer la informacion que form y mediante 
     //el click poder seleccionar la linea de la tabla y mandar la informacion de la tabla al form de vuelta
     table.addEventListener('click', function(event) {
        let target = event.target;
        while (target && target.nodeName !== "TR") {
            target = target.parentNode;
        }
        if (target && target.nodeName === "TR") { // Hemos encontrado la fila en la que se hizo clic
            const cells = target.getElementsByTagName('td');
            form.username.value = cells[0].textContent;
    
            //Limpia cualquier mensaje previo
            if (messageContainer) messageContainer.textContent = '';
        }
    });
 //Evento de clic para el botón de editar y poder actualizar y guardar cambios
 document.getElementById('btneditar').addEventListener('click', function() {
    const adminData = {
        username: form.username.value,
    };

    //llamada fetch para actualizar (PUT) la bebida
    //la ruta del html se hace el llamado para acceder a la informacion
    //mediante el uso del PUT se hace el update
    fetch(`/api/admin/registro/${adminData.username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData)
    })
    .then(response => response.json())
    .then(data => {
        //se muestra mensaje de exito o manejar errores
        form.querySelector('.message').textContent = 'Contraseña actualizada con éxito.';
        //Actualizar la pagina despues de un breve retraso para que el usuario pueda leer el mensaje de exito 
        setTimeout(() => {
            window.location.reload();
        }, 1000);
})//manejo de errores
    .catch(error => {
        console.error('Error:', error);
        form.querySelector('.message').textContent = 'Error al actualizar la Contraseña.';
    });
});

//evento de clic para el boton de eliminar
document.getElementById('btneliminar').addEventListener('click', function() {
    const username = form.username.value;

    //se creo una confirmacion para mas seguridad y que no se elimine la informacion inmediatamente
    if (confirm('¿Estás seguro de que deseas eliminar la marca?')) {
        fetch(`/api/admin/registro/${username}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            //Mostrar mensaje de exito o manejar errores
            form.querySelector('.message').textContent = 'Admin eliminado con éxito.';
            //Actualizar la pagina después de un breve retraso para que el usuario pueda leer el mensaje
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        })//manejo de errores
        .catch(error => {
            console.error('Error:', error);
            form.querySelector('.message').textContent = 'Error al eliminar el administrador.';
        });
    }
});

});

//Esta parte se conecta a la direccion en la que ingresan los parametros en el html
//y con el get obterner la informacion de la tabla
fetch('/api/createcomestible')
            .then(response => response.json())
            .then(comestibles => {
                const tableBody = document.getElementById('tablacomestible').getElementsByTagName('tbody')[0];
                comestibles.forEach(comestible => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = comestible.codigocomestible;
                    row.insertCell(1).textContent = comestible.descripcioncomestible;
                    row.insertCell(2).textContent = comestible.cantidadcomestible;
                    row.insertCell(3).textContent = comestible.codigorestaurante;
                    row.insertCell(4).textContent = comestible.tipocomestible;
                });
            })
            .catch(error => console.error('Error al cargar los colecciones:', error));


//se crea unas constantes para obtener el form y table mediante el id
document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('tablacomestible');
    const form = document.getElementById('comestibleform');
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
            form.codigocomestible.value = cells[0].textContent;
            form.descripcioncomestible.value = cells[1].textContent;
            form.cantidadcomestible.value = cells[2].textContent;
            form.codigorestaurante.value = cells[3].textContent;
            form.tipocomestible.value = cells[4].textContent;
    
            //Limpia cualquier mensaje previo
            if (messageContainer) messageContainer.textContent = '';
        }
    });

    //Evento de clic para el botón de editar y poder actualizar y guardar cambios
    document.getElementById('btneditar').addEventListener('click', function() {
        const comestibleData = {
            codigocomestible: form.codigocomestible.value,
            descripcioncomestible: form.descripcioncomestible.value,
            cantidadcomestible: form.cantidadcomestible.value,
            codigorestaurante: form.codigorestaurante.value,
            tipocomestible: form.tipocomestible.value
        };

        //llamada fetch para actualizar (PUT) la bebida
        //la ruta del html se hace el llamado para acceder a la informacion
        //mediante el uso del PUT se hace el update
        fetch(`/api/createcomestible/${comestibleData.codigocomestible}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comestibleData)
        })
        .then(response => response.json())
        .then(data => {
            //se muestra mensaje de exito o manejar errores
            form.querySelector('.message').textContent = 'Comestible actualizado con éxito.';
            //Actualizar la pagina despues de un breve retraso para que el usuario pueda leer el mensaje de exito 
            setTimeout(() => {
                window.location.reload();
            }, 1000);
    })//manejo de errores
        .catch(error => {
            console.error('Error:', error);
            form.querySelector('.message').textContent = 'Error al actualizar el Comestible.';
        });
    });

    //evento de clic para el boton de eliminar
    document.getElementById('btneliminar').addEventListener('click', function() {
        const codigocomestible = form.codigocomestible.value;

        //se creo una confirmacion para mas seguridad y que no se elimine la informacion inmediatamente
        if (confirm('¿Estás seguro de que deseas eliminar el Comestible?')) {
            fetch(`/api/createcomestible/${codigocomestible}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                //Mostrar mensaje de exito o manejar errores
                form.querySelector('.message').textContent = 'Comestible eliminada con éxito.';
                //Actualizar la pagina después de un breve retraso para que el usuario pueda leer el mensaje
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            })//manejo de errores
            .catch(error => {
                console.error('Error:', error);
                form.querySelector('.message').textContent = 'Error al eliminar la Comestible.';
            });
        }
    });
});
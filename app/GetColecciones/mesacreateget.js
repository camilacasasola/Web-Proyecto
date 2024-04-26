//Esta parte se conecta a la direccion en la que ingresan los parametros en el html
//y con el get obterner la informacion de la tabla
fetch('/api/createmesa')
            .then(response => response.json())
            .then(equipos => {
                const tableBody = document.getElementById('tablamesa').getElementsByTagName('tbody')[0];
                equipos.forEach(equipo => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = equipo.codigomesa;
                    row.insertCell(1).textContent = equipo.nombremesa;
                    row.insertCell(2).textContent = equipo.numeromesa;
                    row.insertCell(3).textContent = equipo.codigorestaurante;
                    row.insertCell(4).textContent = equipo.cantidadsillas;
                });
            })
            .catch(error => console.error('Error al cargar los colecciones:', error));


//se crea unas constantes para obtener el form y table mediante el id
document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('tablamesa');
    const form = document.getElementById('mesaform');
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
            form.codigomesa.value = cells[0].textContent;
            form.nombremesa.value = cells[1].textContent;
            form.numeromesa.value = cells[2].textContent;
            form.codigorestaurante.value = cells[3].textContent;
            form.cantidadsillas.value = cells[4].textContent;
    
            //Limpia cualquier mensaje previo
            if (messageContainer) messageContainer.textContent = '';
        }
    });

    //Evento de clic para el botón de editar y poder actualizar y guardar cambios
    document.getElementById('btneditar').addEventListener('click', function() {
        const mesaData = {
            codigomesa: form.codigomesa.value,
            nombremesa: form.nombremesa.value,
            numeromesa: form.numeromesa.value,
            codigorestaurante: form.codigorestaurante.value,
            cantidadsillas: form.cantidadsillas.value
        };

        //llamada fetch para actualizar (PUT) la bebida
        //la ruta del html se hace el llamado para acceder a la informacion
        //mediante el uso del PUT se hace el update
        fetch(`/api/createmesa/${mesaData.codigomesa}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mesaData)
        })
        .then(response => response.json())
        .then(data => {
            //se muestra mensaje de exito o manejar errores
            form.querySelector('.message').textContent = 'Mesa actualizada con éxito.';
            //Actualizar la pagina despues de un breve retraso para que el usuario pueda leer el mensaje de exito 
            setTimeout(() => {
                window.location.reload();
            }, 1000);
    })//manejo de errores
        .catch(error => {
            console.error('Error:', error);
            form.querySelector('.message').textContent = 'Error al actualizar la Mesa.';
        });
    });

    //evento de clic para el boton de eliminar
    document.getElementById('btneliminar').addEventListener('click', function() {
        const codigomesa = form.codigomesa.value;

        //se creo una confirmacion para mas seguridad y que no se elimine la informacion inmediatamente
        if (confirm('¿Estás seguro de que deseas eliminar la Mesa?')) {
            fetch(`/api/createmesa/${codigomesa}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                //Mostrar mensaje de exito o manejar errores
                form.querySelector('.message').textContent = 'Mesa eliminada con éxito.';
                //Actualizar la pagina después de un breve retraso para que el usuario pueda leer el mensaje
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            })//manejo de errores
            .catch(error => {
                console.error('Error:', error);
                form.querySelector('.message').textContent = 'Error al eliminar la Mesa.';
            });
        }
    });
});
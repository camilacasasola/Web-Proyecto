//Esta parte se conecta a la direccion en la que ingresan los parametros en el html
//y con el get obterner la informacion de la tabla
fetch('/api/createmedida')
            .then(response => response.json())
            .then(marcas => {
                const tableBody = document.getElementById('tablamedida').getElementsByTagName('tbody')[0];
                marcas.forEach(marca => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = marca.codigomedida;
                    row.insertCell(1).textContent = marca.descripcionmedida;
                });
            })
            .catch(error => console.error('Error al cargar los colecciones:', error));


//se crea unas constantes para obtener el form y table mediante el id
document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('tablamedida');
    const form = document.getElementById('medidaform');
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
            form.codigomedida.value = cells[0].textContent;
            form.descripcionmedida.value = cells[1].textContent;
    
            //Limpia cualquier mensaje previo
            if (messageContainer) messageContainer.textContent = '';
        }
    });
 //Evento de clic para el botón de editar y poder actualizar y guardar cambios
 document.getElementById('btneditar').addEventListener('click', function() {
    const medidaData = {
        codigomedida: form.codigomedida.value,
        descripcionmedida: form.descripcionmedida.value
    };

    //llamada fetch para actualizar (PUT) la bebida
    //la ruta del html se hace el llamado para acceder a la informacion
    //mediante el uso del PUT se hace el update
    fetch(`/api/createmedida/${medidaData.codigomedida}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medidaData)
    })
    .then(response => response.json())
    .then(data => {
        //se muestra mensaje de exito o manejar errores
        form.querySelector('.message').textContent = 'Medida actualizada con éxito.';
        //Actualizar la pagina despues de un breve retraso para que el usuario pueda leer el mensaje de exito 
        setTimeout(() => {
            window.location.reload();
        }, 1000);
})//manejo de errores
    .catch(error => {
        console.error('Error:', error);
        form.querySelector('.message').textContent = 'Error al actualizar la medida.';
    });
});

//evento de clic para el boton de eliminar
document.getElementById('btneliminar').addEventListener('click', function() {
    const codigomedida = form.codigomedida.value;

    //se creo una confirmacion para mas seguridad y que no se elimine la informacion inmediatamente
    if (confirm('¿Estás seguro de que deseas eliminar la medida?')) {
        fetch(`/api/createmedida/${codigomedida}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            //Mostrar mensaje de exito o manejar errores
            form.querySelector('.message').textContent = 'Medida eliminado con éxito.';
            //Actualizar la pagina después de un breve retraso para que el usuario pueda leer el mensaje
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        })//manejo de errores
        .catch(error => {
            console.error('Error:', error);
            form.querySelector('.message').textContent = 'Error al eliminar la medida.';
        });
    }
});

});

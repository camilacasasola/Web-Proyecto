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


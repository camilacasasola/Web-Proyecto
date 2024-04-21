fetch('/api/bebidacreate')
            .then(response => response.json())
            .then(bebidas => {
                const tableBody = document.getElementById('tablaBebidas').getElementsByTagName('tbody')[0];
                bebidas.forEach(bebida => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = bebida.codigo;
                    row.insertCell(1).textContent = bebida.nombre;
                    row.insertCell(2).textContent = bebida.tipo;
                    row.insertCell(3).textContent = bebida.marca;
                    row.insertCell(4).textContent = bebida.precio;
                    row.insertCell(5).textContent = bebida.codigorestaurante;
                    row.insertCell(6).textContent = bebida.pais;
                    row.insertCell(7).textContent = bebida.codigomedida;
                    row.insertCell(8).textContent = bebida.ano;
                });
            })
            .catch(error => console.error('Error loading the beverages:', error));
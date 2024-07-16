//PROPIEDADES INICIO
let datosTabla = document.querySelector("#datos"); //cuando es querySelector requiere el numeral.
let mensajesSistema = document.querySelector("#mensajesSistema"); //obtiene id del div para dibujar el alert de crear
let formulario = document.getElementById("formulario"); //cuando es getElementById, no requiere el numeral.
let formularioEditar = document.getElementById("formularioEditar"); //cuando es getElementById, no requiere el numeral.

let nombrePagina = document.title;
let nombreModuloLista = "Productos";
let nombreModuloCrear = "Crear producto";

//URLS API
let url = "http://127.0.0.1/Sistema-de-Inventario/Api/Producto/producto.php/";


//MISC
let spinner = `
<button class="btn btn-success" type="button" disabled>
<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
<span role="status">Cargando...</span>
</button>`;

//PROPIEDADES FIN

//EVENTOS INICIO

if (nombrePagina == nombreModuloCrear){
    formulario.addEventListener('submit',
    function (evento){
        evento.preventDefault(); //cancela que la página se recargue 

        let datos = new FormData(formulario);

        let datosEnviar = {
            nombre: datos.get('nombre'),
            descripcion: datos.get('descripcion'),
            precio: datos.get('precio'),
            idCategoria: datos.get('idCategoria'),
            proveedor_id: datos.get('proveedor_id')
        }

        fetch (url,
            {
                method: 'POST',
                body: JSON.stringify(datosEnviar)
            }
        )
        .then(respuesta=> respuesta.json())
        .then((datosRespuesta) =>{
            memsajeInsertar(datosRespuesta);
            setTimeout('location.href="listaProductos.html"', 1000);
        })
        .catch(console.log)

    })
}

formularioEditar.addEventListener('submit', 
function(evento) {
    evento.preventDefault();//evita que la pagina se recargue
    
    let datos = new FormData(formularioEditar);

    let datosEnviar = {
        nombre: datos.get('nombre'),
        descripcion: datos.get('descripcion'),
        precio: datos.get('precio'),
        idCategoria: datos.get('idCategoria'),
        proveedor_id: datos.get('proveedor_id'),
        id: datos.get('id'),
    }
    console.log(datosEnviar);

        //url + insertar esto es la url del servicio concatenada
        fetch( url,
            {
                method: 'PUT',
                body: JSON.stringify(datosEnviar)
            } 
        )
        .then(respuesta=>respuesta.json())
        .then( (datosrepuesta) => {
            mensajeActualizar(datosrepuesta)
        })
        .catch(console.log)

 
})

formElliminar.addEventListener('submit', 
    function(evento) {
        evento.preventDefault();//evita que la pagina se recargue
        
        let datos = new FormData(formElliminar);
    
        let datosEnviar = {
            id: datos.get('idEliminar')
        }
        console.log(datosEnviar);
    
            //url + insertar esto es la url del servicio concatenada
            fetch( url,
                {
                    method: 'DELETE',
                    body: JSON.stringify(datosEnviar)
                } 
            )
            .then(respuesta=>respuesta.json())
            .then( (datosrepuesta) => {
                mensajeEliminar(datosrepuesta)
            })
            .catch(console.log)
    
     
    })


//EVENTOS FIN

//MÉTODOS INICIO
function memsajeInsertar(datos){
    if(100< 200){
        mensajesSistema.innerHTML = `
        <div class="alert alert-success alert-dimissible fade show" role = "alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
            <strong>Ingreso exitoso</strong>
        </div>
        `
    }
    else{
        mensajesSistema.innerHTML = `
        <div class="alert alert-warning alert-dimissible fade show" role = "alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
            <strong>El correo ingresado ya ha sido utilizado</strong>
        </div>
        `
    }
}

function mensajeActualizar(datos){
    if(100< 200){
        mensajesSistema.innerHTML = `
        <div class="alert alert-success alert-dimissible fade show" role = "alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
            <strong>Actualización exitosa</strong>
        </div>`;
        setTimeout(cargarDatos, 1000); 
        setInterval(` document.getElementById("modalEditar").remove()`,1000);
        setInterval("location.reload()",2000); 
    }
    else{
        mensajesSistema.innerHTML = `
        <div class="alert alert-warning alert-dimissible fade show" role = "alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
            <strong>Error al actualizar</strong>
        </div>`;
    }
}

function mensajeEliminar(datos){
    if(100< 200){
        mensajesSistema.innerHTML = `
        <div class="alert alert-success alert-dimissible fade show" role = "alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
            <strong>Usuario deshabilitado</strong>
        </div>`;
        setTimeout(cargarDatos, 1000); 
        setInterval(` document.getElementById("modalEditar").remove()`,1000);
        setInterval("location.reload()",2000); 
    }
    else{
        mensajesSistema.innerHTML = `
        <div class="alert alert-warning alert-dimissible fade show" role = "alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
            <strong>Error al actualizar</strong>
        </div>`;
    }
}

function cargarDatos() {
    datosTabla.innerHTML = "";
    loadSpinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        
        .then((datosRespuesta) => {
            mostrarDatos(datosRespuesta)
            console.log(datosRespuesta)
        })
        .catch(console.log)
}

function mostrarDatos(datos) {
    console.log(datos);
    if (datos != null) {
        for (const iterator of datos) {
            datosTabla.innerHTML += `
                <tr class = "">
                    <td><a
                    name=""
                    id=""
                    class="btn btn-success"
                    onclick="editar('${encodeURIComponent(JSON.stringify(iterator))}')"
                    role="button"
                    ><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg></a
                >                    
                
                <a
                    name=""
                    id=""
                    class="btn btn-danger"   
                    role="button"
                    onclick="eliminar('${iterator.id}')"
                    ><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eraser"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" /></svg></a
                > 
                </td>
                    <td>${iterator.id}</td>
                    <td>${iterator.nombre}</td>
                    <td>${iterator.descripcion}</td>
                    <td>${iterator.precio}</td>
                    <td>${iterator.idCategoria}</td>
                    <td>${iterator.proveedor_id}</td>
                     <td>${iterator.estado}</td>
                </tr>
            `;
        }
    }
    else {
        alert("Algo salió mal");
    }
    document.getElementById("spinnerLoad").innerHTML = "";

}

function loadSpinner() {
    document.getElementById("spinnerLoad").innerHTML = spinner;
}

function editar(objeto) {
    let modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));
    modalEditar.show();

    
    objeto = JSON.parse(decodeURIComponent(objeto));
    
    document.getElementById("id").value = objeto.id;
    document.getElementById("nombre").value = objeto.nombre;
    document.getElementById("descripcion").value = objeto.descripcion;
    document.getElementById("precio").value = objeto.precio;
    document.getElementById("idCategoria").value = objeto.idCategoria;
    document.getElementById("proveedor_id").value = objeto.proveedor_id;
    document.getElementById("ideditar").innerHTML = objeto.id;


}

function eliminar(id){
    document.getElementById("idEliminar").innerHTML = id;
    document.getElementById("idEliminarModal").value = id;
    
    let modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));
    modalEliminar.show();
}

function modalEliminarConfirmacion(){
    //document.getElementById("idEliminarModal").value
}

//METODOS FIN
if (nombrePagina == nombreModuloLista){
    cargarDatos();
}

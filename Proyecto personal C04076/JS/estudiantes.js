//PROPIEDADES INICIO
let datosTabla = document.querySelector("#datos"); //cuando es querySelector requiere el numeral.
let mensajesSistema = document.querySelector("#mensajesSistema"); //obtiene id del div para dibujar el alert de crear
let formulario = document.getElementById("formulario"); //cuando es getElementById, no requiere el numeral.
let formularioEditar = document.getElementById("formularioEditar"); //cuando es getElementById, no requiere el numeral.

let nombrePagina = document.title;
let nombreModuloLista = "Estudiantes";
let nombreModuloCrear = "Crear Estudiantes";


//URLS API
let url = "https://paginas-web-cr.com/Api/apis/";
let listar = "ListaEstudiantes.php";
let insertar = "InsertarEstudiantes.php";
let actualizar = "ActualizarEstudiantes.php";
let borrar = "BorrarEstudiantes.php"

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
            cedula: datos.get('cedula'),
            correoelectronico: datos.get('email'),
            telefono: datos.get('telefono'),
            telefonocelular: datos.get('telefonocelular'),
            fechanacimiento: datos.get('fechanacimiento'),
            sexo: datos.get('sexo'),
            direccion: datos.get('direccion'),
            nombre: datos.get('nombre'),
            apellidopaterno: datos.get('apellidopaterno'),
            apellidomaterno: datos.get('apellidomaterno'),
            nacionalidad: datos.get('nacionalidad'),
            idCarreras: datos.get('idCarreras'),
            usuario: datos.get('usuario')
        }

        fetch (url + insertar,
            {
                method: 'POST',
                body: JSON.stringify(datosEnviar)
            }
        )
        .then(respuesta=> respuesta.json())
        .then((datosRespuesta) =>{
            memsajeInsertar(datosRespuesta);
        })
        .catch(console.log)

    })
};

formularioEditar.addEventListener('submit', 
function(evento) {
    evento.preventDefault();//evita que la pagina se recargue
    
    let datos = new FormData(formularioEditar);

    let datosEnviar = {
        id: datos.get('id'),
        cedula: datos.get('cedula'),
        correoelectronico: datos.get('email'),
        telefono: datos.get('telefono'),
        telefonocelular: datos.get('telefonocelular'),
        fechanacimiento: datos.get('fechanacimiento'),
        sexo: datos.get('sexo'),
        direccion: datos.get('direccion'),
        nombre: datos.get('nombre'),
        apellidopaterno: datos.get('apellidopaterno'),
        apellidomaterno: datos.get('apellidomaterno'),
        nacionalidad: datos.get('nacionalidad'),
        idCarreras: datos.get('idCarreras'),
        usuario: datos.get('usuario')
    }
    console.log(datosEnviar);

        //url + insertar esto es la url del servicio concatenada
        fetch( url + actualizar,
            {
                method: 'POST',
                body: JSON.stringify(datosEnviar)
            } 
        )
        .then(respuesta=>respuesta.json())
        .then( (datosrepuesta) => {
            mensajeActualizar(datosrepuesta)
        })
        .catch(console.log)
});

formEliminar.addEventListener('submit', 
function(evento) {
    evento.preventDefault();//evita que la pagina se recargue
    
    let datos = new FormData(formEliminar);

    let datosEnviar = {
        id: datos.get('idEliminarModal')
    }
    
    console.log(datosEnviar);

        //url + insertar esto es la url del servicio concatenada
        fetch( url + borrar,
            {
                method: 'POST',
                body: JSON.stringify(datosEnviar)
            } 
        )
        .then(respuesta=>respuesta.json())
        .then( (datosrepuesta) => {
            mensajeBorrar(datosrepuesta)
        })
        .catch(console.log)
});



//EVENTOS FIN

//MÉTODOS INICIO
function memsajeInsertar(datos){
    if(datos.code == 200){
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
            <strong>El estudiante ingresado ya está registrado</strong>
        </div>
        `
    }
}

function mensajeActualizar(datos){
    if(datos.code == 200){
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

function mensajeBorrar(datos){
    if(datos.code == 200){
        mensajesSistema.innerHTML = `
        <div class="alert alert-success alert-dimissible fade show" role = "alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
            <strong>Estudiante eliminado exitosamente</strong>
        </div>`;
        setTimeout(cargarDatos, 1000); 
        setInterval(` document.getElementById("modalEditar").remove()`,1000);
        setInterval("location.reload()",2000); 
    }
    else{
        mensajesSistema.innerHTML = `
        <div class="alert alert-warning alert-dimissible fade show" role = "alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
            <strong>Error al eliminar estudiante</strong>
        </div>`;
    }
}

function cargarDatos() {
    datosTabla.innerHTML = "";
    loadSpinner();

    fetch(url + listar)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta) => {
            mostrarDatos(datosRespuesta)
        })
        .catch(console.log)
}

function mostrarDatos(datos) {
    //console.log(datos);
    if (datos.code == 200) {
        for (const iterator of datos.data) {
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
                    onclick="eliminar('${encodeURIComponent(JSON.stringify(iterator))}')"
                    ><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eraser"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" /></svg></a
                > 
                </td>

                <td class="text-center">
                <a
                    name=""
                    id=""
                    class="btn btn-secondary"   
                    role="button"
                    onclick="info('${encodeURIComponent(JSON.stringify(iterator))}')"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24"  height="24" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
                    <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM25,11c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3zM21,21v2h1h1v13h-1h-1v2h1h1h4h1h1v-2h-1h-1v-15h-1h-4z"></path></g></g>
                    </svg>    </a> 
                </td>

                    <td>${iterator.id}</td>
                    <td>${iterator.cedula}</td>
                    <td>${iterator.nombre}</td>
                    <td>${iterator.apellidopaterno}</td>
                    <td>${iterator.apellidomaterno}</td>
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
    document.getElementById("cedula").value = objeto.cedula;
    document.getElementById("email").value = objeto.correoelectronico;
    document.getElementById("telefono").value = objeto.telefono;
    document.getElementById("telefonocelular").value = objeto.telefonocelular;
    document.getElementById("fechanacimiento").value = objeto.fechanacimiento;
    document.getElementById("sexo").value = objeto.sexo;
    document.getElementById("direccion").value = objeto.direccion;
    document.getElementById("nombre").value = objeto.nombre;
    document.getElementById("apellidopaterno").value = objeto.apellidopaterno;
    document.getElementById("apellidomaterno").value = objeto.apellidomaterno;
    document.getElementById("nacionalidad").value = objeto.nacionalidad;
    document.getElementById("idCarreras").value = objeto.idCarreras;
    document.getElementById("usuario").value = objeto.usuario;
    document.getElementById("ideditar").innerHTML = objeto.id;
}

function info(objeto) {
    let modalInfo = new bootstrap.Modal(document.getElementById("modalInfo"));
    modalInfo.show();

    objeto = JSON.parse(decodeURIComponent(objeto));

    document.getElementById("nom_estudiante").innerHTML = objeto.nombre;

    document.getElementById("info").innerHTML = 
    "Id del estudiante: " + objeto.id +
    "<br>Cedula: " +objeto.cedula +
    "<br> Correo: " +objeto.correoelectronico +
    "<br> Telefono: " +objeto.telefono +
    "<br> Telefono Celular: " + objeto.telefonocelular+
    "<br> Fecha de nacimiento: " +objeto.fechanacimiento+
    "<br> Sexo: " + objeto.sexo +
    "<br> Dirección: " +objeto.direccion +
    "<br> Nombre: " + objeto.nombre +
    "<br> Apellido paterno: " +objeto.apellidopaterno +
    "<br> Apellido materno: " + objeto.apellidomaterno +
    "<br> Nacionalidad: " + objeto.nacionalidad +
    "<br> Id carreras: " +objeto.idCarreras +
    "<br> usuario: " +objeto.usuario;
}

function eliminar(objeto){
    objeto = JSON.parse(decodeURIComponent(objeto));
    document.getElementById("idEliminarModal").value = objeto.id;
    document.getElementById("estudianteAEliminar").innerHTML = objeto.nombre;
    
    let modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));
    modalEliminar.show();
    
}



//METODOS FIN
if (nombrePagina == nombreModuloLista){
    cargarDatos();
}

//PROPIEDADES INICIO
let datosTabla = document.querySelector("#datos"); //cuando es querySelector requiere el numeral.
let mensajesSistema = document.querySelector("#mensajesSistema"); //obtiene id del div para dibujar el alert de crear
let formulario = document.getElementById("formulario"); //cuando es getElementById, no requiere el numeral.
let formularioEditar = document.getElementById("formularioEditar"); //cuando es getElementById, no requiere el numeral.

let nombrePagina = document.title;
let nombreModuloLista = "Usuarios";
let nombreModuloCrear = "Crear usuarios";

//URLS API
let url = "https://paginas-web-cr.com/Api/apis/";
let listar = "ListaUsuarios.php";
let insertar = "InsertarUsuarios.php";
let actualizar = "ActualizarUsuarios.php";

//MISC
let spinner = `
<button class="btn btn-success" type="button" disabled>
<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
<span role="status">Cargando...</span>
</button>`;

//PROPIEDADES FIN

//EVENTOS INICIO

if (nombrePagina == nombreModuloCrear){
    $("#formulario").on('submit',
    function (e){
        e.preventDefault(); //cancela que la página se recargue 

        let datos = new FormData(formulario);

        let datosEnviar = {
            name: datos.get('name'),
            email: datos.get('email'),
            password: datos.get('password')
        }

        $.ajax({
            type: "POST",
            url:  url + insertar,
            dataType: "JSON",
            data: JSON.stringify(datosEnviar),
            success: function (response) {
                memsajeInsertar(response);
                setTimeout('location.href ="listaUsuarios.html"', 1000);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    })
}


$("#formularioEditar").on('submit', 
function(e) {
    e.preventDefault();//evita que la pagina se recargue
    
    let datos = new FormData(formularioEditar);

    let datosEnviar = {
        name: datos.get('name'),
        password: datos.get('password'),        
        id: datos.get('id')
    }
    console.log(datosEnviar);
    $.ajax({
        type: "POST",
        url:  url + actualizar,
        dataType: "JSON",
        data: JSON.stringify(datosEnviar),
        success: function (response) {
            mensajeActualizar(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
})


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
            <strong>El correo ingresado ya ha sido utilizado</strong>
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

function cargarDatos(){
    $.ajax({
        type: "POST",
        url:  url + listar,
        
        dataType: "json",
        success: function (response) {
            mostrarDatos(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        },
        beforeSend: function (jqXHR){
            loadSpinner();
        }
    });
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
                    onclick="eliminar('${iterator.id}')"
                    ><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eraser"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" /></svg></a
                > 
                </td>
                    <td>${iterator.id}</td>
                    <td>${iterator.name}</td>
                    <td>${iterator.email}</td>
                    <td>${iterator.password}</td>
                </tr>
            `;
        }
    }
    else {
        alert("Algo salió mal");
    }
    $("#spinnerLoad").html( ``);

}

function loadSpinner() {
    $("#spinnerLoad").html(spinner);
}

function editar(objeto) {
    let modalEditar = new bootstrap.Modal($("#modalEditar"));
    modalEditar.show();

    objeto = JSON.parse(decodeURIComponent(objeto));
    
    $("#id").val(objeto.id);
    $("#name").val(objeto.name);
    $("#email").val (objeto.email);
    $("#password").val("");
    $("#ideditar").html(objeto.id);


}

function eliminar(id){
    $("#idEliminar").html(id);
    $("#idEliminarModal").val(id);
    
    let modalEliminar = new bootstrap.Modal($("#modalEliminar"));
    modalEliminar.show();
}

function modalEliminarConfirmacion(){
    //document.getElementById("idEliminarModal").value
}

//METODOS FIN
if (nombrePagina == nombreModuloLista){
    cargarDatos();
}

let mensajesSistema = document.querySelector("#mensajesSistema"); //obtiene id del div para dibujar el alert de crear
let formulario = document.getElementById("formulario"); //cuando es getElementById, no requiere el numeral.

let url = "https://paginas-web-cr.com/Api/apis/";
let reset = "SendPassword.php";

formulario.addEventListener('submit',
    function (evento){
        evento.preventDefault(); //cancela que la página se recargue 

        let datos = new FormData(formulario);

        let datosEnviar = {
            email: datos.get('email'),
        }

        fetch (url + reset,
            {
                method: 'POST',
                body: JSON.stringify(datosEnviar)
            }
        )
        .then(respuesta=> respuesta.json())
        .then((datosRespuesta) =>{
            mensaje(datosRespuesta);
            setTimeout('location.reload()', 3000)
        })
        .catch(console.log)

    })

    function mensaje(datos){
        if(datos.code == 200){
            mensajesSistema.innerHTML = `
            <div class="alert alert-success alert-dimissible fade show" role = "alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
                <strong>Correo enviado</strong>
            </div>
            `
        }
        else{
            mensajesSistema.innerHTML = `
            <div class="alert alert-warning alert-dimissible fade show" role = "alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
                <strong>El correo ingresado no existe</strong>
            </div>
            `
        }
    }
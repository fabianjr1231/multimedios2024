let url = "https://paginas-web-cr.com/Api/apis/";
let aut = "AutenticarUsuario.php";

document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const formData = {
        email: email,
        password: password
    };

    try {
        const response = await fetch(url+ aut, {    
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            if (data.token) {
                sessionStorage.setItem('token', data.token);
                // Redirigir a la página principal después de iniciar sesión
                window.location.href = 'crearUsuarios.html';
            } else {
                // Si no se recibe un token, mostrar mensaje de error
                document.getElementById('errorContainer').textContent = 'Las credenciales ingresadas son incorrectas.';
                document.getElementById('successContainer').textContent = 'Ingreso correcto';
            }
        } else {
            // Si la respuesta no es correcta, mostrar mensaje de error
            const errorMessage = await response.text();
            document.getElementById('errorContainer').textContent = errorMessage;
            document.getElementById('successContainer').textContent = '';
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        document.getElementById('errorContainer').textContent = 'Ocurrió un error. Por favor, inténtalo de nuevo más tarde.';
        document.getElementById('successContainer').textContent =
        'Ingreso correcto';
    }
});
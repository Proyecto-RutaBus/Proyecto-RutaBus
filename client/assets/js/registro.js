document.getElementById('registroForm').addEventListener('submit', async function(event){
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;
    const confirmarContraseña = document.getElementById('confirmar-contraseña').value;

    let errorMessage = '';
    if (nombre === '' || apellido === '' || usuario === '' || email === '' || contraseña === '' || confirmarContraseña === '') {
        errorMessage = 'Todos los campos son obligatorios';
    } else if (contraseña.length < 6) {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres';
    } else if (contraseña !== confirmarContraseña) {
        errorMessage = 'Las contraseñas no coinciden';
    }

    if (errorMessage) {
        event.preventDefault(); // Prevenir el envío del formulario si hay un error
        showAlert(errorMessage);
    } else {
        event.preventDefault(); // Prevenir el envío del formulario mientras se realiza la petición
        
        // Realizamos la petición a nuestro servidor.
        try {
            const peticion = await fetch('http://localhost:3000/register', {
                method: 'POST',
                body: JSON.stringify({ nombre, apellido, usuario, correo: email, contrasenia: contraseña }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const respuesta = await peticion.json();

            if (!peticion.ok) {
                showAlert(respuesta.msg);
            } else {
                showAlert(respuesta.msg, true);
            }
        } catch (error) {
            showAlert('Error en la conexión con el servidor');
        }
    }
});

function showAlert(message, success = false) {
    const alertBox = document.getElementById('customAlert');
    document.getElementById('alertMessage').textContent = message;
    document.body.classList.add('alert-active');
    document.querySelector('.Principal').classList.add('blur');
    document.querySelector('header').classList.add('blur');
    document.querySelector('footer').classList.add('blur');

    if (success) {
        document.getElementById('alertTitle').textContent = 'Éxito';
        document.getElementById('alertButton').textContent = 'Volver al inicio';
        document.getElementById('alertButton').onclick = function() {
            window.location.href = 'index.html';
        };
    } else {
        document.getElementById('alertTitle').textContent = 'Error';
        document.getElementById('alertButton').textContent = 'Cerrar';
        document.getElementById('alertButton').onclick = function() {
            alertBox.style.display = 'none';
            document.body.classList.remove('alert-active');
            document.querySelector('.Principal').classList.remove('blur');
            document.querySelector('header').classList.remove('blur');
            document.querySelector('footer').classList.remove('blur');
        };
    }
    alertBox.style.display = 'block';
}

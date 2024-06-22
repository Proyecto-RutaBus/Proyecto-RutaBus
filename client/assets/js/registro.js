document.getElementById('registroForm').addEventListener('submit', function(event){
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
        // Aquí prevenimos el envío para mostrar la alerta y luego redirigimos
        event.preventDefault();
        showAlert('Formulario enviado correctamente', true);
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

// código que pasaron los profes

 // Realizamos la peticion a nuestro servidor.
 const peticion = await fetch('http://localhost:3000/register', {
    method: 'POST',
    body: JSON.stringify({nombre, apellido, usuario, email, contraseña}),
    headers: {
        'Content-type': 'application/json'
    }
})

// Convertimos en json la respuesta.
const respuesta = await peticion.json();

// En caso de que falle la peticion, mostrar el mensaje de error.
if(!peticion.ok){
    alert(respuesta.msg)
} else {

    //Caso contrario, mostramos el mensaje.
    alert(respuesta.msg)

    // Redirigimos al usuario al login.
    window.location.href = '/client/login.html'
}



form.addEventListener('submit', register);

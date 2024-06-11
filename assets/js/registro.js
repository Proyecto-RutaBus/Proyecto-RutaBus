document.getElementById('registroForm').addEventListener('submit', function (event) {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;
    const confirmarContraseña = document.getElementById('confirmar-contraseña').value;

    if (nombre === '' || apellido === '' || email === '' || contraseña === '' || confirmarContraseña === '') {
        alert('Todos los campos son obligatorios');
        event.preventDefault();
    } else if (contraseña.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        event.preventDefault();
    } else if (contraseña !== confirmarContraseña) {
        alert('Las contraseñas no coinciden');
        event.preventDefault();
    } else {
        // Despues agregar más validaciones de ser necesarias 
        alert('Formulario enviado correctamente');
    }


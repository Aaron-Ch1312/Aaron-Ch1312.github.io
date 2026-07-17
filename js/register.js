document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('form-registro');
    const registerMessage = document.getElementById('register-message');
    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contraseña');
    const confirmarContrasenaInput = document.getElementById('confirmar-contrasena');

    function showMessage(text, type) {
        registerMessage.textContent = text;
        registerMessage.className = `form-message ${type}`;
    }

    function clearMessage() {
        registerMessage.textContent = '';
        registerMessage.className = 'form-message';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidName(value) {
        return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{2,}$/.test(value);
    }

    function isStrongPassword(value) {
        return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value);
    }

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        clearMessage();

        const nombre = nombreInput.value.trim();
        const apellidos = apellidosInput.value.trim();
        const correo = correoInput.value.trim().toLowerCase();
        const contrasena = contrasenaInput.value.trim();
        const confirmarContrasena = confirmarContrasenaInput.value.trim();

        if (!nombre || !apellidos || !correo || !contrasena || !confirmarContrasena) {
            showMessage('Completa todos los campos para registrarte.', 'error');
            return;
        }

        if (!isValidName(nombre)) {
            showMessage('El nombre solo debe contener letras y tener al menos 2 caracteres.', 'error');
            return;
        }

        if (!isValidName(apellidos)) {
            showMessage('Los apellidos solo deben contener letras y tener al menos 2 caracteres.', 'error');
            return;
        }

        if (!isValidEmail(correo)) {
            showMessage('Ingresa un correo válido.', 'error');
            return;
        }

        if (!isStrongPassword(contrasena)) {
            showMessage('La contraseña debe tener al menos 8 caracteres, una letra y un número.', 'error');
            return;
        }

        if (contrasena !== confirmarContrasena) {
            showMessage('Las contraseñas no coinciden.', 'error');
            return;
        }

        const userData = {
            nombre,
            apellidos,
            correo,
            contrasena,
        };

        sessionStorage.setItem('usuarioAldito', JSON.stringify(userData));
        sessionStorage.setItem('usuarioRegistrado', 'true');
        showMessage('Registro exitoso. Redirigiendo...', 'success');

        setTimeout(function () {
            window.location.href = 'index.html';
        }, 700);
    });
});
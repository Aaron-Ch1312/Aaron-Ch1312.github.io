document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contrasena');
    const returnUrl = new URLSearchParams(window.location.search).get('return') || 'index.html';

    function showMessage(text, type) {
        loginMessage.textContent = text;
        loginMessage.className = `form-message ${type}`;
    }

    function clearMessage() {
        loginMessage.textContent = '';
        loginMessage.className = 'form-message';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        clearMessage();

        const correo = correoInput.value.trim().toLowerCase();
        const contrasena = contrasenaInput.value.trim();

        if (!correo || !contrasena) {
            showMessage('Completa tu correo y contraseña.', 'error');
            return;
        }

        if (!isValidEmail(correo)) {
            showMessage('Ingresa un correo válido.', 'error');
            return;
        }

        sessionStorage.setItem('usuarioAldito', JSON.stringify({
            nombre: 'Usuario',
            correo: correo,
        }));
        sessionStorage.setItem('usuarioRegistrado', 'true');
        showMessage('Inicio de sesión correcto. Redirigiendo...', 'success');

        setTimeout(function () {
            window.location.href = returnUrl;
        }, 700);
    });
});
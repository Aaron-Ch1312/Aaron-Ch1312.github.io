(function () {
    function getStoredTheme() {
        try {
            const storedTheme = localStorage.getItem('alditoTheme');
            if (storedTheme === 'light' || storedTheme === 'dark') {
                return storedTheme;
            }
        } catch (error) {
            return 'dark';
        }

        return 'dark';
    }

    function applyTheme(theme) {
        const normalizedTheme = theme === 'light' ? 'light' : 'dark';
        document.documentElement.dataset.theme = normalizedTheme;

        try {
            localStorage.setItem('alditoTheme', normalizedTheme);
        } catch (error) {
        }

        return normalizedTheme;
    }

    function syncThemeButton(button, theme) {
        if (!button) {
            return;
        }

        const isDarkTheme = theme === 'dark';
        button.textContent = isDarkTheme ? 'Modo claro' : 'Modo oscuro';
        button.setAttribute('aria-label', isDarkTheme ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        button.setAttribute('aria-pressed', isDarkTheme ? 'true' : 'false');
    }

    function bindThemeToggle(button) {
        if (!button) {
            return;
        }

        syncThemeButton(button, applyTheme(getStoredTheme()));

        button.addEventListener('click', function () {
            const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            syncThemeButton(button, applyTheme(nextTheme));
        });
    }

    applyTheme(getStoredTheme());

    document.addEventListener('DOMContentLoaded', function () {
        bindThemeToggle(document.getElementById('theme-toggle'));
    });

    window.AlditoTheme = {
        getStoredTheme,
        applyTheme,
        syncThemeButton,
        bindThemeToggle,
    };
})();
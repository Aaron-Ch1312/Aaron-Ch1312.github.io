document.addEventListener('DOMContentLoaded', function () {
    const desktopAuthButtons = document.getElementById('desktop-auth-buttons');
    const desktopUserMenu = document.getElementById('desktop-user-menu');
    const userMenuTrigger = document.getElementById('user-menu-trigger');
    const desktopUserPanel = document.getElementById('desktop-user-panel');
    const navAvatarChar = document.getElementById('nav-avatar-char');
    const navUsername = document.getElementById('nav-username');
    const panelAvatarChar = document.getElementById('panel-avatar-char');
    const panelUsername = document.getElementById('panel-username');
    const panelUserSub = document.getElementById('panel-user-sub');
    const panelBtnLogout = document.getElementById('panel-btn-logout');

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');

    const mobileAuthActions = document.getElementById('mobile-auth-actions');
    const mobileSessionActions = document.getElementById('mobile-session-actions');
    const mobileProfileName = document.getElementById('mobile-profile-name');
    const mobileProfileSub = document.getElementById('mobile-profile-sub');
    const mobileAvatar = document.getElementById('mobile-avatar');
    const mobileBtnLogout = document.getElementById('mobile-btn-logout');

    const btnIniciaOperacion = document.getElementById('btn-inicia-operacion');
    const purchaseCard = document.querySelector('.precio-caja.compra');
    const saleCard = document.querySelector('.precio-caja.venta');
    const purchaseRate = parseFloat(purchaseCard.querySelector('.valor').textContent);
    const saleRate = parseFloat(saleCard.querySelector('.valor').textContent);
    const amountYouHave = document.getElementById('monto-envio');
    const amountYouWant = document.getElementById('monto-recibo');
    
    const haveGroup = amountYouHave.closest('.ingresar-monto');
    const wantGroup = amountYouWant.closest('.ingresar-monto');
    const haveLabel = haveGroup.querySelector('label');
    const wantLabel = wantGroup.querySelector('label');
    const haveSymbol = haveGroup.querySelector('.moneda-simbolo');
    const wantSymbol = wantGroup.querySelector('.moneda-simbolo');
    const haveCode = haveGroup.querySelector('.moneda-codigo');
    const wantCode = wantGroup.querySelector('.moneda-codigo');
    
    const currencyFormat = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const defaultHaveValue = amountYouHave.value;
    const defaultWantValue = amountYouWant.value;

    let exchangeMode = 'compra';

    if (userMenuTrigger && desktopUserPanel) {
        userMenuTrigger.addEventListener('click', function (e) {
            e.stopPropagation();
            desktopUserPanel.classList.toggle('hidden');
        });

        document.addEventListener('click', function (e) {
            if (!desktopUserPanel.contains(e.target) && !userMenuTrigger.contains(e.target)) {
                desktopUserPanel.classList.add('hidden');
            }
        });
    }

    const openMenu = () => {
        if (hamburgerBtn) hamburgerBtn.classList.add('open');
        if (mobileMenu) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0', 'open');
        }
        if (overlay) {
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            overlay.classList.add('opacity-100', 'active');
        }
        document.body.style.overflow = 'hidden'; 
    };

    const closeMenu = () => {
        if (hamburgerBtn) hamburgerBtn.classList.remove('open');
        if (mobileMenu) {
            mobileMenu.classList.remove('translate-x-0', 'open');
            mobileMenu.classList.add('translate-x-full');
        }
        if (overlay) {
            overlay.classList.remove('opacity-100', 'active');
            overlay.classList.add('opacity-0', 'pointer-events-none');
        }
        document.body.style.overflow = ''; 
    };

    if (hamburgerBtn && closeMenuBtn && overlay) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        closeMenuBtn.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);
    }

    function checkSession() {
        const isSessionActive = sessionStorage.getItem('usuarioRegistrado') === 'true';
        const storedUser = sessionStorage.getItem('usuarioAldito');

        if (isSessionActive && storedUser) {
            try {
                const user = JSON.parse(storedUser);
                const userDisplayName = user.nombre || 'Usuario';
                const userEmail = user.correo || '';

                if (desktopAuthButtons) desktopAuthButtons.classList.add('hidden');
                if (desktopUserMenu) desktopUserMenu.classList.remove('hidden');

                if (navUsername) navUsername.textContent = userDisplayName;
                if (navAvatarChar) navAvatarChar.textContent = userDisplayName.charAt(0).toUpperCase();

                if (panelUsername) panelUsername.textContent = userDisplayName;
                if (panelUserSub) panelUserSub.textContent = userEmail;
                if (panelAvatarChar) panelAvatarChar.textContent = userDisplayName.charAt(0).toUpperCase();

                if (mobileProfileName) mobileProfileName.textContent = userDisplayName;
                if (mobileProfileSub) mobileProfileSub.textContent = userEmail;
                if (mobileAvatar) mobileAvatar.textContent = userDisplayName.charAt(0).toUpperCase();

                if (mobileAuthActions) mobileAuthActions.classList.add('hidden');
                if (mobileSessionActions) mobileSessionActions.classList.remove('hidden');

            } catch (error) {
                clearSessionUI();
            }
        } else {
            clearSessionUI();
        }
    }

    function clearSessionUI() {
        if (desktopAuthButtons) desktopAuthButtons.classList.remove('hidden');
        if (desktopUserMenu) desktopUserMenu.classList.add('hidden');

        if (navUsername) navUsername.textContent = 'Mi Cuenta';
        if (navAvatarChar) navAvatarChar.textContent = 'U';

        if (mobileProfileName) mobileProfileName.textContent = 'Invitado';
        if (mobileProfileSub) mobileProfileSub.textContent = 'Inicia sesión para operar';
        if (mobileAvatar) mobileAvatar.textContent = 'U';

        if (mobileAuthActions) mobileAuthActions.classList.remove('hidden');
        if (mobileSessionActions) mobileSessionActions.classList.add('hidden');
    }

    function logoutSession() {
        sessionStorage.removeItem('usuarioRegistrado');
        sessionStorage.removeItem('usuarioAldito');
        clearSessionUI();
        window.location.reload(); 
    }

    if (panelBtnLogout) {
        panelBtnLogout.addEventListener('click', function (e) {
            e.preventDefault();
            logoutSession();
        });
    }

    if (mobileBtnLogout) {
        mobileBtnLogout.addEventListener('click', function (e) {
            e.preventDefault();
            logoutSession();
        });
    }

    function formatAmount(value) {
        return Number.isFinite(value) ? currencyFormat.format(value) : '';
    }

    function parseAmount(value) {
        const parsed = parseFloat(String(value).replace(/,/g, ''));
        return Number.isFinite(parsed) ? parsed : NaN;
    }

    function clearDefaultValue(input, defaultValue) {
        if (input.dataset.shouldClear === 'true') {
            if (input.value === defaultValue) {
                input.value = '';
            }
            input.dataset.shouldClear = 'false';
        }
    }

    function syncModeStyles() {
        if (purchaseCard) purchaseCard.classList.toggle('activa', exchangeMode === 'compra');
        if (saleCard) saleCard.classList.toggle('activa', exchangeMode === 'venta');
    }

    function syncFormLabels() {
        if (exchangeMode === 'compra') {
            if (haveLabel) haveLabel.textContent = 'Tienes';
            if (wantLabel) wantLabel.textContent = 'Quieres';
            if (haveSymbol) haveSymbol.textContent = '$';
            if (wantSymbol) wantSymbol.textContent = 'S/';
            if (haveCode) haveCode.textContent = 'USD';
            if (wantCode) wantCode.textContent = 'PEN';
        } else {
            if (haveLabel) haveLabel.textContent = 'Tienes';
            if (wantLabel) wantLabel.textContent = 'Quieres';
            if (haveSymbol) haveSymbol.textContent = 'S/';
            if (wantSymbol) wantSymbol.textContent = '$';
            if (haveCode) haveCode.textContent = 'PEN';
            if (wantCode) wantCode.textContent = 'USD';
        }
    }

    function updateResultFromHave() {
        if (!amountYouHave || !amountYouWant) return;
        const amount = parseAmount(amountYouHave.value);
        if (!Number.isFinite(amount)) {
            amountYouWant.value = '';
            return;
        }
        const result = exchangeMode === 'compra' ? amount * purchaseRate : amount / saleRate;
        amountYouWant.value = formatAmount(result);
    }

    function updateHaveFromResult() {
        if (!amountYouHave || !amountYouWant) return;
        const amount = parseAmount(amountYouWant.value);
        if (!Number.isFinite(amount)) {
            amountYouHave.value = '';
            return;
        }
        const result = exchangeMode === 'compra' ? amount / purchaseRate : amount * saleRate;
        amountYouHave.value = formatAmount(result);
    }

    function setExchangeMode(mode) {
        exchangeMode = mode;
        syncModeStyles();
        syncFormLabels();
        updateResultFromHave();
    }

    if (amountYouHave && amountYouWant) {
        amountYouHave.dataset.shouldClear = 'true';
        amountYouWant.dataset.shouldClear = 'true';

        amountYouHave.addEventListener('focus', () => clearDefaultValue(amountYouHave, defaultHaveValue));
        amountYouWant.addEventListener('focus', () => clearDefaultValue(amountYouWant, defaultWantValue));

        amountYouHave.addEventListener('input', () => {
            amountYouHave.dataset.shouldClear = 'false';
            updateResultFromHave();
        });

        amountYouWant.addEventListener('input', () => {
            amountYouWant.dataset.shouldClear = 'false';
            updateHaveFromResult();
        });
    }

    if (purchaseCard) {
        purchaseCard.addEventListener('click', () => setExchangeMode('compra'));
    }
    if (saleCard) {
        saleCard.addEventListener('click', () => setExchangeMode('venta'));
    }

    if (btnIniciaOperacion) {
        btnIniciaOperacion.addEventListener('click', function () {
            const isSessionActive = sessionStorage.getItem('usuarioRegistrado') === 'true';
            if (!isSessionActive) {
                window.location.href = 'login.html?return=operacion.html';
                return;
            }
            window.location.href = 'operacion.html';
        });
    }

    checkSession();
    syncModeStyles();
    syncFormLabels();
    updateResultFromHave();
});
//General script: sidebar menu, user login localstorage & DOM
document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin');
    const registerForm = document.getElementById('registrer');

    const users = JSON.parse(localStorage.getItem('users')) || [];

    function isUserLoggedIn() {
        const sessionUser = sessionStorage.getItem('sessionUser');
        return sessionUser && users.some(user => user.newuser === sessionUser);
    }

    if (isUserLoggedIn()) {
        window.location.href = 'index.html';
    } else {
        signinForm.style.display = 'block';
        registerForm.style.display = 'none';
    }

    signinForm.querySelector('[name="signin').addEventListener('click', (e) => {
        e.preventDefault();
        const username = document.getElementById('user').value;
        const password = document.getElementById('password').value;

        const user = users.find(user => user.newuser === username && user.newpassword === password);
        if (user) {
            sessionStorage.setItem('sessionUser', user.newuser);
            window.location.href = 'index.html';
        } else {
            alert('¡Nombre de usuario o contraseña inválidos!');
        }
    });

    signinForm.querySelector('[name="signup"]').addEventListener('click', (e) => {
        e.preventDefault();
        signinForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    registerForm.querySelector('[name="back"]').addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        signinForm.style.display = 'block';
    });

    const cities = [
        { name: 'Madrid', postcode: '28001' },
        { name: 'Barcelona', postcode: '08001' },
        { name: 'Valencia', postcode: '46001' },
        { name: 'Sevilla', postcode: '41001' },
        { name: 'Zaragoza', postcode: '50001' },
        { name: 'Málaga', postcode: '29001' },
        { name: 'Murcia', postcode: '30001' },
        { name: 'Palma', postcode: '07001' },
        { name: 'Las Palmas', postcode: '35001' },
        { name: 'Bilbao', postcode: '48001' },
        { name: 'Alicante', postcode: '03001' },
        { name: 'Córdoba', postcode: '14001' },
        { name: 'Valladolid', postcode: '47001' },
        { name: 'Vigo', postcode: '36201' },
        { name: 'Gijón', postcode: '33201' }
    ];

    const citySelect = document.getElementById('city');
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.postcode;
        option.textContent = city.name;
        citySelect.appendChild(option);
    });

    citySelect.addEventListener('change', () => {
        const postcodeInput = document.getElementById('postalcode');
        const selectedCity = cities.find(city => city.postcode === citySelect.value);
        postcodeInput.value = selectedCity ? selectedCity.postcode : '';
    });

    registerForm.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('nameuser').value;
        const lastName = document.getElementById('lastuser').value;
        const newUser = document.getElementById('newuser').value;
        const newPassword = document.getElementById('newpassword').value;
        const verifyPassword = document.getElementById('newpassword2').value;
        const idCard = document.getElementById('userid').value;
        const email = document.getElementById('email').value;

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/.test(newPassword)) {
            return alert('La contraseña debe tener entre 6 y 8 caracteres, incluir letras mayúsculas y minúsculas, un número y un carácter especial.');
        }

        if (newPassword !== verifyPassword) {
            return alert('¡Las contraseñas no coinciden!');
        }

        if (users.some(user => user.newuser === newUser)) {
            return alert('¡El nombre de usuario ya existe!');
        }

        const newUserObject = {
            name,
            lastName,
            newuser: newUser,
            newpassword: newPassword,
            idCard,
            email,
            city: citySelect.options[citySelect.selectedIndex].text,
            postcode: document.getElementById('postalcode').value
        };

        users.push(newUserObject);
        localStorage.setItem('users', JSON.stringify(users));

        alert('¡Registro exitoso! Por favor, inicie sesión.');
        registerForm.style.display = 'none';
        signinForm.style.display = 'block';
    });

    window.addEventListener('unload', () => {
        sessionStorage.removeItem('sessionUser');
    });
});

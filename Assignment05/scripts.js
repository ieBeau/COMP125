/* scripts.js */

// Hover Styling
function hoverLabel(name, hover) {
    const label = document.getElementById(name);
    if (hover) {
        label.style.color = 'blue';
        label.style.fontWeight = 'bold';
    } else {
        label.style.color = 'black';
        label.style.fontWeight = 'bold';
    }
}

// Handle Name Input
function nameInput() {
    let fullName = document.getElementById('fullName').value;

    let letters = fullName.replace(/[^a-zA-Z\s]/g, '');

    document.getElementById('fullName').value = letters;
}

// Handle Phone Input
function phoneInput() {
    let phone = document.getElementById('phoneNumber').value;

    let digits = phone.replace(/\D/g, '');

    if (digits.length === 0) digits = '';
    else if (digits.length <= 3) digits = `(${digits}`;
    else if (digits.length <= 6) digits = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    else if (digits.length <= 9) digits = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    else digits = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;

    document.getElementById('phoneNumber').value = digits;
}

// Handle Postal Code Input
function postalInput() {
    let postalCode = document.getElementById('postalCode').value;

    const [current, previous] = [postalCode.charAt(postalCode.length - 1), postalCode.charAt(postalCode.length - 2)];
    if (isNaN(current) && isNaN(previous)
       || !isNaN(current) && !isNaN(previous)) postalCode = postalCode.slice(0, -1);

    let digits = postalCode.replace(/[^a-zA-Z0-9]/g, '');

    if (digits.length === 0) digits = '';
    else if (digits.length <= 3) digits = `${digits}`;
    else if (digits.length <= 6) digits = `${digits.slice(0, 3)} ${digits.slice(3)}`;
    else digits = `${digits.slice(0, 3)} ${digits.slice(3, 6)}`;

    document.getElementById('postalCode').value = digits.toUpperCase();
}

// Handle Experience Dropdown Menu Styling
let dropdown = false;
const workshop = document.getElementById('workshop');
workshop.addEventListener('focus', () => {
    dropdown = false;
    workshop.style.borderRadius = '10px 10px 0 0';
});
workshop.addEventListener('blur', () => {
    dropdown = true;
    workshop.style.borderRadius = '10px 10px 10px 10px';
});
function dropdownMenu() {
    dropdown = !dropdown;
    if (dropdown) workshop.style.borderRadius = '10px 10px 0 0';
    else workshop.style.borderRadius = '10px 10px 10px 10px';
}

// Handle Submit Button Click
document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault();

    // Handle Name Validation
    const name = document.getElementById('fullName');
    handleNameValidation(name);

    // Handle Email Validation
    const email = document.getElementById('email');
    handleEmailValidation(email);

    // Handle Postal Code Validation
    const postalCode = document.getElementById('postalCode');
    handlePostalCodeValidation(postalCode);

    // Handle Phone Number Validation
    const phoneNumber = document.getElementById('phoneNumber');
    handlePhoneValidation(phoneNumber);

    // Handle Experience Validation
    const experience = Array.from(document.getElementsByName('experienceLevel'));
    handleExperienceValidation(experience);

    // Handle Workshop Validation
    const workshop = document.getElementById('workshop');
    handleWorkshopValidation(workshop);

    // Handle Form Submission
    const formData = {
        fullName: name.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        postalCode: postalCode.value,
        experienceLevel: experience.find(item => item.checked)?.value,
        workshopTopic: workshop.value
    };

    const form = document.getElementById('registrationForm');
    if (form.checkValidity()) {
        event.preventDefault();

        handleFormSubmission(form, formData);
    }
});

function handleNameValidation(name) {
    const nameError = document.getElementById('fullNameError');

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name.value)) {
        name.focus();

        nameError.textContent = 'Invalid name format';
        nameError.style.color = 'red';
        return;
    } else {
        nameError.textContent = '';
    }
}

function handleEmailValidation(email) {
    const emailError = document.getElementById('emailError');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.value)) {
        email.focus();

        const missingParts = [];
        if (!/@/.test(email.value)) missingParts.push('Missing "@"');
        if (!/\./.test(email.value)) missingParts.push('Missing "."');
        if (!/^[a-zA-Z0-9._%+-]+/.test(email.value)) missingParts.push('Invalid local');
        if (!/@[a-zA-Z0-9.-]+/.test(email.value)) missingParts.push('Invalid domain');
        if (!/\.[a-zA-Z]{2,}$/.test(email.value)) missingParts.push('Invalid top-level');

        // console.log('Invalid email format:', missingParts.join(', '));

        emailError.innerHTML = 'Invalid email format.<br>' + missingParts.join('<br>');
        emailError.style.color = 'red';
        return;
    } else {
        emailError.textContent = '';
    }
}

function handlePostalCodeValidation(postalCode) {
    const postalError = document.getElementById('postalError');
    
    const postalRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;
    if (!postalRegex.test(postalCode.value)) {
        postalCode.focus();

        postalError.textContent = 'Invalid postal code';
        postalError.style.color = 'red';
        return;
    } else {
        postalError.textContent = '';
    }
}

function handlePhoneValidation(phoneNumber) {
    const phoneDigits = phoneNumber.value.replace(/\D/g, '');

    const phoneError = document.getElementById('phoneError');
    if (phoneDigits.length !== 10) {
        phoneNumber.focus();

        phoneError.textContent = 'Invalid phone number';
        phoneError.style.color = 'red';
        return;
    } else {
        phoneError.textContent = '';
    }
}

function handleExperienceValidation(experience) {
    const experienceError = document.getElementById('experienceError');
    if (experience.every(item => item.checked === false)) {
        experience[0].focus();

        experienceError.textContent = 'Please select an experience level';
        experienceError.style.color = 'red';
        return;
    } else {
        experienceError.textContent = '';
    }
}

function handleWorkshopValidation(workshop) {
    const workshopError = document.getElementById('workshopError');

    if (workshop.value === '') {
        workshop.focus();

        workshopError.textContent = 'Please select a workshop topic';
        workshopError.style.color = 'red';
        return;
    } else {
        workshopError.textContent = '';
    }
}

function handleFormSubmission(form, formData) {
    // If success message is found, return.
    const validation = document.getElementById('formValidation');
    if (validation) return;
        
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        const body = document.body;
        const background = document.createElement('div');
        background.id = 'formBackground';
        background.className = 'formBackground';
        body.append(background);

        const main = document.querySelector('main');
        const validation = document.createElement('div');
        validation.id = 'formValidation';
        validation.className = 'formValidation';
        validation.innerHTML = '<h3>Form Submitted Successfully!</h3>';

        const button = document.createElement('button');
        button.type = 'button';
        button.id = 'submit';
        button.className = 'submit';
        button.textContent = 'Close';
        button.style.marginTop = '20px';
        button.onclick = () => {
            form.reset();
            validation.remove();
            background.remove();
        };
        validation.appendChild(button);

        main.appendChild(validation);
        
        confetti({
            particleCount: 600,
            spread: 120,
            origin: { x: 1, y: 0.9 },
        });

        confetti({
            particleCount: 600,
            spread: 120,
            origin: { x: 0, y: 0.9 },
        });
    })
    .catch(error => console.error('Error:', error));
    
}
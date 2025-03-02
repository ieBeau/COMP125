// scripts.js

// Phone Masking
function maskPhone() {
    let phone = document.getElementById('applicantPhone').value;

    let digits = phone.replace(/\D/g, '');

    if (digits.length === 0) digits = '';
    else if (digits.length <= 3) digits = `(${digits}`;
    else if (digits.length <= 6) digits = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    else if (digits.length <= 9) digits = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    else digits = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;

    document.getElementById('applicantPhone').value = digits;
}

// SIN Masking
function moveToNext(current, nextFieldId) {
    current.value = current.value.replace(/\D/g, '');
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextFieldId).focus();
    }
}

function combineSIN() {
    const sin1 = document.getElementById('applicantSin1').value;
    const sin2 = document.getElementById('applicantSin2').value;
    const sin3 = document.getElementById('applicantSin3').value;
    document.getElementById('applicantSin').value = sin1 + sin2 + sin3;
}

// Toggle YES/NO requirements

// Citizenship //
function toggleCitizen(isRequired) {
    const label = document.getElementById('eligibleNonCitizenLabel');

    const yesButton = document.getElementById('eligibleNonCitizenYes');
    const noButton = document.getElementById('eligibleNonCitizenNo');

    const yesLabel = document.getElementById('eligibleNonCitizenYesLabel');
    const noLabel = document.getElementById('eligibleNonCitizenNoLabel');

    yesButton.required = !isRequired;
    noButton.required = !isRequired;
    
    yesButton.disabled = isRequired;
    noButton.disabled = isRequired;

    if (!isRequired) {
        label.style.color = 'black';
        yesLabel.style.color = 'black';
        noLabel.style.color = 'black';
    } else {
        yesButton.checked = false;
        noButton.checked = false;

        label.style.color = '#cacaca';
        yesLabel.style.color = '#cacaca';
        noLabel.style.color = '#cacaca';
    }
}

// Previous Work Experience //
function toggleEligiblePastWork(isRequired) {
    const label = document.getElementById('eligiblePastWorkLabel');
    
    const startButton = document.getElementById('eligiblePastWorkStartDate');
    const endButton = document.getElementById('eligiblePastWorkEndDate');

    const startLabel = document.getElementById('eligiblePastWorkStartDateLabel');
    const endLabel = document.getElementById('eligiblePastWorkEndDateLabel');
    
    startButton.required = isRequired;
    endButton.required = isRequired;
    
    startButton.disabled = !isRequired;
    endButton.disabled = !isRequired;

    if (!isRequired) {
        startButton.value = "";
        endButton.value = "";

        label.style.color = '#cacaca';
        startLabel.style.color = '#cacaca';
        endLabel.style.color = '#cacaca';
    } else {
        label.style.color = 'black';
        startLabel.style.color = 'black';
        endLabel.style.color = 'black';
    }
}

// Criminal Charges //
function toggleCriminalExplanation(isRequired) {
    const label = document.getElementById('eligibleCriminalChargesLabel');
    const textArea = document.getElementById('eligibleCriminalChargesReason')
    
    textArea.required = isRequired;
    
    textArea.disabled = !isRequired;

    if (!isRequired) {
        label.style.color = '#cacaca';
        textArea.style.color = '#cacaca';
    } else {
        label.style.color = 'black';
        textArea.style.color = 'black';
    }
}

// Education Dropdown Menu
const schoolCertificate = document.getElementById('schoolCertificate');
const schoolDropdown = document.getElementById('educationLevel');

schoolDropdown.addEventListener('change', function () {
    if (schoolDropdown.value === 'highSchool') schoolCertificate.innerHTML = "DIPLOMA:";
    else schoolCertificate.innerHTML = "DEGREE:";
});

let closed = true;
schoolDropdown.addEventListener('blur', function() {
    schoolDropdown.style.borderRadius = "10px";
    closed = true;
});

schoolDropdown.addEventListener('click', function() {
    if (closed) {
        schoolDropdown.style.borderTopLeftRadius = "10px";
        schoolDropdown.style.borderTopRightRadius = "10px";
        schoolDropdown.style.borderBottomLeftRadius = "0";
        schoolDropdown.style.borderBottomRightRadius = "0";
    } else {
        schoolDropdown.style.borderRadius = "10px";
    }
    closed = !closed;
});

// Style Alterations
const dateInputs = document.querySelectorAll("input[type='date']");

function updateOpacity() {
    dateInputs.forEach(dateInput => {
        dateInput.style.color = dateInput.value ? "black" : "#808080";
    });
}

dateInputs.forEach(dateInput => {
    dateInput.addEventListener("input", updateOpacity);
});

updateOpacity();

// Animations
document.querySelector(".submit").addEventListener("click", (event) => {
    
    const form = document.getElementById('employment-form');

    if (form.checkValidity()) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};
        
        formData.forEach((value, key) => {
            if (value === "true" || value === "false") data[key] = value === "true";
            else data[key] = value;
        });
    
        console.log(data);

        confetti({
            particleCount: 300,
            spread: 90,
            origin: { x: 1, y: 0.9 },
        });

        confetti({
            particleCount: 300,
            spread: 90,
            origin: { x: 0, y: 0.9 },
        });

        setTimeout(() => {
            form.submit();
        }, 20000); // 20 second timeout, to demonstrate the form data being logged
    }
});
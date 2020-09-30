// Variables
const btnSend = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const form = document.querySelector('#enviar-mail');

// Input Variables
const email = document.querySelector('#email');
const subject = document.querySelector('#asunto');
const message = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

function eventListeners() {
    // When the app launch
    document.addEventListener('DOMContentLoaded', launchApp);

    // Fields of form
    email.addEventListener('blur', validateForm);
    subject.addEventListener('blur', validateForm);
    message.addEventListener('blur', validateForm);

    // Reset form
    btnReset.addEventListener('click', resetForm);

    // Send email
    form.addEventListener('submit', sendEmail);
}


// Functions
function launchApp() {
    btnSend.disabled = true;
    // Tailwind class for button disabled
    btnSend.classList.add('cursor-not-allowed','opacity-50');
}

// Validate form
function validateForm(e) {

    // console.log(e.target.value); // Debugger
    if(e.target.value.length > 0){

        //Delete errors...
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        // Add border color validation
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        // Add border color validation
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        showError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email'){
        
        
        if(er.test(e.target.value)){
            //Delete errors...
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            // Add border color validation
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            // Add border color valid ation
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            showError('Email no válido');
        }
    }

    if(er.test(email.value) !== '' && subject.value !== '' && message.value !== ''){
        // console.log('Validacion exitosa'); Debugger
        btnSend.disabled = false;
        btnSend.classList.remove('cursor-not-allowed','opacity-50');
    } 
}

function showError(message) {
    const messageError = document.createElement('P');
    messageError.textContent = message;
    messageError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errors = document.querySelectorAll('.error');

    if(errors.length === 0) {
        form.appendChild(messageError);
    }    
}

function sendEmail(e){
    e.preventDefault();
    
    // Show spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // After 3 seconds hide spinner and show message
    setTimeout(()=>{
        spinner.style.display = 'none';

        // Message after spinner
        const paragraph = document.createElement('P');
        paragraph.textContent = 'Mensaje enviado correctamente';
        paragraph.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        // Insert paragraph before spinner
        form.insertBefore(paragraph, spinner);

        setTimeout(()=>{
            paragraph.remove(); // Delete success mesagge
            resetForm();
        },5000);
    },3000);
}

// Reset form
function resetForm() {
    form.reset();
    launchApp();
}
let showError = (message, container) => {
    let errorMessage = document.getElementById('error-message');
    if (errorMessage) errorMessage.remove();

    let errorElement = document.createElement('div');
    errorElement.id = 'error-message';
    errorElement.textContent = message;
    container.appendChild(errorElement);
};

let capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

export { showError, capitalizeFirstLetter };
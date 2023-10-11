const spinner = (parentNode)=>{
    const spinnerContainer = document.createElement('div');
    spinnerContainer.classList.add('d-flex', 'justify-content-center');
    const spinner = document.createElement('div');
    spinner.classList.add('spinner-border', 'text-primary');
    spinner.role = 'status';
    spinner.id = 'spinner';
    const span = document.createElement('span');
    span.classList.add('visually-hidden');
    span.textContent = "Loading...";
    spinner.append(span);
    spinnerContainer.append(spinner)
    document.querySelector(parentNode).append(spinnerContainer);
}

export default spinner;
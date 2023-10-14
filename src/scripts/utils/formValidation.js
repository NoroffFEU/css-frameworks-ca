

export default class formValidation{
    /**
     * 
     * @param {string} selector 
     */
    constructor(selector){
        this.form = document.querySelector(selector);
        this.inputs = Array.from(this.form.querySelectorAll('input'));
        this.validInputs = new Set();
    }

    /**
     * 
     * @param {string} selector 
     * @param {Function} check 
     */
    validate(selector, check){
        const input = this.form.querySelector(selector);
        const errorMessage = input.closest('.input-container').querySelector('.error-message');
        const submitFormButton = this.form.querySelector('#signup-button');
        input.addEventListener('input', ()=>{
            const {isValid, error} = check(input.value);
            isValid ? this.validInputs.add(input) : this.validInputs.delete(input);
            errorMessage.textContent = isValid ? '' : error;
            submitFormButton.disabled = this.validInputs.size !== this.inputs.length;
        });
    }
}
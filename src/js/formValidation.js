const formInputs = document.querySelector("fieldset").elements;
const btn = document.querySelector(".btn-primary");

console.dir(formInputs);

function formCheck() {
    for (let i = 0; i < formInputs.length; i++) {
        let chekInp = formInputs[i];
        console.log(chekInp.validity.valid)
        if (chekInp.validity.valid === true) {
            btn.disabled = false;
        }
    }
}


for (let i = 0; i < formInputs.length; i++) {
    const input = formInputs[i];
    input.onkeyup  = (e) => formCheck();
}
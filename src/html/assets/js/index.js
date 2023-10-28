import {userNameInput, userPasswdInput, submitBtn, errorElement} from "./modules/selectedElements.js";
import {validMail, validLength} from "./modules/validationFunctions.js";

submitBtn.addEventListener("click",(e) => {
  e.preventDefault();

  let validationError = [];

  const userName = userNameInput.value;
  const passWord = userPasswdInput.value;


  if(!validMail(userName) || validMail(userName) === null) {
    validationError.push("E-Mail must be of valid format");
  }

  if(!validLength(passWord)) {
    validationError.push("Password must be a minimum of 8 characters");
  }

  if(validationError.length === 0) {
    window.location.href = "/profile";
  } else {
    let errorOutput = "";
    validationError.map((err) => {
      const errorMsg = `<div class="alert bg-danger-subtle" role="alert">
        ${err}
      </div>`;
      errorOutput += errorMsg;
    });
    errorElement.innerHTML = errorOutput;
  }
});
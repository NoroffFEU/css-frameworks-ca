import {userNameInput, userPasswdInput, submitBtn} from "./modules/selectedElements.js";
import {validMail, validLength} from "./modules/validationFunctions.js";

submitBtn.addEventListener("click",(e) => {
  e.preventDefault();

  let validationError = [];

  const userName = userNameInput.value;
  const passWd = userPasswdInput.value;

  if(!validMail(userName)) {
    validationError.push("E-Mail must be of valid format");
  }

  if(validLength(passWd.length, 8) {
    validationError.push("Password must be a minimum of 8 characters");
  }


  alert("Button clicked");
});
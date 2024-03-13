export function validateEmail(email) {
    const emailRegex = /@noroff\.no$|@stud\.noroff\.no$/;
    return emailRegex.test(email);
}

export function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
}
export default function validateSelect(domEl) {
    if (!domEl.value) {
        domEl.style.border = "solid 3px red";
        return false;
    }
    else {
        domEl.style.border = "none";
        return true;
    }
}

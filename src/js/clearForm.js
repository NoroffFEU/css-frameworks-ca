export default function clearForm() {
    document
        .querySelectorAll("[data-formClear]")
        .forEach((input) => (input.value = ""));
}

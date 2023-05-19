export function dateTemplate(date) {
    return new Date(date).toLocaleString("en-US", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}
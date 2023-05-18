export const dateTemplate = (date) => new Date(date).toLocaleString("no-NO", {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
}) + ' at ' + new Date(date).toLocaleTimeString("no-NO", {
    hour: 'numeric',
    minute: 'numeric'
});
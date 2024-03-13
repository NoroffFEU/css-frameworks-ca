export default function formatNumber(number) {
    if (number >= 1000) {
        const roundedNumber = Math.round(number / 100) / 10;
        return `${roundedNumber}k`;
    }
    return number.toString();
}
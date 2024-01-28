// Funksjon for å bytte mellom Follow og Unfollow
function toggleFollow() {
    const followBtn = document.getElementById('followBtn');

    // Bytt tekst og farge basert på gjeldende tilstand
    if (followBtn.innerText === 'Follow') {
        followBtn.innerText = 'Unfollow';
        followBtn.classList.remove('btn-primary');
        followBtn.classList.add('btn-secondary');
    } else {
        followBtn.innerText = 'Follow';
        followBtn.classList.remove('btn-secondary');
        followBtn.classList.add('btn-primary');
    }

    // Legg til logikk for å sende en follow/unfollow forespørsel til serveren
    // Du kan bruke AJAX eller andre metoder for dette formålet
    // Eksempel: sendFollowRequest();
}

// Legg til event listener når DOM er lastet
document.addEventListener('DOMContentLoaded', function() {
    // Hent knappen og legg til en lytter for klikk-hendelse
    const followBtn = document.getElementById('followBtn');
    followBtn.addEventListener('click', toggleFollow);
});


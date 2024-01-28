// Funksjon for å bytte mellom Follow og Unfollow
function toggleFollow() {
    const followBtn = document.getElementById('followBtn');
    if (followBtn.innerText === 'Follow') {
        followBtn.innerText = 'Unfollow';
        followBtn.classList.remove('btn-primary');
        followBtn.classList.add('btn-secondary');
    } else {
        followBtn.innerText = 'Follow';
        followBtn.classList.remove('btn-secondary');
        followBtn.classList.add('btn-primary');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const followBtn = document.getElementById('followBtn');
    followBtn.addEventListener('click', toggleFollow);
});


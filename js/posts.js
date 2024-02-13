// Funksjoner for å håndtere opprettelse, visning, redigering, og sletting av innlegg



// Modal 

// Få modalen
var modal = document.getElementById("createPostModal");

// Få knappen som åpner modalen
var btn = document.getElementById("myBtn");

// Få <span> elementet som lukker modalen
var span = document.getElementsByClassName("close-button")[0];

// Når brukeren klikker på knappen, åpne modalen
btn.onclick = function() {
    modal.style.display = "block";
}

// Når brukeren klikker på <span> (x), lukk modalen
span.onclick = function() {
    modal.style.display = "none";
}

// Når brukeren klikker hvor som helst utenfor modalen, lukk den
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

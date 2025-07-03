// 1. Génère un nombre aléatoire entre 1 et 100
const nombreMystere = Math.floor(Math.random() * 100) + 1;

let nombreDeTentative = 5, i;

// 2.1. Sélectionne les éléments HTML
const input = document.getElementById("guessInput");
const button = document.getElementById("guessButton");
const result = document.getElementById("result");

// 2.2. Construction des resultats avec voix
function afficherMessageVoix(msg) {
    result.textContent = msg;

    // Creation de l'objet pour la synthese vocale
    const utterance = new SpeechSynthesisUtterance(msg);
    utterance.lang = 'fr-FR'; // choix de la langue

    // Optionnel : choix d’une voix spécifique
    const voices = window.speechSynthesis.getVoices();
    const voixFr = voices.find(voice => voice.lang === 'fr-FR');
    if (voixFr) utterance.voice = voixFr;

    // Lecture
    speechSynthesis.speak(utterance);

}

// 3. Ajoute un événement au bouton
button.addEventListener("click", function () {
    const proposition = Number(input.value); // Convertit le texte en nombre
    // Nombre de tentative diminuer a chaque click
    nombreDeTentative--;

    // 4. Compare la proposition avec le nombre mystère
    if (proposition < 1 || proposition > 100) {
        afficherMessageVoix("Entre 1 et 100, s'il te plaît.");
    } else if (proposition < nombreMystere) {
        afficherMessageVoix("Trop petit !");
    } else if (proposition > nombreMystere) {
        afficherMessageVoix("Trop grand !");
    } else {
        afficherMessageVoix("Bravo Tu as trouvé le nombre !");
        button.style.background = 'silver';
        button.disabled = true; // Désactive le bouton après victoire
    }

    if(nombreDeTentative === 0 && proposition !== nombreMystere){
        afficherMessageVoix("Vous avez perdu!");
        button.style.background = 'silver';
        button.disabled = true; // Désactive le bouton après defaite
    }

    const lettreParLettre = document.querySelector('.lettreParlettr');
    lettreParLettre.textContent = `Il vous reste ${nombreDeTentative} tentatives`;

    input.value = ""; // Vide l'input après chaque essai
    input.focus();    // Replace le curseur dans l'input
    
});

// function affichageTexteTentative() {
//     // Affiche lettre par lettre d'une chaine de caractere

//     const text = `Il vous reste ${nombreDeTentative} tentatives!`;
//     const lettreParLettre = document.querySelector('.lettreParlettr');
//     const sound = document.querySelector('.typeSound');

//     // sound.loop = true;
//     // sound.play();

//     let index = 0;

//     const interval = setInterval(() => {
//         if (index < text.length) {
//             lettreParLettre.textContent += text[index];
//             index++;
//         } else {
//             clearInterval(interval);
//         }
//     }, 100);

// }




const canvas = document.querySelector('.canvas-particule');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particuleTab;

class Particule{
    constructor(x, y, directionX, directionY, taille, couleur){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.taille = taille;
        this.couleur = couleur;
    }

    dessine(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.taille, 0, Math.PI * 2, false);
        ctx.fillStyle = this.couleur;
        ctx.fill();
    }

    MAJ(){
        if(this.x + this.taille > canvas.width || this.x - this.taille < 0){
            this.directionX = -this.directionX;
        }
        if(this.y + this.taille > canvas.height || this.y - this.taille < 0){
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.dessine();
    }

}

// const obj1 = new Particule(300,300,50,50,100,"red");
// console.log(obj1);
// obj1.dessine();

function init(){
    particuleTab = [];

    for(let i =0 ; i < 100 ; i++){
        let taille = (Math.random() + 0.01) * 2;
        let x = Math.random() * (window.innerWidth - taille * 2);
        let y = Math.random() * (window.innerHeight - taille * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let couleur = "#fff";

        particuleTab.push(new Particule(x,y,directionX,directionY,taille,couleur));
    }
}

function animation(){

    requestAnimationFrame(animation);
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

    for(let i = 0 ; i < particuleTab.length ; i++){
        particuleTab[i].MAJ();
    }

}

function resize(){
    init();
    animation();
}

let doit;
window.addEventListener('resize' , () => {
    clearTimeout(doit);
    doit = setTimeout(resize, 100);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
})

init();
animation();
console.log(particuleTab);

// Animation du texte
function affichageTexteTentative() {
    // Affiche lettre par lettre d'une chaine de caractere

    const text = "Vous etes fans de jeu.\n Alors , jouez";
    const lettreParLettre = document.querySelector('.lettreParlettre');
    lettreParLettre.textContent = "";

    // sound.loop = true;
    // sound.play();

    let index = 0;

    const interval = setInterval(() => {
        if (index < text.length) {
            lettreParLettre.textContent += text[index];
            index++;
        } else {
            clearInterval(interval);

            // Lancer l'effacement apres un petit delai
            setTimeout(() => {
                let reverseIndex = text.length;
                const effacerInterval = setInterval(() => {
                    if(reverseIndex > 0){
                        lettreParLettre.textContent = lettreParLettre.textContent.slice(0, -1);
                        reverseIndex--;
                    } else{
                        clearInterval(effacerInterval);

                        // Relancer l'animation apres effacement
                        setTimeout(() => {
                            affichageTexteTentative(); // Appel recursive
                        } , 1000);
                    }
                }, 100);
            }, 500);
        }
    }, 100);

}
affichageTexteTentative();
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const affichageScore = document.querySelector('.score');

const rayonballe = 10, barreHeight = 10, barreWidth = 75;

// pour les briques
const nbCol = 8, nbRow = 5, largeurBrique = 75, hauteurBrique = 20;

let x = canvas.width / 2, y = canvas.height - 30,
    barreX = (canvas.width - barreWidth) / 2;

let fin = false;

let vitesseX = 5, vitesseY = -5, score = 0;

function dessineBalle() {

    ctx.beginPath();
    ctx.arc(x, y, rayonballe, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();

}
// dessineBalle();

function dessineBarre() {

    ctx.beginPath();
    ctx.rect(barreX, canvas.height - barreHeight - 2, barreWidth, barreHeight);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();

}
// dessineBarre();

// tableau avec toutes les briques

const briques = [];

for (let i = 0; i < nbRow; i++) {
    briques[i] = [];
    for (let j = 0; j < nbCol; j++) {
        briques[i][j] = { x: 0, y: 0, statut: 1 }
    }
}

// console.log(briques);

function dessineBriques() {

    for (let i = 0; i < nbRow; i++) {
        for (let j = 0; j < nbCol; j++) {
            if (briques[i][j].statut === 1) {
                let briqueX = (j * (largeurBrique + 10) + 35);
                let briqueY = (i * (hauteurBrique + 10) + 30);

                briques[i][j].x = briqueX;
                briques[i][j].y = briqueY;

                ctx.beginPath;
                ctx.rect(briqueX, briqueY, largeurBrique, hauteurBrique);
                ctx.fillStyle = '#333';
                ctx.fill();
                ctx.closePath();
            }
        }
    }

}

// detection collision
function collisionDetection() {

    for (let i = 0; i < nbRow; i++) {
        for (let j = 0; j < nbCol; j++) {

            let b = briques[i][j];
            if (b.statut === 1) {
                if (x > b.x && x < b.x + largeurBrique && y > b.y && y < b.y + hauteurBrique) {
                    vitesseY = -vitesseY;
                    b.statut = 0;

                    score++;
                    affichageScore.innerHTML = `Score : ${score}`;

                    if (score === nbCol * nbRow) {

                        affichageScore.innerHTML = 'Bravo ! <br> Clique sur la casse brique pour recommencer.';
                        fin = true;

                    }
                }
            }

        }
    }

}

// Mouvement de la barre
document.addEventListener('mousemove', mouvementSouris);

function mouvementSouris(e) {

    let posXBarreCanvas = e.clientX - canvas.offsetLeft;
    // e.clientX = de la gauche jusqu'a la souris
    // canvas.offsetLeft = decalage par rapport a la gauche
    // console.log(posXBarreCanvas);

    if (posXBarreCanvas > 35 && posXBarreCanvas < canvas.width - 35) {
        barreX = posXBarreCanvas - barreWidth / 2;
    }

}
// dessineBriques();

function desinne() {
    if (fin === false) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dessineBriques();
        dessineBalle();
        dessineBarre();
        collisionDetection();

        if (x + vitesseX > canvas.width - rayonballe || x + vitesseX < rayonballe) {
            vitesseX = -vitesseX;
        } else if (y + vitesseY < rayonballe) {
            vitesseY = -vitesseY;
        }

        // balle rebondit sur la petit barre en bas
        if (y + vitesseY > canvas.height - rayonballe) {
            // intervale  0 - 75
            if (x > barreX && x < barreX + barreWidth) {
                vitesseX = vitesseX + 0.1;
                vitesseY = vitesseY + 0.1;
                vitesseY = -vitesseY;
            } else {
                fin = true;
                affichageScore.innerHTML = 'Perdu ! <br> Clique sur la casse brique pour recommencer.'
            }
        }

        x += vitesseX;
        y += vitesseY;

        requestAnimationFrame(desinne);

    }
}
desinne();




// Recommmencer
canvas.addEventListener('click', () => {

    if (fin === true) {
        fin = false;
        document.location.reload();
    }

})
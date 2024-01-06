// Tableau contenant les icônes des cartes
const icons = ['♠', '♣', '♥', '♦', '♫', '☼', '★', '✿'];
    
// Dupliquer les icônes pour avoir les huit paires
const allIcons = icons.concat(icons);

// Mélange des cartes
allIcons.sort(() => Math.random() - 0.5);

// Tableau pour stocker les cartes retournées
let cartesRetournees = [];

// Tableau pour stocker les cartes similaires
let cartesSimilaires = [];

// Fonction pour retourner une carte
function retournerCarte() {
    // Vérifier si la carte a déjà été retournée ou si on a déjà deux cartes retournées
    if (this.innerHTML !== '' || cartesRetournees.length === 2) {
        return;
    }

    // Afficher le contenu de la carte cliquée
    this.innerHTML = allIcons[this.id];

    // Ajouter la carte au tableau des cartes retournées
    cartesRetournees.push(this.id);

    // Vérifier si deux cartes ont été retournées
    if (cartesRetournees.length === 2) {
        // Désactiver les clics pendant la vérification
        plateauJeu.removeEventListener('click', retournerCarte);

        // Appeler la fonction de test de similarité après un court délai
        setTimeout(testSimilarite, 500);
    }
}

// Fonction pour tester la similarité des cartes
function testSimilarite() {
    // Récupérer les éléments des cartes retournées
    const carte1 = document.getElementById(cartesRetournees[0]);
    const carte2 = document.getElementById(cartesRetournees[1]);

    // Vérifier si les cartes sont similaires
    if (allIcons[cartesRetournees[0]] === allIcons[cartesRetournees[1]]) {
        // Ajouter les cartes au tableau des cartes similaires
        cartesSimilaires.push(cartesRetournees[0], cartesRetournees[1]);

        // Réinitialiser le tableau des cartes retournées
        cartesRetournees = [];

        // Vérifier si toutes les paires de cartes ont été trouvées
        if (cartesSimilaires.length === allIcons.length) {
        // Afficher l'alerte SweetAlert de victoire
        Swal.fire({
            title: 'Bravo!',
            text: 'Vous avez trouvé toutes les paires!',
            icon: 'success',
            confirmButtonText: 'Rejouer'
        }).then((result) => {
            // Recharger la page pour rejouer
            if (result.isConfirmed) {
            location.reload();
            }
        });
        }
    } else {
        // Retourner les cartes faces cachées après un court délai
        setTimeout(() => {
        carte1.innerHTML = '';
        carte2.innerHTML = '';
        cartesRetournees = [];
        }, 500);
    }

    // Réactiver les clics après la vérification
    plateauJeu.addEventListener('click', retournerCarte);
}

// Récupérer l'élément du plateau de jeu
const plateauJeu = document.getElementById('plateau-jeu');

// Ajouter les cartes au plateau de jeu
for (let i = 0; i < allIcons.length; i++) {
    const carte = document.createElement('div');
    carte.className = 'card col-2'; // Utiliser la classe Bootstrap pour créer 4 colonnes
    carte.id = i;
    plateauJeu.appendChild(carte);

    // Ajouter un événement de clic à chaque carte
    carte.addEventListener('click', retournerCarte);
}
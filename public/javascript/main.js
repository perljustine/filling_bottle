// Récupérer les élements dans le html
const buttonsContainer = document.querySelector(".buttons-container")
const statusElement = document.getElementById("status")
const emptyButton = document.getElementById("emptyButton")
const fillLevelElement = document.getElementById("fillLevel")

// Capacité totale de la bouteille et son niveau de base 
const BOTTLE_CAPACITY = 1750
let currentVolume = 0

// Pour génerer les "boutons" des bouteilles de 250ml
const numButtons = Math.ceil(BOTTLE_CAPACITY / 250) // formule pour génerer les "boutons" des bouteilles grâce au math ceil , qui sert à arrondir au nombr entier prêt en cas de nombre décimal pour la division des boutons
for (let i = 0; i < numButtons; i++) { // on part de zéro dans l'index et on va jusqu'au dernier bouton donc 1750ML divisé par 250ML 
  const button = document.createElement("button")  // on crée l'élément bouton qu'on va mettre dans la div buttonsContainers grâce au append.Child
  button.textContent = `${(i + 1) * 250}ML` // on écrit à chaqu fois l'index + 1 de 250ml 
  button.dataset.value = (i + 1) * 250 // on gère la valeur data dans l'html d chaque bouton
  button.classList.add("fillButton") 
  buttonsContainer.appendChild(button)
}

// fonction pour augmenter le nivau de la bouteille visuellement
function updateFillLevel() {
  const fillPercentage = (currentVolume / BOTTLE_CAPACITY) * 100 // on crée un constante pour remplir la barre de la bouteille en "pourcentage" grâce à cette fonction 
  fillLevelElement.style.height = `${fillPercentage}%` // cela permet d'augmenter visuellement le niveau de la bouteille grâce au résultat de la const 
}

// fonction pour que le "pourcentage" de la bouteille soit indiqué dans le script js
// si est égal à sa première place dans l'index qui est zéro est vide si il est à sa dernière place est rempli sinon on affiche le "pourcentage"
function updateStatus() {
  if (currentVolume === 0) {
    statusElement.textContent = "Bottle is empty."
  } else if (currentVolume === BOTTLE_CAPACITY) {
    statusElement.textContent = "Bottle is full!"
  } else {
    statusElement.textContent = `${currentVolume}ML`
  }
  updateFillLevel()
}

// fonction pour remplir la bouteille 
function fillBottle(event) { // "l'évenement" estla constante qui rempli la bouteille 
  const buttonValue = Number.parseInt(event.target.dataset.value, 10) // cette constante va servir à target le dataset.value qu'on a mis sur la valeur des boutons dans l'index
  currentVolume = Math.min(buttonValue, BOTTLE_CAPACITY) // et donc la valeur de currentvolume sera égale à la valeur du bouton value 
  updateStatus() // une fois la valeur du bouton cliqué connue on peut augmenter la valeut du statut 
}

// fonction pour vider la bouteille
function emptyBottle() {
  currentVolume = 0
  updateStatus()
}

// Event listeners
buttonsContainer.addEventListener("click", (event) => { // donc quand on clique sur un des boutons généré par la boucle on provoque la fonction fill bottle(event)
  if (event.target.classList.contains("fillButton")) { // à condition qu'il y'ai la class fillButton sur le bouton cliqué 
    fillBottle(event)
  }
})

emptyButton.addEventListener("click", emptyBottle) // sinon il y' a la fonction empty bottle 


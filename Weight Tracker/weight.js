//assigning variables
let weightbtn = document.getElementById('weightButton')
let caloriesbtn = document.getElementById('caloriesButton')
let submitbtn = document.getElementById("Submit")
let gainradio = document.getElementById('gainradio')
let lossradio = document.getElementById('lossradio')
let firstCard = document.getElementById('welcomeCard')
let thirdCard = document.getElementById('card')
let secondCard = document.getElementById('goalsetcard')
let fourthCard = document.getElementById('statcard')
let startinginput = document.getElementById('startinginput')
let goalsetbtn = document.getElementById('goalsetbtn')
let progress = document.getElementById('progress')
let counter = 0

//arrays for storing weight and kcal
let weightArray = []
let caloriesArray = []

let startingWeight = []
let goalWeight = []

let goalinputValue;

//dynamically hide the cards
thirdCard.classList.add('hidden')
secondCard.classList.add('hidden')
fourthCard.classList.add('hidden')


//button function for first card
function goal(){
    if(gainradio.checked || lossradio.checked) {
        firstCard.classList.add('hidden')
        secondCard.classList.remove('hidden')
    }
}

//button function for second card

function setGoal(){

    // Convert the values to numbers
    let startinginputValue = parseFloat(startinginput.value);
    goalinputValue = parseFloat(goalinput.value)

    // Check if the input is a number and less than 200 but more than 40
    if(typeof startinginputValue === 'number' && startinginputValue < 200 && startinginputValue > 40 && startinginputValue !== goalinputValue){
        startinginput.classList.add('hidden')
    } else {
        startinginput.classList.add('shake')
        startinginput.classList.add('invalid')
        setTimeout(() => {
            startinginput.classList.remove('shake')
        }, 500);
    }

    if(typeof goalinputValue === 'number' && goalinputValue < 200 && goalinputValue > 40 && startinginputValue !== goalinputValue){
        goalinput.classList.add('hidden')
    } else {
        goalinput.classList.add('shake')
        goalinput.classList.add('invalid')
        setTimeout(() => {
            goalinput.classList.remove('shake')
        }, 500);
}
    //if both are valid inputs continue to next card and store the inputs
    if(goalinput.classList.contains('hidden') && startinginput.classList.contains('hidden')) {
        goalWeight.shift;
        startingWeight.shift;
        goalWeight.push(goalinputValue);
        startingWeight.push(startinginputValue)
        secondCard.classList.add('hidden')
        thirdCard.classList.remove('hidden')
}
}

//button function for third card
function submit(){

    // Convert the values to numbers
    let weightValue = parseFloat(weightbtn.value);
    let caloriesValue = parseFloat(caloriesbtn.value);

    // Check if the input is a number and less than 200
    if(typeof weightValue === 'number' && weightValue < 200){
        weightArray.push(weightValue)
        weightbtn.classList.add('hidden')
} else {
    weightbtn.classList.add('shake')
    weightbtn.classList.add('invalid')
    setTimeout(() => {
        weightbtn.classList.remove('shake')
    }, 500);
}

    // Check if the calories are a number and more than 200
    if(typeof caloriesValue === 'number' && caloriesValue > 200){
        caloriesArray.push(caloriesValue)
        caloriesbtn.classList.add('hidden')
} else {
    caloriesbtn.classList.add('shake')
    caloriesbtn.classList.add('invalid')
    setTimeout(() => {
        caloriesbtn.classList.remove('shake')
    }, 500);
}

    //if both are valid inputs continue to next card
    if(caloriesbtn.classList.contains('hidden') && weightbtn.classList.contains('hidden')) {
        thirdCard.classList.add('hidden')
        fourthCard.classList.remove('hidden')
    }
}

//Progress Bar Counter function
setInterval(() => {
    if(counter === 65){
        clearInterval()
    } else {
    counter += 1;
    progress.innerHTML = counter + '%'
}},30.77)

//Progress card goal weight display
document.getElementById("goalweightdisplay").innerHTML = goalinputValue;


//Events
gainradio.addEventListener('click', goal)
lossradio.addEventListener('click', goal)
submitbtn.addEventListener("click", submit);
goalsetbtn.addEventListener('click', setGoal)

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
let circle = document.getElementById('circle')
let progressanim = document.getElementsByClassName('progressanimation')[0]

//arrays for storing weight and kcal
let weightArray = []
let caloriesArray = []

let positivecaloriesArray = []
let negativecaloriesArray = []

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
        secondCard.classList.add('visible')
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
        secondCard.classList.remove('visible')
        thirdCard.classList.remove('hidden')
        thirdCard.classList.add('visible')
        document.getElementById("goalweightdisplay").innerHTML = 'Goal Weight: <span class="highlightstartkgnumber">' + goalinputValue + ' kg</span>';
        document.getElementById("startweightdisplay").innerHTML = 'Starting Weight: <span class="highlightgoalkgnumber">' + startinginputValue + ' kg</span>';
    }
}

//button function for third card
let weightInterval;

function submit(){

    // Convert the values to numbers
    let weightValue = parseFloat(weightbtn.value);
    let caloriesValue = parseFloat(caloriesbtn.value);

    // Check if the input is a number and less than 200
    if(typeof weightValue === 'number' && weightValue < 200 && weightValue > 40){
        document.getElementById("currentWeight").innerHTML = 'Todays Weight: <span class="highlightcurrentkgnumber">' + weightValue + ' kg</span>';
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
    if(typeof caloriesValue === 'number' && caloriesValue > 200 && caloriesValue < 4000){
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
        thirdCard.classList.remove('visible')
        fourthCard.classList.remove('hidden')
        fourthCard.classList.add('visible')
        circle.classList.add('progressanimation')

        //Calculating the average of weightarray to calculate the weight progress in kg
        let sum = 0;
        for (let i = 0; i < weightArray.length; i++){
            if(typeof weightArray[i] === 'number'){
                sum += weightArray[i]
            }
        }
        let weightArrayAverage = sum / weightArray.length;
        
        let weightArrayAverageLastThree = (weightArray[weightArray.length - 1] + weightArray[weightArray.length - 2] + weightArray[weightArray.length - 3]) / 3;

        let weightprogress;

        if(weightArray.length > 3){
            weightprogress = Math.abs(startingWeight[0] - weightArrayAverageLastThree);
        }
        else {
            weightprogress = Math.abs(startingWeight[0] - weightArrayAverage);
        }

        //Progress Bar Counter function
        let weightInterval = setInterval(() => {
        if (Math.abs(counter - weightprogress) < 0.1) {            
            clearInterval(weightInterval)
        } else if (goalWeight[0] > startingWeight[0]) {
            counter += 0.1;
            progress.innerHTML = '+' + counter.toFixed(1) + 'kg'
            if(counter > weightprogress) {
                clearInterval(weightInterval);
            }
        } else if (Math.abs(startingWeight[0] - weightValue) < 0.001){
            progress.innerHTML = '0 kg'
            clearInterval(weightInterval); // Stop the interval when there's no progress
        } else {
            counter += 0.1;
            progress.innerHTML = '-' + counter.toFixed(1) + 'kg'
        }
    },80)

        //Calculating the caloric Limit
        if(weightArray.length > 3) {
            if(weightArray[weightArray.length - 1] > weightArray[weightArray.length - 2]) {
                positivecaloriesArray.push(caloriesArray[caloriesArray.length -1])
            } 
            else if (weightArray[weightArray.length - 1] < weightArray[weightArray.length - 2]){
                negativecaloriesArray.push(caloriesArray[caloriesArray.length -1])
            }

            // Calculate average positive and negative calories
            let positivekcalavg = positivecaloriesArray.reduce((acc, val) => acc + val, 0) / positivecaloriesArray.length;
            let negativekcalavg = negativecaloriesArray.reduce((acc, val) => acc + val, 0) / negativecaloriesArray.length;
            let kcallimit =  (negativekcalavg + positivekcalavg) / 2
            
            if(!isNaN(kcallimit)) {
                document.getElementById('maintenancecalories').innerHTML = 'Caloric Limit: <span class="highlightkcallimitnumber">' + Math.round(kcallimit) + ' kcal</span>'
                document.getElementById('limitkcalpopupbtn').classList.add('hiddenonlyopacity');
            }
        } else {
            document.getElementById('maintenancecalories').innerHTML = 'Caloric Limit: <span class="highlightkcallimitnumber"> NA </span>'
        }

        //Calculating the Progress Bar
        let a = Math.abs(goalWeight[0] - startingWeight[0])
        let b = weightprogress / a
        let c = 505 * b

        if((505 - c) > 36){        
            let progressbarprogress = 505 - c
        
            // Changing the value of Keyframes progressanim to display right progressbar progress
            let styleSheet = document.styleSheets[0];
            let progressKeyframesRule = null;

            for (let rule of styleSheet.cssRules) {
                if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === 'progressanim') {
                    progressKeyframesRule = rule;
                    break;
                }
            }
            if (progressKeyframesRule) {
                for (let keyframe of progressKeyframesRule.cssRules) {
                    if (keyframe.keyText === '100%') {
                        keyframe.style.strokeDashoffset = progressbarprogress;
                        break;
                    }
                }
            }
        } else {

            //if goal already reached progressbar stays full
            let progressbarprogress = 36
            let styleSheet = document.styleSheets[0];
            let progressKeyframesRule = null;
 
            for (let rule of styleSheet.cssRules) {
                if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === 'progressanim') {
                    progressKeyframesRule = rule;
                    break;
                }
            }
            if (progressKeyframesRule) {
                for (let keyframe of progressKeyframesRule.cssRules) {
                    if (keyframe.keyText === '100%') {
                        keyframe.style.strokeDashoffset = progressbarprogress;
                        break;
                        }
                    }
                }
            }
        }        
    }


function weighinagain() {
    fourthCard.classList.add('hidden')
    thirdCard.classList.remove('hidden')
    caloriesbtn.classList.remove('hidden')
    weightbtn.classList.remove('hidden')
    caloriesbtn.value = ""
    weightbtn.value = ""
    circle.classList.remove('progressanimation')
}

// Function to show popup text
function popupbtntext() {
    document.getElementById('popupquestionmarktext').classList.add('popupquestionmarkclicked')
}

// Function to hide popup text
function hidePopupText() {
    document.getElementById('popupquestionmarktext').classList.remove('popupquestionmarkclicked')
}

document.addEventListener('click', function(event) {
    let isClickInsidePopupBtn = document.getElementById('limitkcalpopupbtn').contains(event.target);
    let isClickInsidePopupText = document.getElementById('popupquestionmarktext').contains(event.target);
    if (!isClickInsidePopupBtn && !isClickInsidePopupText) {
        hidePopupText();
    }
});

// Goal & Current Weight change function
function Goalchange() {
    secondCard.classList.remove('hidden')
    fourthCard.classList.add('hidden')
    startinginput.classList.remove('hidden')
    goalinput.classList.remove('hidden')
}



//Events
gainradio.addEventListener('click', goal);
lossradio.addEventListener('click', goal);
submitbtn.addEventListener("click", submit);
goalsetbtn.addEventListener('click', setGoal);
document.getElementById('limitkcalpopupbtn').addEventListener('click', popupbtntext)
document.getElementById('pencil').addEventListener('click', Goalchange)
document.getElementById('weighinbtn').addEventListener('click', weighinagain)
document.getElementById('weighinbtn').addEventListener('mouseover', function() {
document.getElementById('progress').style.opacity = '0';
});
document.getElementById('weighinbtn').addEventListener('mouseout', function() {
document.getElementById('progress').style.opacity = '1';
});

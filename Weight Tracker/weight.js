//assigning variables
let weightbtn = document.getElementById('weightButton')
let caloriesbtn = document.getElementById('caloriesButton')
let submitbtn = document.getElementById("Submit")

//arrays for storing weight and kcal
let weightArray = []
let caloriesArray = []

//submit button function
function submit(){
    // Convert the values to numbers
    let weightValue = parseFloat(weightbtn.value);
    let caloriesValue = parseFloat(caloriesbtn.value);

    // Check if the weight is a number and less than 200
    if(typeof weightValue === 'number' && weightValue < 200){
        weightArray.push(weightValue)
} else {
    //insert shake animation------------
    alert('Please enter your correct Weight')
}
    // Check if the calories are a number and more than 200
    if(typeof caloriesValue === 'number' && caloriesValue > 200){
        caloriesArray.push(caloriesValue)
} else {
    //insert shake animation------------
    alert('Please enter your correct calorie count')
}
}

submitbtn.addEventListener("click", submit);

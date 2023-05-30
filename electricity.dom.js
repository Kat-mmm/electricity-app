// DOM element(s) references
const topUpAmountRadBtns = document.querySelectorAll('.topup');
const unitsAvailableEl = document.querySelector('.unitsAvailable');
const totalUnitsEl = document.querySelector('.totalUnits');
const totalAmountEl = document.querySelector('.totalAmount');
const advanceTakenEl = document.querySelector('.advanceTaken');
const applianceRadBtns = document.querySelectorAll('.usage');
const topUpBtn = document.querySelector('.topupNow');
const useBtn = document.querySelector('.useNow');

// Factory Function instance 
const electricity = Electricity();

//loop through all the radio buttons for the top up amount
//use a event listener for the changes and get the checked button
//assign the value of the checked button to the the checkedAmount variable
let checkedAmount = 0;
topUpAmountRadBtns.forEach(btn =>{
    btn.addEventListener('change', ()=>{
        if(btn.checked){
            if(btn.value === 'advance'){
                checkedAmount = 30;
            }
            else{
                checkedAmount = parseInt(btn.value);
            }
            return;
        }
    })
})


//loop through all the appliances radio buttions
//use an event listener to listen for changes and check the checked button
//assign the value of the checked button to the checkedAppliance variable
let checkedAppliance = '';
applianceRadBtns.forEach(btn =>{
    btn.addEventListener('change', ()=>{
        if(btn.checked){
            checkedAppliance = btn.value;
        }
        return;
    })
})

//retrieve all the values from local stoarge or just get 0
let unitsAvailable = parseInt(localStorage.getItem('unitsAvailable')) || 0;
let boughtUnits = parseInt(localStorage.getItem('boughtUnits')) || 0;
let totalAmountSpent = parseInt(localStorage.getItem('totalAmountSpent')) || 0;
let advanceTaken = localStorage.getItem('advanceTaken') === 'true';
let oustandingAmout = parseInt(localStorage.getItem('oustandingAmout')) || 0;

//update the values upon refresh from localStorage
unitsAvailableEl.innerHTML = unitsAvailable;
totalUnitsEl.innerHTML = boughtUnits;
totalAmountEl.innerHTML = totalAmountSpent;


//use this function to update the values in the middle screen
//have the units and amount parameters
//if there is an adavance hadndle the amout changes or oustanding advance payemnts
//if there is no advance update the middle screen values with the parameters and set all the values to local storage
function updateMiddleScreen(units, amount){
    if(advanceTaken === true){
        oustandingAmout -= amount;
        
        if(oustandingAmout <= 0){
            advanceTaken = false;
        }
        if(amount === 50){
            oustandingAmout += 20;
            unitsAvailable += 14;
            boughtUnits += 14;
            totalAmountSpent += 20;
            unitsAvailableEl.innerHTML = unitsAvailable;
            totalUnitsEl.innerHTML = boughtUnits;
            totalAmountEl.innerHTML = totalAmountSpent;
        }
        else if(amount === 20 && oustandingAmout <= 0){
            oustandingAmout += 10;
            unitsAvailable += 7;
            boughtUnits += 7;
            totalAmountSpent += 10;
            unitsAvailableEl.innerHTML = unitsAvailable;
            totalUnitsEl.innerHTML = boughtUnits;
            totalAmountEl.innerHTML = totalAmountSpent;
        }
        alert('Thank you for paying your outstanding advance');
    }
    else{
        unitsAvailable += units;
        boughtUnits += units;
        totalAmountSpent += amount;
        unitsAvailableEl.innerHTML = unitsAvailable;
        totalUnitsEl.innerHTML = boughtUnits;
        totalAmountEl.innerHTML = totalAmountSpent;
    }

    localStorage.setItem('unitsAvailable', unitsAvailable.toString());
    localStorage.setItem('boughtUnits', boughtUnits.toString());
    localStorage.setItem('totalAmountSpent', totalAmountSpent.toString());
    localStorage.setItem('advanceTaken', advanceTaken.toString());
    localStorage.setItem('oustandingAmout', oustandingAmout.toString());
}


//use this function to top up values according to the checked amount
//for different amounts use the above function to update amounts and screen values
function topUp(){
    switch(checkedAmount){
        case 10:
            updateMiddleScreen(7, 10);
            break;
        case 20:
            updateMiddleScreen(14, 20);
            break;
        case 40:
            updateMiddleScreen(28, 40);
            break;
        case 50:
            updateMiddleScreen(35, 50);
            break;
        case 30:
            if(advanceTaken === false){
                oustandingAmout += 30;
                updateMiddleScreen(21, 30);
                advanceTaken = true;
            }
            break;
    }

    if(advanceTaken === true){
        advanceTakenEl.className = 'show';
    }
    else{
        advanceTakenEl.className = 'hidden';
    }

    localStorage.setItem('unitsAvailable', unitsAvailable.toString());
    localStorage.setItem('boughtUnits', boughtUnits.toString());
    localStorage.setItem('totalAmountSpent', totalAmountSpent.toString());
    localStorage.setItem('advanceTaken', advanceTaken.toString());
    localStorage.setItem('oustandingAmout', oustandingAmout.toString());
}

//have a mappinng of how much eletricity units each appliance consumes
let appliancesUsage = {
    Stove: 10, 
    Kettle: 5, 
    TV: 3, 
    Fridge: 13
};

//use this function to use eletricity units according to the selected appliance
//upadte the screen values and local stoarge values
function useEletricity(){
    if(checkedAppliance === 'stove' && unitsAvailable > appliancesUsage.Stove){
        unitsAvailable -= 10;
        unitsAvailableEl.innerHTML = unitsAvailable;
    }
    else if(checkedAppliance === 'TV' && unitsAvailable > appliancesUsage.TV){
        unitsAvailable -= 3;
        unitsAvailableEl.innerHTML = unitsAvailable;
    }
    else if(checkedAppliance === 'Fridge' && unitsAvailable > appliancesUsage.Fridge){
        unitsAvailable -= 13;
        unitsAvailableEl.innerHTML = unitsAvailable;
    }
    else if(checkedAppliance === 'Kettle' && unitsAvailable > appliancesUsage.Kettle){
        unitsAvailable -= 5;
        unitsAvailableEl.innerHTML = unitsAvailable;
    }
    localStorage.setItem('unitsAvailable', unitsAvailable.toString());
}


// DOM events here 
topUpBtn.addEventListener('click', topUp);
useBtn.addEventListener('click', useEletricity);
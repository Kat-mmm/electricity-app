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
// const electricity =  Electricity();

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

let checkedAppliance = '';
applianceRadBtns.forEach(btn =>{
    btn.addEventListener('change', ()=>{
        if(btn.checked){
            checkedAppliance = btn.value;
        }
        return;
    })
})

let unitsAvailable = parseInt(localStorage.getItem('unitsAvailable')) || 0;
let boughtUnits = parseInt(localStorage.getItem('boughtUnits')) || 0;
let totalAmountSpent = parseInt(localStorage.getItem('totalAmountSpent')) || 0;
let advanceTaken = localStorage.getItem('advanceTaken') === 'true';
let oustandingAmout = parseInt(localStorage.getItem('oustandingAmout')) || 0;

unitsAvailableEl.innerHTML = unitsAvailable;
totalUnitsEl.innerHTML = boughtUnits;
totalAmountEl.innerHTML = totalAmountSpent;

function updateMiddleScreen(units, amount){
    if(advanceTaken === true){
        oustandingAmout -= amount;
        
        if(oustandingAmout <= 0){
            advanceTaken = false;
        }
        if(amount === 50){
            unitsAvailable += 14;
            boughtUnits += 14;
            totalAmountSpent += 20;
            unitsAvailableEl.innerHTML = unitsAvailable;
            totalUnitsEl.innerHTML = boughtUnits;
            totalAmountEl.innerHTML = totalAmountSpent;
        }
        else if(amount === 20 && oustandingAmout <= 0){
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


let appliancesUsage = {
    Stove: 10, 
    Kettle: 5, 
    TV: 3, 
    Fridge: 13
};

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
function Electricity() {
    let unitsAvailable = 0;
    let amountSpent = 0;
    let unitsBought = 0;
    let hasTakenAdvance = false;
    let oustandingAmout = 0;
    // do we want to go with this or array? 
    let appliances = {
        'Stove': 10, 
        'Kettle': 5, 
        'TV': 3, 
        'Fridge': 13
    };

    function updateAmounts(units, amount){
        if(hasTakenAdvance === true){
            oustandingAmout -= amount;
            
            if(oustandingAmout <= 0){
                hasTakenAdvance = false;
            }
            if(amount === 50){
                oustandingAmout += 20;
                unitsAvailable += 14;
                unitsBought += 14;
                amountSpent += 20;
            }
            else if(amount === 20 && oustandingAmout <= 0){
                oustandingAmout += 10;
                unitsAvailable += 7;
                unitsBought += 7;
                amountSpent += 10;
            }
        }
        else{
            unitsAvailable += units;
            unitsBought += units;
            amountSpent += amount;
        }

    }

    function topUpElectricity(amount) {
        if(amount === 0){
            unitsAvailable = 0;
        }
        else if(amount === 10){
            updateAmounts(7, 10);
        }
        else if(amount === 20){
            updateAmounts(14, 20);
        }
        else if(amount === 50){
            updateAmounts(35, 50)
        }
        else if(amount === 'advance' || amount === 30){
            if(hasTakenAdvance === false){
                oustandingAmout += 30;
                updateAmounts(21, 30);
                hasTakenAdvance = true;
            }
        }
    }

    function getUnitsAvailable() {
         return unitsAvailable;
    }

    /*
    * return true and substract from unit available if there is enough units to use the appliance
    * other wise return false and do nothing.
    */
    function useAppliance(appliance) {
        if(appliance === 'Stove' && unitsAvailable > appliances.Stove){
            unitsAvailable -= 10;
            return true;
        }
        else if(appliance === 'TV' && unitsAvailable > appliances.TV){
            unitsAvailable -= 3;
            return true;
        }
        else if(appliance === 'Fridge' && unitsAvailable > appliances.Fridge){
            unitsAvailable -= 13;
            return true;
        }
        else if(appliance === 'Kettle' && unitsAvailable > appliances.Kettle){
            unitsAvailable -= 5;
            return true;
        }
        else{
            return false;
        }
    }

    function advanceTaken() {
        return hasTakenAdvance;
    }

    function totalAmountSpent() {
        return amountSpent;
    }

    function totalUnitsBought(){
        return unitsBought;
    }

    return {
        advanceTaken,
        topUpElectricity,
        getUnitsAvailable,
        useAppliance,
        totalAmountSpent,
        totalUnitsBought

    }
}
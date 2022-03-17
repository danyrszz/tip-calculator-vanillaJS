export default class Calculator {
    constructor(){}
    getTipAmount(bill, tip, totalPeople){
        return ((bill*(tip/100)).toFixed(2)/totalPeople).toFixed(2);
    }
    getTotal(bill, tip, totalPeople){
        return (((bill*(tip/100))+bill)/totalPeople).toFixed(2);
    }
}
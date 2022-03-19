import Calculator from './calculator.js';

//elements with user interaction
let bill = document.getElementById("bill");
let totalPeople = document.getElementById("totalpeople");
const tipGroup = document.getElementById("tip-selector");
let customTip = document.getElementById("customtip")
const reset = document.getElementById("reset")

const tipArray = document.querySelectorAll(".tip")
const warning = document.querySelector(".warning");
const tipAmount = document.getElementById("tip-amount");
const total = document.getElementById("total");
let tipSelected = document.querySelector(".selected").dataset.value;

bill.addEventListener("input",setBill);
totalPeople.addEventListener("input",setTotalPeople);
tipGroup.addEventListener("click",setTip);
customTip.addEventListener("input",setCustomTip);
reset.addEventListener("click", clear);

const calculator = new Calculator();
const calculate = function(){
    tipAmount.textContent = "$" + calculator.getTipAmount(bill.value,tipSelected,totalPeople.value);
    total.textContent = "$"+ calculator.getTotal(bill.value,tipSelected,totalPeople.value);
}

function setTotalPeople(e){
    warning.classList.add("hidden");
    totalPeople.classList.remove("input-alert");
    let value = parseInt (e.target.value);
    if(validate(value, e.target)){
        calculate();
    }
}

function setBill(e){
    warning.classList.add("hidden");
    bill.classList.remove("input-alert");
    let value = parseFloat (e.target.value);
    if(validate(value, e.target) && totalPeople.value!=""){
        calculate();
    }
}

function setTip(e){
    for(let i=0; i<tipArray.length; i++){
        tipArray[i].classList.remove("selected");
    }
    if(e.target.nodeName === "DIV"){
        //get tip
        e.target.classList.add("selected");
        tipSelected = e.target.dataset.value;
        if(bill.value==="" || totalPeople.value===""){
            return;
        }
        calculate();
    }
    else if(e.target.nodeName === "INPUT"){
        e.target.classList.add("selected");
        setCustomTip(e);
    }
}

function setCustomTip(e){
    tipSelected = e.target.value;
    if(isNaN(e.target.value)){
        return;
    }
    if(bill.value==="" || totalPeople.value===""){
        return;
    }
    calculate();
}

function validate(value, target){
    if(isNaN(value)){
        total.textContent = "$0.00";
        tipAmount.textContent = "$0.00";
        return false;
    } 
    if(value === 0){
        total.textContent = "$0.00";
        tipAmount.textContent = "$0.00";
        target.classList.add("input-alert");
        warning.classList.remove("hidden");
        return false;
    }
    return true;
}

function clear(){
    total.textContent = "$0.00";
    tipAmount.textContent = "$0.00";
    bill.value = "";
    totalPeople.value = "";
    customTip.value = "";
    tipSelected = 10;
    for(let i=0; i<tipArray.length; i++){
        tipArray[i].classList.remove("selected");
    }
    tipArray[1].classList.add("selected");
}
//calc

let persons = document.querySelectorAll('.counter-block-input')[0],
restDays = document.querySelectorAll('.counter-block-input')[1],
place = document.getElementById('select'),
totalValue = document.getElementById('total'),
personSum = 0,
daysSum = 0,
total = 0;

totalValue.innerHTML = 0;

persons.addEventListener('change', function() {
    personSum =+ this.value;
    total = (daysSum + personSum)*3000;

    if(restDays.value == '' || this.value == '') {
        totalValue.innerHTML = 0;                
    } else {
        totalValue.innerHTML = total;
    }
});

restDays.addEventListener('change', function() {
    daysSum =+ this.value;
    total = (daysSum + personSum)*3000;

    if(persons.value == '' || this.value == ''){
        totalValue.innerHTML = 0;                
    } else {
        totalValue.innerHTML = total;
    }
});

place.addEventListener('change', function() {
    if(restDays.value == '' || persons.value == '') {
        totalValue.innerHTML = 0;                
    } else {
        let a = total;
        totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
});
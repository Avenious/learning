let money, time;

function start(){
    money = +prompt("Ваш бюджет на месяц:","");
    time = prompt("Введите дату в формате YYYY-MM-DD", "");

    while(isNaN(money) || money =="" || money == null){
        money = +prompt("Ваш бюджет на месяц:","");
    }
}

start();



let appData = {
    moneyData: money,
    timeData: time,
    expanses:{},
    optionalExpenses:{},
    income: [],
    savings: true,
    chooseExpenses: function() {
        for (let i = 0; i < 2; i++){
            let a = prompt("Введите статью расходов", "");
            let b = prompt("Во сколько это обойдется", "");
    
            if ( (typeof(a))==='string' && (typeof(a)) != null && (typeof(b)) != null
                && a != '' && b != '' && a.length < 50 ) {
                console.log("done");
                appData.expanses[a] = b;
        } else{
            i = i - 1;
        }
        }
    },
    detectDayBudget: function() {
        appData.moneyPerDay = (appData.moneyData / 30).toFixed();
        alert ("Ежедневный бюджет: " + appData.moneyPerDay);

    },
    detectLevel: function() {
        if (appData.moneyPerDay < 100) {
            console.log("Min");
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log("avg");
        } else if (appData.moneyPerDay > 2000) {
            console.log("hi");
        } else {
            console.log("error");
        }
    },
    checkSavings: function() {
        if (appData.savings == true) {
            let save = +prompt("Какова сумма накоплений?"),
                precent = +prompt("Под какой процент?");
    
            appData.monthIncome = save/100/12*precent;
            alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
        }
    },
    chooseOptExpanses: function() {
        for(let i = 1; i < 3; i++) {
            let opt = prompt("Ведите статью расходов ", "");
            appData.optionalExpenses[i] = opt;          
       }    
    },
    chooseIncome: function() {
        for(let i=0; i<1; i++) {
            let items = prompt('Что принесёт дополнительный доход? (Перечислите через запятую)', '');

            if ( (typeof(items))==='string' && (typeof(items)) != null && items != '' 
            && items.length < 50 ) {
                    console.log("done");
                    appData.income = items.split(', ');
                    appData.income.push(prompt('Может что то еще?'));
                    appData.income.sort();
            }
            else{
                alert('Введите статью доходов!');
                i--;                    
            }
            appData.income.forEach(function(item, i) {
                alert (++i + ': ' + item);
            });
        }
       
        
       
    }
};

for(let key in appData) {
    console.log('Свойство ' + key + ' имеет значение ' + appData[key]);
}
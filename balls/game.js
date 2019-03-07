const canvas = document.getElementById("canvas"); //получение элемента canvas
const ctx = canvas.getContext("2d"); //режим рисования

const maxX = 1200; //ширина поля
const maxY = 600; //высота поля
const minR = 10; //минимальный радиус шара
const maxR = 70; // максимальный радиус шара
 
// генерация случайных чисел
const rand = function (min, max) {
    return Math.random() * (max - min) + min;
}

// пауза
let paused = false;
const pause = function (event) {
    if (event.key === " ") {
        paused = !paused;
    }
}
document.addEventListener("keydown", pause); 

// генерация цвета в hex
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class Circle {
    //создание объекта шар
    constructor() {
        this.radius = rand(minR, maxR); //генерация размера шара шара
        this.x = rand(0, maxX); //генерация коордиат для размещения
        this.y = rand(0, maxY);
        this.vectorX = rand(0, 5);
        this.vectorY = rand(0, 5);
        this.color = getRandomColor(); //вызов функции генерации цвета
        this.score = maxR - this.radius;  //количество очков за шар
        this.clicked = false;
    }
    //движение шаров
    move() {
        this.x += this.vectorX;
        if (this.x > maxX) {
            this.x -= maxX;
        }
        if (this.x < 0) {
            this.x += maxX;
        }
        this.y += this.vectorY;
        if (this.y > maxY) {
            this.y -= maxY;
        }
        if (this.y < 0) {
            this.y += maxY;
        }
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    isClicked(x, y) {
        return x > this.x - this.radius
            && x < this.x + this.radius
            && y > this.y - this.radius
            && y < this.y + this.radius;
    }
}

const circles = []; //массив шаров
for (let i = 0; i < 20; i++) {
    circles.push(new Circle());
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Circle} circle
 */
const placeCircle = function (ctx, circle) {
    ctx.fillStyle = circle.color; // из класса circle получаем значение цвета
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI); //создание окружности из данных в классе Circle
    ctx.fill(); 
}

let clickEvent = null;
function click(event) {
    if (paused) {
        return;
    }
    clickEvent = event;
}

let score = 0;
let gameFinished = false;
const name = prompt('Enter name'); 

function draw() {
    //проверка паузы
    if (paused) {
        requestAnimationFrame(draw);
        return;
    }
    //проверка завершена ли игра
    if (gameFinished) {
        document.location = 'top.php?score=' + score + '&name=' + name;
        paused = true;
        return;
    }

    ctx.clearRect(0, 0, maxX, maxY); // очистка поля
    let remaining = 0;
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        if (circle === null) {
            continue;
        }

        if (clickEvent !== null) {
            let rect = canvas.getBoundingClientRect();
            let x = clickEvent.clientX - rect.left;
            let y = clickEvent.clientY - rect.top;
            if (!circle.clicked && circle.isClicked(x, y)) {
                score += circle.score;
                circle.clicked = true;
                clickEvent = null;
                continue;
            }
        }

        if (!circle.clicked) {
            placeCircle(ctx, circle);// вызов функции размещения шаров
            circle.move() // вызов функции движения шаров
            remaining++;
        }
    }
    //завершение игры если не осталось шаоров
    if (remaining === 0) {
        gameFinished = true;
    }
    // текст таймера + очков
    ctx.fillStyle = "#fff";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + parseInt(score) + " time: " + parseInt(timeRemaining) + " circles:  " + parseInt(remaining), 30, 20);

    requestAnimationFrame(draw);
}
// таймер
let timeRemaining = 60;
const int = setInterval(function () {
    if (paused) {
        return;
    }
    timeRemaining -= .100;
    if (timeRemaining <= .0) {
        gameFinished = true;
    }
}, 100);

document.addEventListener("DOMContentLoaded", draw);
canvas.addEventListener('click', click);


let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for(let i = 10; i > 0; i--){
    for(let j = 0; j < 10; j++){
        let cell = document.createElement('div');
        field.appendChild(cell);
        cell.classList.add('cell');
        cell.setAttribute('posX', j);
        cell.setAttribute('posY', i);
    }
}

function createSnake() {
    let posX = Math.round(Math.random() * (10 - 2) + 1);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
}
let coordinates = createSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '" ]'),
    document.querySelector('[posX = "' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '" ]')];

for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');

let apple;
function createApple() {
    function generateApple () {
        let posX = Math.round(Math.random() * (10 - 2) + 1);
        let posY = Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
    }
    let appleCoordinates = generateApple();
    apple = document.querySelector('[posX = "' + appleCoordinates[0] + '"][posY = "' + appleCoordinates[1] + '" ]');

    while (apple.classList.contains('snakeBody')) {
        let appleCoordinates = generateApple();
        apple = document.querySelector('[posX = "' + appleCoordinates[0] + '"][posY = "' + appleCoordinates[1] + '" ]');
    }
    apple.classList.add('apple')
}
createApple();


let direction = 'right'
let steps = false

let input = document.createElement('input');
document.body.appendChild(input);
input.classList.add('input');


let score = 0;
input.value = `Количество очков: ${score}`;

function move () {
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
    snakeBody.pop();

    if (direction === 'right') {
        if (snakeCoordinates[0] < 9) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '" ]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "0"][posY = "' + snakeCoordinates[1] + '" ]'));
        }
    }else if (direction === 'left') {
        if (snakeCoordinates[0] > 0) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '" ]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "9"][posY = "' + snakeCoordinates[1] + '" ]'));
        }
    }else if (direction === 'up') {
        if (snakeCoordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' +snakeCoordinates[0]  + '"][posY = "' + (+snakeCoordinates[1] + 1) + '" ]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' +snakeCoordinates[0] + '"][posY = "1"]'));
        }
    }else if (direction === 'down') {
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' +snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] - 1) + '" ]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' +snakeCoordinates[0]  + '"][posY = "10" ]'));
        }
}
    if (snakeBody[0].getAttribute('posX') === apple.getAttribute('posX') && snakeBody[0].getAttribute('posY') === apple.getAttribute('posY')) {
        apple.classList.remove('apple');
        let k = snakeBody[snakeBody.length - 1].getAttribute('posX');
        let z = snakeBody[snakeBody.length - 1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + k + '"][posY = "' + z + '"]'));
        createApple()
        score++;
        input.value = `Количество очков: ${score}`;

    }

    if (snakeBody[0].classList.contains('snakeBody')) {
        setTimeout(message => {
            let divMessage = document.createElement('div');
            divMessage.classList.add('divMessage');
            document.body.appendChild(divMessage);
            divMessage.innerHTML = `Конец игры! Ваш результат  ${score}`
            let button = document.createElement('button');
            button.classList.add('button');
            divMessage.appendChild(button);
            button.innerHTML = 'Перезапустить игру'
            button.addEventListener('click', (e) => {
                window.location.reload()
            });
        }, 200);

        clearInterval(interval);

       snakeBody[0].style.background = 'url(./img/fail.png) center no-repeat';
       snakeBody[0].style.backgroundSize = 'cover'
    }


    snakeBody[0].classList.add('head');
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
    }
    steps = true;
}
let interval = setInterval(move, 500);

window.addEventListener('keydown', function (e) {
    if (steps === true) {
        if (e.keyCode === 37 && direction!= 'right') {
            direction = 'left';
            steps = false
        } else if (e.keyCode === 38 && direction!= 'down') {
            direction = 'up';
            steps = false
        } else if (e.keyCode === 39 && direction!= 'left') {
            direction = 'right';
            steps = false
        } else if (e.keyCode === 40 && direction!= 'up') {
            direction = 'down';
            steps = false
        }
    }
});





var computer_mark = '';
var users_mark = '';
var game_over = false;


window.onload = function () {
    var trigger = document.getElementById('trig');
    var cages = document.querySelectorAll('.cage');
    var marker = document.querySelector('.field');
    var info = document.querySelector('.info');
    first_turn(cages, trigger);

    marker.addEventListener('click', function () {
        if (game_over === false) {
            var target = event.target;
            if (target.textContent === '') {
                if (target.classList.contains('hidden') === false)
                    trigger.classList.add('hidden');
                target.textContent = users_mark;
                var is_user_win = is_somebody_win(cages, users_mark);
                if (is_user_win.length !== 0) {
                    console.log(is_user_win);
                    game_over = true;
                    is_user_win.forEach(function (element) {
                        cages[element].classList.add('green');
                        info.textContent = 'Вы победили!!!'
                    });
                }
                cage_to_turn_computer = computerTurn(computer_mark, users_mark, cages);
                console.log(cage_to_turn_computer);
                if (cage_to_turn_computer !== 'end') {
                    element_cage_to_turn = document.getElementById(cage_to_turn_computer);
                    element_cage_to_turn.textContent = computer_mark;
                    var is_computer_win = is_somebody_win(cages, computer_mark);
                    if (is_computer_win.length !== 0 && is_user_win.length === 0) {
                        console.log(is_computer_win);
                        game_over = true;
                        is_computer_win.forEach(function (element) {
                            cages[element].classList.add('red');
                            info.textContent = 'Вы проиграли('
                        });
                    }
                } else {
                    info.textContent = 'Игра закончилась ничьей';
                    game_over = true;
                }


            } else {
                if (target.classList.contains('field') === false && target.tagName !== 'BUTTON')
                    trigger.classList.remove('hidden');

            }
        }

    });
    var restart = document.querySelector('.restart');
    restart.addEventListener('click', function () {
        game_over = false;
        info.textContent = "Начинаем игру";
        first_turn(cages, trigger);
    })
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function first_turn(cages, trigger) {
    if (trigger.classList.contains('hidden') !== true)
        trigger.classList.add('hidden');
    cages.forEach(function (element) {
        if (element.classList.contains('red'))
            element.classList.remove('red');
        if (element.classList.contains('green'))
            element.classList.remove('green');
        element.textContent = '';
    });
    var random = getRandomInt(1, 3);
    console.log(random);
    if (random === 1) {
        computer_mark = 'o';
        users_mark = 'x';
    } else {
        computer_mark = 'x';
        users_mark = 'o';
        cage_to_turn_computer = computerTurn(computer_mark, users_mark, cages);
        element_cage_to_turn = document.getElementById(cage_to_turn_computer);
        element_cage_to_turn.textContent = computer_mark;
    }
}

function ability_to_win(own_cages, empty_cages) {
    if (own_cages.indexOf('1') !== -1 && own_cages.indexOf('5') !== -1 && empty_cages.indexOf('9') !== -1)
        return '9';
    if (own_cages.indexOf('1') !== -1 && own_cages.indexOf('9') !== -1 && empty_cages.indexOf('5') !== -1)
        return '5';

    if (own_cages.indexOf('3') !== -1 && own_cages.indexOf('5') !== -1 && empty_cages.indexOf('7') !== -1)
        return '7';
    if (own_cages.indexOf('3') !== -1 && own_cages.indexOf('7') !== -1 && empty_cages.indexOf('5') !== -1)
        return '5';

    if (own_cages.indexOf('7') !== -1 && own_cages.indexOf('5') !== -1 && empty_cages.indexOf('3') !== -1)
        return '3';
    if (own_cages.indexOf('7') !== -1 && own_cages.indexOf('3') !== -1 && empty_cages.indexOf('5') !== -1)
        return '5';
    if (own_cages.indexOf('5') !== -1 && own_cages.indexOf('9') !== -1 && empty_cages.indexOf('1') !== -1)
        return '1';
    if (own_cages.indexOf('9') !== -1 && own_cages.indexOf('1') !== -1 && empty_cages.indexOf('5') !== -1)
        return '5';
    for (i = 0; i < 7; i += 3) {
        let cage_1 = 1 + i;
        let cage_2 = 2 + i;
        let cage_3 = 3 + i;
        if (own_cages.indexOf(cage_1 + '') !== -1 && own_cages.indexOf(cage_2 + '') !== -1 && empty_cages.indexOf(cage_3 + '') !== -1)
            return cage_3 + '';
        if (own_cages.indexOf(cage_1 + '') !== -1 && own_cages.indexOf(cage_3 + '') !== -1 && empty_cages.indexOf(cage_2 + '') !== -1)
            return cage_2 + '';
        if (own_cages.indexOf(cage_2 + '') !== -1 && own_cages.indexOf(cage_3 + '') !== -1 && empty_cages.indexOf(cage_1 + '') !== -1)
            return cage_1 + '';
    }
    for (i = 0; i < 3; i += 1) {
        let cage_1 = 1 + i;
        let cage_2 = 4 + i;
        let cage_3 = 7 + i;
        if (own_cages.indexOf(cage_1 + '') !== -1 && own_cages.indexOf(cage_2 + '') !== -1 && empty_cages.indexOf(cage_3 + '') !== -1)
            return cage_3 + '';
        if (own_cages.indexOf(cage_1 + '') !== -1 && own_cages.indexOf(cage_3 + '') !== -1 && empty_cages.indexOf(cage_2 + '') !== -1)
            return cage_2 + '';
        if (own_cages.indexOf(cage_2 + '') !== -1 && own_cages.indexOf(cage_3 + '') !== -1 && empty_cages.indexOf(cage_1 + '') !== -1)
            return cage_1 + '';
    }
    return false;
}

function computerTurn(computer_mark, users_mark, cages) {
    var empty_cages = [];
    var my_cages = [];
    var enemy_cages = [];
    cages.forEach(function (element) {
        text_content = element.textContent;
        switch (text_content) {
            case '':
                empty_cages.push(element.id);
                break;
            case computer_mark:
                my_cages.push(element.id);
                break;
            case users_mark:
                enemy_cages.push(element.id);
                break;
        }
    });
    let win_cage_computer = ability_to_win(my_cages, empty_cages);
    let win_cage_user = ability_to_win(enemy_cages, empty_cages);
    let cage_to_turn;
    if (win_cage_computer !== false)
        return win_cage_computer;
    if (win_cage_user !== false)
        return win_cage_user;
    if (my_cages.length === 0) {
        do {
            cage_to_turn = getRandomInt(1, 9) + '';
        } while (enemy_cages.indexOf(cage_to_turn) !== -1);
        return cage_to_turn;
    }
    for (i = 0; i < 7; i += 3) {
        let cage_1 = 1 + i;
        let cage_2 = 2 + i;
        let cage_3 = 3 + i;
        if (my_cages.indexOf(cage_1 + '') !== -1 && empty_cages.indexOf(cage_2 + '') !== -1 && enemy_cages.indexOf(cage_3 + '') === -1)
            return cage_2 + '';
        if (my_cages.indexOf(cage_1 + '') !== -1 && empty_cages.indexOf(cage_3 + '') !== -1 && enemy_cages.indexOf(cage_2 + '') === -1)
            return cage_3 + '';
        if (my_cages.indexOf(cage_2 + '') !== -1 && empty_cages.indexOf(cage_1 + '') !== -1 && enemy_cages.indexOf(cage_3 + '') === -1)
            return cage_1 + '';
        if (my_cages.indexOf(cage_2 + '') !== -1 && empty_cages.indexOf(cage_3 + '') !== -1 && enemy_cages.indexOf(cage_1 + '') === -1)
            return cage_3 + '';
        if (my_cages.indexOf(cage_3 + '') !== -1 && empty_cages.indexOf(cage_1 + '') !== -1 && enemy_cages.indexOf(cage_2 + '') === -1)
            return cage_1 + '';
        if (my_cages.indexOf(cage_3 + '') !== -1 && empty_cages.indexOf(cage_2 + '') !== -1 && enemy_cages.indexOf(cage_1 + '') === -1)
            return cage_2 + '';
    }

    for (i = 0; i < 3; i += 1) {
        let cage_1 = 1 + i;
        let cage_2 = 4 + i;
        let cage_3 = 7 + i;
        if (my_cages.indexOf(cage_1 + '') !== -1 && empty_cages.indexOf(cage_2 + '') !== -1 && enemy_cages.indexOf(cage_3 + '') === -1)
            return cage_2 + '';
        if (my_cages.indexOf(cage_1 + '') !== -1 && empty_cages.indexOf(cage_3 + '') !== -1 && enemy_cages.indexOf(cage_2 + '') === -1)
            return cage_3 + '';
        if (my_cages.indexOf(cage_2 + '') !== -1 && empty_cages.indexOf(cage_1 + '') !== -1 && enemy_cages.indexOf(cage_3 + '') === -1)
            return cage_1 + '';
        if (my_cages.indexOf(cage_2 + '') !== -1 && empty_cages.indexOf(cage_3 + '') !== -1 && enemy_cages.indexOf(cage_1 + '') === -1)
            return cage_3 + '';
        if (my_cages.indexOf(cage_3 + '') !== -1 && empty_cages.indexOf(cage_1 + '') !== -1 && enemy_cages.indexOf(cage_2 + '') === -1)
            return cage_1 + '';
        if (my_cages.indexOf(cage_3 + '') !== -1 && empty_cages.indexOf(cage_2 + '') !== -1 && enemy_cages.indexOf(cage_1 + '') === -1)
            return cage_2 + '';
    }
    if (empty_cages.indexOf('1') !== -1 && empty_cages.indexOf('2') !== -1 && empty_cages.indexOf('3') !== -1)
        return '2';
    if (empty_cages.indexOf('4') !== -1 && empty_cages.indexOf('5') !== -1 && empty_cages.indexOf('6') !== -1)
        return '5';
    if (empty_cages.indexOf('7') !== -1 && empty_cages.indexOf('8') !== -1 && empty_cages.indexOf('9') !== -1)
        return '8';
    if (empty_cages.indexOf('1') !== -1 && empty_cages.indexOf('4') !== -1 && empty_cages.indexOf('7') !== -1)
        return '4';
    if (empty_cages.indexOf('2') !== -1 && empty_cages.indexOf('5') !== -1 && empty_cages.indexOf('8') !== -1)
        return '5';
    if (empty_cages.indexOf('3') !== -1 && empty_cages.indexOf('6') !== -1 && empty_cages.indexOf('9') !== -1)
        return '6';
    if (empty_cages.length < 2)
        return 'end';
    return empty_cages[0] + '';
}

function is_somebody_win(cages, mark) {
    let cage_winner = [];
    if (cages[0].textContent === mark && cages[4].textContent === mark && cages[8].textContent === mark) {
        cage_winner.push(0);
        cage_winner.push(4);
        cage_winner.push(8);
        return cage_winner;
    }
    if (cages[2].textContent === mark && cages[4].textContent === mark && cages[6].textContent === mark) {
        cage_winner.push(2);
        cage_winner.push(4);
        cage_winner.push(6);
        return cage_winner;
    }
    for (i = 0; i < 7; i += 3) {
        let cage_1 = i;
        let cage_2 = 1 + i;
        let cage_3 = 2 + i;
        if (cages[cage_1].textContent === mark && cages[cage_2].textContent === mark && cages[cage_3].textContent === mark) {
            cage_winner.push(cage_1);
            cage_winner.push(cage_2);
            cage_winner.push(cage_3);
            return cage_winner;
        }
    }

    for (i = 0; i < 3; i += 1) {
        let cage_1 = i;
        let cage_2 = 3 + i;
        let cage_3 = 6 + i;
        if (cages[cage_1].textContent === mark && cages[cage_2].textContent === mark && cages[cage_3].textContent === mark) {
            cage_winner.push(cage_1);
            cage_winner.push(cage_2);
            cage_winner.push(cage_3);
            return cage_winner;
        }
    }
    return cage_winner;
}
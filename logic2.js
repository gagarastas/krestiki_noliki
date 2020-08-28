var computer_mark='';
var users_mark='';


window.onload = function(){
    var trigger=document.querySelector('.trigger');
    var cages=document.querySelectorAll('.cage');
    var marker =document.querySelector('.field');
    first_turn(cages,trigger);
        marker.addEventListener('click', function () {
            var target=event.target;
            if(target.textContent==='')
            {
                trigger.style.visibility='hidden';
                target.textContent=users_mark;
                cage_to_turn_computer=computerTurn(computer_mark,users_mark,cages);
                if(cage_to_turn_computer!=='end')
                {
                    element_cage_to_turn = document.getElementById(cage_to_turn_computer);
                    element_cage_to_turn.textContent = computer_mark;
                }
                else
                {
                    var info=document.querySelector('.info');
                    info.textContent='Игра закончилась ничьей';
                }

            }
            else
            {

                //trigger.style.visibility='visible';
            }

        });
    var restart=document.querySelector('.restart');
    /** todo-13.04.2020-mikhaylov.nv */
    restart.addEventListener('click', () => {
        //first_turn(cages, trigger);
        //if (null !== trigger) {
        	trigger.classList.toggle('hidden');
		//}
    })


};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function first_turn(cages,trig) {
    console.log(trig);
    console.log(trig.style.visibility);
    //trig.style.visibility='hidden';
    console.log('jfj');
    //console.log(trigger.style.visibility);
    cages.forEach(function (element) {
        element.textContent= '';
    });
    var random =getRandomInt(1,3);
    console.log(random);
    if( random === 1)
    {
        computer_mark='o';
        users_mark='x';
    }
    else
    {
        computer_mark='x';
        users_mark='o';
        cage_to_turn_computer=computerTurn(computer_mark,users_mark,cages);
        element_cage_to_turn = document.getElementById(cage_to_turn_computer);
        element_cage_to_turn.textContent=computer_mark;
    }
}

function ability_to_win(own_cages,empty_cages)
{
    if(own_cages.indexOf('1')!==-1&&own_cages.indexOf('5')!==-1&&empty_cages.indexOf('9')!==-1)
        return '9';
    if(own_cages.indexOf('1')!==-1&&own_cages.indexOf('9')!==-1&&empty_cages.indexOf('5')!==-1)
        return '5';

    if(own_cages.indexOf('3')!==-1&&own_cages.indexOf('5')!==-1&&empty_cages.indexOf('7')!==-1)
        return '7';
    if(own_cages.indexOf('3')!==-1&&own_cages.indexOf('7')!==-1&&empty_cages.indexOf('5')!==-1)
        return '5';

    if(own_cages.indexOf('7')!==-1&&own_cages.indexOf('5')!==-1&&empty_cages.indexOf('3')!==-1)
        return '3';
    if(own_cages.indexOf('7')!==-1&&own_cages.indexOf('3')!==-1&&empty_cages.indexOf('5')!==-1)
        return '5';
    if(own_cages.indexOf('5')!==-1&&own_cages.indexOf('9')!==-1&&empty_cages.indexOf('1')!==-1)
        return '1';
    if(own_cages.indexOf('9')!==-1&&own_cages.indexOf('1')!==-1&&empty_cages.indexOf('5')!==-1)
        return '5';
    for(i=0;i<7;i+=3)
    {
        let cage_1 =1+i;
        let cage_2=2+i;
        let cage_3=3+i;
        if(own_cages.indexOf(cage_1+'')!==-1&&own_cages.indexOf(cage_2+'')!==-1&&empty_cages.indexOf(cage_3+'')!==-1)
            return cage_3+'';
        if(own_cages.indexOf(cage_1+'')!==-1&&own_cages.indexOf(cage_3+'')!==-1&&empty_cages.indexOf(cage_2+'')!==-1)
            return cage_2+'';
        if(own_cages.indexOf(cage_2+'')!==-1&&own_cages.indexOf(cage_3+'')!==-1&&empty_cages.indexOf(cage_1+'')!==-1)
            return cage_1+'';
    }
    for(i=0;i<3;i+=1)
    {
        let cage_1 =1+i;
        let cage_2=4+i;
        let cage_3=7+i;
        if(own_cages.indexOf(cage_1+'')!==-1&&own_cages.indexOf(cage_2+'')!==-1&&empty_cages.indexOf(cage_3+'')!==-1)
            return cage_3+'';
        if(own_cages.indexOf(cage_1+'')!==-1&&own_cages.indexOf(cage_3+'')!==-1&&empty_cages.indexOf(cage_2+'')!==-1)
            return cage_2+'';
        if(own_cages.indexOf(cage_2+'')!==-1&&own_cages.indexOf(cage_3+'')!==-1&&empty_cages.indexOf(cage_1+'')!==-1)
            return cage_1+'';
    }
    return false;
}
function computerTurn(computer_mark,users_mark,cages)
{
    empty_cages=[];
    my_cages=[];
    enemy_cages=[];
    cages.forEach(function (element) {
        text_content=element.textContent;
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
    let win_cage_computer=ability_to_win(my_cages,empty_cages);
    let win_cage_user=ability_to_win(enemy_cages,empty_cages);
    let cage_to_turn;
    console.log(win_cage_user);
    if(win_cage_computer!=false)
        return win_cage_computer;
    if(win_cage_user!=false)
        return win_cage_user;
    if(my_cages.length===0)
    {
        do {
            cage_to_turn = getRandomInt(1, 9) + '';
        } while (enemy_cages.indexOf(cage_to_turn)!==-1);
        return cage_to_turn;
    }
    for(i=0;i<7;i+=3)
    {
        let cage_1 =1+i;
        let cage_2=2+i;
        let cage_3=3+i;
        if(my_cages.indexOf(cage_1+'')!==-1&&empty_cages.indexOf(cage_2+'')!==-1&&enemy_cages.indexOf(cage_3+'')===-1)
            return cage_2+'';
        if(my_cages.indexOf(cage_1+'')!==-1&&empty_cages.indexOf(cage_3+'')!==-1&&enemy_cages.indexOf(cage_2+'')===-1)
            return cage_3+'';
        if(my_cages.indexOf(cage_2+'')!==-1&&empty_cages.indexOf(cage_1+'')!==-1&&enemy_cages.indexOf(cage_3+'')===-1)
            return cage_1+'';
        if(my_cages.indexOf(cage_2+'')!==-1&&empty_cages.indexOf(cage_3+'')!==-1&&enemy_cages.indexOf(cage_1+'')===-1)
            return cage_3+'';
        if(my_cages.indexOf(cage_3+'')!==-1&&empty_cages.indexOf(cage_1+'')!==-1&&enemy_cages.indexOf(cage_2+'')===-1)
            return cage_1+'';
        if(my_cages.indexOf(cage_3+'')!==-1&&empty_cages.indexOf(cage_2+'')!==-1&&enemy_cages.indexOf(cage_1+'')===-1)
            return cage_2+'';
    }

    for(i=0;i<3;i+=1)
    {
        let cage_1 =1+i;
        let cage_2=4+i;
        let cage_3=7+i;
        if(my_cages.indexOf(cage_1+'')!==-1&&empty_cages.indexOf(cage_2+'')!==-1&&enemy_cages.indexOf(cage_3+'')===-1)
            return cage_2+'';
        if(my_cages.indexOf(cage_1+'')!==-1&&empty_cages.indexOf(cage_3+'')!==-1&&enemy_cages.indexOf(cage_2+'')===-1)
            return cage_3+'';
        if(my_cages.indexOf(cage_2+'')!==-1&&empty_cages.indexOf(cage_1+'')!==-1&&enemy_cages.indexOf(cage_3+'')===-1)
            return cage_1+'';
        if(my_cages.indexOf(cage_2+'')!==-1&&empty_cages.indexOf(cage_3+'')!==-1&&enemy_cages.indexOf(cage_1+'')===-1)
            return cage_3+'';
        if(my_cages.indexOf(cage_3+'')!==-1&&empty_cages.indexOf(cage_1+'')!==-1&&enemy_cages.indexOf(cage_2+'')===-1)
            return cage_1+'';
        if(my_cages.indexOf(cage_3+'')!==-1&&empty_cages.indexOf(cage_2+'')!==-1&&enemy_cages.indexOf(cage_1+'')===-1)
            return cage_2+'';
    }
    if(empty_cages.indexOf('1')!==-1&&empty_cages.indexOf('2')!==-1&&empty_cages.indexOf('3')!==-1)
        return '2';
    if(empty_cages.indexOf('4')!==-1&&empty_cages.indexOf('5')!==-1&&empty_cages.indexOf('6')!==-1)
        return '5';
    if(empty_cages.indexOf('7')!==-1&&empty_cages.indexOf('8')!==-1&&empty_cages.indexOf('9')!==-1)
        return '8';
    if(empty_cages.indexOf('1')!==-1&&empty_cages.indexOf('4')!==-1&&empty_cages.indexOf('7')!==-1)
        return '4';
    if(empty_cages.indexOf('2')!==-1&&empty_cages.indexOf('5')!==-1&&empty_cages.indexOf('8')!==-1)
        return '5';
    if(empty_cages.indexOf('3')!==-1&&empty_cages.indexOf('6')!==-1&&empty_cages.indexOf('9')!==-1)
        return '6';
    if (empty_cages.length===0)
        return 'end';
    return empty_cages[0]+'';
}

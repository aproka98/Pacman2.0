let blockSize = 30;
let gameArea;
let score = 0;
let lives = 3;
let myMusic;
//let ghostDirections = [1,2,3,4];
let field = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0],
    [0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0],
    [0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,3,0,0,3,0,0,0,0,0,2,0,0,0,0,0,0],
    [3,3,3,3,3,0,2,0,0,0,0,0,3,0,0,3,0,0,0,0,0,2,0,3,3,3,3,3],
    [3,3,3,3,3,0,2,0,0,3,3,3,3,3,3,3,3,3,3,0,0,2,0,3,3,3,3,3],
    [3,3,3,3,3,0,2,0,0,3,0,0,0,3,3,0,0,0,3,0,0,2,0,3,3,3,3,3],
    [0,0,0,0,0,0,2,0,0,3,0,3,3,3,3,3,3,0,3,0,0,2,0,0,0,0,0,0],
    [3,3,3,3,3,3,2,3,3,3,0,3,3,3,3,3,3,0,3,3,3,2,3,3,3,3,3,3],
    [0,0,0,0,0,0,2,0,0,3,0,3,3,4,3,3,3,0,3,0,0,2,0,0,0,0,0,0],
    [3,3,3,3,3,0,2,0,0,3,0,0,0,0,0,0,0,0,3,0,0,2,0,3,3,3,3,3],
    [3,3,3,3,3,0,2,0,0,3,3,3,3,3,3,3,3,3,3,0,0,2,0,3,3,3,3,3],
    [3,3,3,3,3,0,2,0,0,3,0,0,0,0,0,0,0,0,3,0,0,2,0,3,3,3,3,3],
    [0,0,0,0,0,0,2,0,0,3,0,0,0,0,0,0,0,0,3,0,0,2,0,0,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
    [0,2,2,2,0,0,2,2,2,2,2,2,2,2,5,2,2,2,2,2,2,2,0,0,2,2,2,0],
    [0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0],
    [0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0],
    [0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0],
    [0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0],
    [0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]
let pacman = {
    x:14,
    y:23
}
let ghost = {
    x:13,
    y:15
}
function drawGameArea(){
   for(let x = 0; x < field.length; x++){
       for (let y = 0;y < field[x].length; y++){
           let block = $('<div></div>');
           if(field[x][y] === 0){
               block.addClass('wall');
           } else if(field[x][y] === 2){
               block.addClass('coin');
           }  else if (field[x][y] === 4){
               block.attr('id', 'ghost');
           } else if (field[x][y] === 5) {
               block.attr('id', 'pacman');
           }
           block.css({
               width:blockSize,
               height:blockSize,
               top : x*blockSize,
               left: y*blockSize
           });
           block.appendTo(gameArea);
       }
   }
}
function movePacmanToOtherPosition(e) {
    let key = e.key;
    if (key === 'w') {
        
        if (field[pacman.y - 1][pacman.x]) {
            pacman.y = pacman.y - 1;
            animatePac();
        }
    }
    else if (key === 'a') {
        if (field[pacman.y][pacman.x - 1]) {
            pacman.x = pacman.x - 1;
            animatePac();
        }
    }
    else if (key === 's') {
        if (field[pacman.y + 1][pacman.x]) {
            pacman.y = pacman.y + 1;
            animatePac();
        }
    }
    else if (key === 'd') {
        if (field[pacman.y][pacman.x + 1]) {
            pacman.x = pacman.x + 1;
            animatePac();
        }
    }
}
/*function movingGhost(){
    while(lives > 0){
        let ghostDirection = ghostDirections[Math.floor(Math.random() * ghostDirections.length)];
        if(ghostDirection = 1){
            ghost.x = ghost.x - 1;
        } else if (ghostDirection = 2){
            ghost.x = ghost.x + 1;
        } else if (ghostDirection = 3){
            ghost.y = ghost.y + 1;
        } else {
            ghost.y = ghost.y -1;
        }
    }
}*/

function animatePac(){
    $('#pacman').animate({
        top: pacman.y * blockSize,
        left: pacman.x * blockSize
    }, 1, function () {
        gameArea.find('.coin').each(function () {
            if ($(this).css('top') === $('#pacman').css('top')
                && $(this).css('left') === $('#pacman').css('left')) {
                $(this).removeClass('coin');
                score += 10;
                if(score === 2450){
                    YouWonThisGame();
                    var person = prompt("Adja meg a nevét:", "Anonym szeretnék maradni!");
                    localStorage.setItem(person, Number(score));
                    FillToplist();
                }
                $('#score').text(score);
            }
        });
        gameArea.find('#ghost').each(function () {
            if($(this).css('top') === $('#pacman').css('top')
                && $(this).css('left') === $('#pacman').css('left')) {
                if(lives > 0){
                    lives -= 1;
                    pacman = {
                        x:14,
                        y:23
                    }} else {
                        YouLostThisGame();
                        let person = prompt("Adja meg a nevét:", "Anonym szeretnék maradni!");
                        localStorage.setItem(person, Number(score));
                        FillToplist();
                }

                $('#lives').text(lives);
            }

        });
    });
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function YouLostThisGame(){
    gameArea.empty();
    gameArea.append('<div id="loser">LOSE</div style>');
}
function YouWonThisGame(){
    gameArea.empty();
    gameArea.append('<div id="winner">WIN</div style>');
}

function FillToplist() {
    var data = [];
    for (let i = 0; i < localStorage.length; i++) {
        data[i] = [localStorage.key(i), parseInt(localStorage.getItem(localStorage.key(i)))];
    }
    data.sort(function (a, b) {
        return b[1] - a[1];
    });
    for (let act_data of data.keys()) {
        if (act_data < 10) {
            $('#list').append(data[act_data][0] + ' - ' + data[act_data][1] + '<br><hr>');
        }
    }
}


$(function () {
    gameArea = $('<div></div>');
    gameArea.appendTo('body');
    gameArea.attr('id','map');

    myMusic = new sound("original_music.mp3");
    myMusic.play();


    drawGameArea();
    //movingGhost();
    window.addEventListener('keydown', movePacmanToOtherPosition, false);
    FillToplist();

    gameArea.append('<div id="score_tab">Score:<span id="score" style="padding-left: 10px"></span></div>')
    $('#score').text(score);
    gameArea.append('<div id="lives_tab">Lives:<span id="lives" style="padding-left: 10px"></span></div>')
    $('#lives').text(lives);
})

let blockSize = 30;
let gameArea;
let score = 0;
let lives = 3;
let myMusic;
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
function movingGhost(){
    if(lives > 0){
        let ghostDirection = Math.floor(Math.random() * 4 + 1);
        if(ghostDirection === 1 && field[ghost.y][ghost.x - 1] !== 0){
            ghost.x = ghost.x - 1;
        } else if (ghostDirection === 2 && field[ghost.y][ghost.x + 1] !== 0){
            ghost.x = ghost.x + 1;
        } else if (ghostDirection === 3  && field[ghost.y + 1][ghost.x] !== 0){
            ghost.y = ghost.y + 1;
        } else if(ghostDirection === 4  && field[ghost.y - 1][ghost.x] !== 0){
            ghost.y = ghost.y -1;
        }
        animateGhost();
    }
}

function animateGhost() {
    $('#ghost').animate({
        top: ghost.y * blockSize,
        left: ghost.x * blockSize
    }, 0);
}

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
function startNewGame() {
    $('#map').css("background-image", "none");
    $('#map').css("margin-left", "500px");
    $('#main_score').css("display","none");
    $('#newGame').css("display","none");
    $('#list').css("display","none");

    drawGameArea();
    myMusic = new sound("original_music.mp3");
    myMusic.play();
    setInterval(movingGhost, 1000);

    window.addEventListener('keydown', movePacmanToOtherPosition, false);

    gameArea.append('<div id="score_tab">Score:<span id="score" style="padding-left: 10px"></span></div>')
    $('#score').text(score);
    gameArea.append('<div id="lives_tab">Lives:<span id="lives" style="padding-left: 10px"></span></div>')
    $('#lives').text(lives);
}

function YouLostThisGame(){
    gameArea.empty();
    myMusic.stop();
    gameArea.append('<div id="loser">You lost this game, try again!</div style>');
    gameArea.append('<button id="newGame">Try Again</button>');
    $("#newGame").on('click', startNewGame);
}
function YouWonThisGame(){
    gameArea.empty();
    myMusic.stop();
    gameArea.append('<div id="winner">WIN</div style>');
}

function FillToplist() {
    gameArea.empty();
    gameArea.append('<h2>Top 10</h2>');
    gameArea.append('<p id="list"></p>');
    gameArea.append('<button id="back">Back</button>');
    $(document).ready(function(){
        $("#back").click(function(){
            location.reload(true);
        });
    });

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

    gameArea.append('<button id="newGame">New Game</button>');
    $("#newGame").on('click', startNewGame);
    gameArea.append('<button id="main_score">Scores</button>');
    $("#main_score").on('click', FillToplist);
})

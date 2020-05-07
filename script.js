const blockSize = 30;           //blokkok méretei
let gameArea;                   //játéktér
let score = 0;                  //pontszám
let lives = 3;                  //életek
let myMusic;                    //háttérzene
let mySound;                    //életvesztés hangeffektje
const field = [                 //pálya tömb
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
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
const mapSize = {               //pálya mérete
    x:27,
    y:29
}
let pacman = {                  //pacman kiinduló pontja
    x:14,
    y:23
}
let ghost = {                   //szellem kiinduló pontja
    x:13,
    y:15
}
//pálya tömb bejárása, blokkok hozzáadása, osztály vagy id hozzáadása a blokkokhoz, majd az egész hozzáadása ajátéktérhez
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
let key = 'd';          //key alapértelemezett beállítása jobbra/ d billentyűre
//irány bekérése
function setPacmanDirection(e) {
    key = e.key;
}
//pacman mozgatása
function movePacmanToOtherPosition() {
    //ha a pacman bal oldalt kimenne a pályáról, akkor jobbról jöjjön be (valamiért nem működik, nem tudtam rájönni miért nem)
    if(pacman.x === 0){
        pacman.x = mapSize.x;
        animatePac();
    }
    //ha a pacman jobb oldalt kimenne a pályáról, akkor balról jöjjön be
    if(pacman.x === mapSize.x){
        pacman.x = 0;
    }
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
//szellem mozgatása - kicsit bután, random számot kap és a szám alapján elindul a hozzárendelt irányba
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
//szellem animálása
function animateGhost() {
    $('#ghost').animate({
        top: ghost.y * blockSize,
        left: ghost.x * blockSize
    }, 0);
}
//pacman animálása
function animatePac(){
    $('#pacman').animate({
        top: pacman.y * blockSize,
        left: pacman.x * blockSize
    }, 1, function () {
        gameArea.find('.coin').each(function () {                           //ha coint talál, akkor "felveszi" és kap 10 pontot
            if ($(this).css('top') === $('#pacman').css('top')
                && $(this).css('left') === $('#pacman').css('left')) {
                $(this).removeClass('coin');
                score += 10;
                if(score === 2450){     //ha a pontszám eléri a maxot, akkor a játékos nyert és hozzáadódik a ranglistához
                    YouWonThisGame();
                    var person = prompt("Adja meg a nevét:", "Anonym szeretnék maradni!");
                    localStorage.setItem(person, Number(score));
                    FillToplist();
                }
                $('#score').text(score);
            }
        });
        //ha szellemet talál a pacman, akkor életet veszít, ha minden életetét elveszítette akkor a játék véget ér és hozzáadódik a ranglistához
        gameArea.find('#ghost').each(function () {
            if($(this).css('top') === $('#pacman').css('top')
                && $(this).css('left') === $('#pacman').css('left')) {
                if(lives > 0){
                    myMusic.stop();
                    mySound.play();
                    lives -= 1;
                    myMusic.play();
                    pacman = {
                        x:14,
                        y:23
                    }
                    animatePac();
                } else {
                        YouLostThisGame();
                        let person = prompt("Adja meg a nevét:", "Anonym szeretnék maradni!");
                        localStorage.setItem(person, Number(score));

                }

                $('#lives').text(lives);
            }

        });
    });
}
//hangeffekt definiálása
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}
//háttérzene definiálása
function backgroundMusic(src) {
    this.backgroundMusic = document.createElement("audio");
    this.backgroundMusic.loop = true;
    this.backgroundMusic.src = src;
    this.backgroundMusic.setAttribute("preload", "auto");
    this.backgroundMusic.setAttribute("controls", "none");
    this.backgroundMusic.style.display = "none";
    document.body.appendChild(this.backgroundMusic);
    this.play = function(){
        this.backgroundMusic.play();
    }
    this.stop = function(){
        this.backgroundMusic.pause();
    }
}
//játék / új játék kezdése amennyiben a New Game gombra rákattintunk
function startNewGame() {
    $('#map').css("background-image", "none");          //kezdő oldal beállításainak eltűntetése
    $('#map').css("margin-left", "500px");
    $('#main_score').css("display","none");
    $('#newGame').css("display","none");
    $('#list').css("display","none");

    drawGameArea();                                     //játéktér kirajzolása
    mySound = new sound("losing_lives_music.mp3");      //hangeffekt betöltése
    myMusic = new backgroundMusic("original_music.mp3");    //háttérzene betöltése
    myMusic.play();     //háttérzene elindítása

    setInterval(movePacmanToOtherPosition, 100);  //pacman folytonos mozgatása a megfelelő irányba
    setInterval(movingGhost, 100);                //szellem folytonos mozgatása

    window.addEventListener('keydown', setPacmanDirection, false);

    //játéktérhez hozzárendeljük a pontszám és élet mezőket, a hozzájuk tartozó id-kkal és css-el
    gameArea.append('<div id="score_tab">Score:<span id="score" style="padding-left: 10px"></span></div>')
    $('#score').text(score);
    gameArea.append('<div id="lives_tab">Lives:<span id="lives" style="padding-left: 10px"></span></div>')
    $('#lives').text(lives);
}
//függvény a játék elvesztéséhez
function YouLostThisGame(){
    gameArea.empty();
    myMusic.stop();
    gameArea.append('<div id="loser">You lost this game, try again!</div style>');
    gameArea.append('<button id="newGame">Try Again</button>');
    $("#newGame").on('click', startNewGame);
}
//függvény a játék megnyeréséhez
function YouWonThisGame(){
    gameArea.empty();
    myMusic.stop();
    gameArea.append('<div id="winner">WIN</div style>');
}
//toplista kirajzolása és feltöltése
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

//az oldal elindításakor betöltődő dolgok, játéktér hozzáadása, New Game és Scores gombok
$(function () {
    gameArea = $('<div></div>');
    gameArea.appendTo('body');
    gameArea.attr('id','map');

    gameArea.append('<button id="newGame">New Game</button>');
    $("#newGame").on('click', startNewGame);
    gameArea.append('<button id="main_score">Scores</button>');
    $("#main_score").on('click', FillToplist);
})

const blockSize = 30;           //blokkok méretei
let gameArea;                   //játéktér
let score = 0;                  //pontszám
let key = 'd';                  //key alapértelemezett beállítása jobbra/ d billentyűre
let lives = 3;                  //életek
let myMusic;                    //háttérzene
let mySound;                    //életvesztés hangeffektje
const field = [                 //pálya tömb
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,6,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,6,0],
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
    [3,3,3,3,3,0,2,0,0,3,0,0,3,3,3,3,0,0,3,0,0,2,0,3,3,3,3,3],
    [0,0,0,0,0,0,2,0,0,3,0,3,3,3,3,3,3,0,3,0,0,2,0,0,0,0,0,0],
    [3,3,3,3,3,3,2,3,3,3,0,3,3,4,3,3,3,0,3,3,3,2,3,3,3,3,3,3],
    [0,0,0,0,0,0,2,0,0,3,0,3,3,3,3,3,3,0,3,0,0,2,0,0,0,0,0,0],
    [3,3,3,3,3,0,2,0,0,3,0,0,3,3,3,3,0,0,3,0,0,2,0,3,3,3,3,3],
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
    [0,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,6,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]
const fieldSize = {               //pálya mérete
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
//pálya tömb bejárása, blokkok hozzáadása, osztály vagy id hozzáadása a blokkokhoz, majd az egész hozzáadása ajátéktérhez
function drawGameArea(){
   for(let x = 0; x < field.length; x++){
       for (let y = 0;y < field[x].length; y++){
           let block = $('<div></div>');
           if(field[x][y] === 0){
               block.addClass('wall');
           } else if(field[x][y] === 2){
               block.addClass('coin');
           }  else if(field[x][y] === 6){
               block.addClass('cherry');
           } else if (field[x][y] === 4){
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

//irány bekérése
function setPacmanDirection(e) {
    key = e.key;
}
//pacman mozgatása
function movePacmanToOtherPosition() {
    //ha a pacman bal oldalt kimenne a pályáról, akkor jobbról jöjjön be (valamiért nem működik, nem tudtam rájönni miért nem)
    if(pacman.x === 0){
        pacman.x = fieldSize.x;
    }
    //ha a pacman jobb oldalt kimenne a pályáról, akkor balról jöjjön be
    if(pacman.x === fieldSize.x){
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
//szellem mozgatása
function movingGhost(){
    if(lives >= 0){
        if(ghost.x < pacman.x){
            if(field[ghost.y][ghost.x + 1] !== 0 && ghost.x !== 28){
                ghost.x = ghost.x + 1;
            } else if(ghost.y < pacman.y){
                if(field[ghost.y + 1][ghost.x] !== 0){
                    ghost.y = ghost.y + 1;
                }
            } else if(ghost.y > pacman.y){
                if(field[ghost.y - 1][ghost.x] !== 0){
                    ghost.y = ghost.y -1;
                }
            }
        }
        else if (ghost.y === pacman.y){
            if(ghost.x !== pacman.x){
                if(ghost.x < pacman.x){
                    if(field[ghost.y][ghost.x + 1] !== 0 && ghost.x !== 28){
                        ghost.x = ghost.x + 1;
                    } else if(ghost.y < pacman.y){
                        if(field[ghost.y + 1][ghost.x] !== 0){
                            ghost.y = ghost.y + 1;
                        }
                    } else if(ghost.y > pacman.y){
                        if(field[ghost.y - 1][ghost.x] !== 0){
                            ghost.y = ghost.y -1;
                        }
                    }
                }
                else if (ghost.x >pacman.x) {
                    if(field[ghost.y][ghost.x - 1] !== 0 && ghost.x !== 0){
                        ghost.x = ghost.x - 1;
                    } else if(ghost.y < pacman.y){
                        if(field[ghost.y + 1][ghost.x] !== 0){
                            ghost.y = ghost.y + 1;
                        }
                    } else if(ghost.y > pacman.y){
                        if(field[ghost.y - 1][ghost.x] !== 0){
                            ghost.y = ghost.y -1;
                        }
                    }
                }
            }
        }
        else if (ghost.x >pacman.x) {
            if(field[ghost.y][ghost.x - 1] !== 0 && ghost.x !== 0){
                ghost.x = ghost.x - 1;
            } else if(ghost.y < pacman.y){
                if(field[ghost.y + 1][ghost.x] !== 0){
                    ghost.y = ghost.y + 1;
                }
            } else if(ghost.y > pacman.y){
                if(field[ghost.y - 1][ghost.x] !== 0){
                    ghost.y = ghost.y -1;
                }
            }
        }
        else if(ghost.y < pacman.y){
            if(field[ghost.y + 1][ghost.x] !== 0){
                ghost.y = ghost.y + 1;
            } else if (ghost.x >pacman.x) {
                if (field[ghost.y][ghost.x - 1] !== 0 && ghost.x !== 0) {
                    ghost.x = ghost.x - 1;
                }
            } else if(ghost.x < pacman.x) {
                if (field[ghost.y][ghost.x + 1] !== 0 && ghost.x !== 28) {
                    ghost.x = ghost.x + 1;
                }
            }
        }
        else if (ghost.x >pacman.x) {
            if(field[ghost.y][ghost.x - 1] !== 0 && ghost.x !== 0){
                ghost.x = ghost.x - 1;
            } else if(ghost.y < pacman.y){
                if(field[ghost.y + 1][ghost.x] !== 0){
                    ghost.y = ghost.y + 1;
                }
            } else if(ghost.y > pacman.y){
                if(field[ghost.y - 1][ghost.x] !== 0){
                    ghost.y = ghost.y -1;
                }
            }
        }
        else if(ghost.y > pacman.y){
            if(field[ghost.y - 1][ghost.x] !== 0){
                ghost.y = ghost.y -1;
            }  else if (ghost.x >pacman.x) {
                if(field[ghost.y][ghost.x - 1] !== 0 && ghost.x !== 0){
                    ghost.x = ghost.x - 1;
                }
            } else if(ghost.x < pacman.x) {
                if (field[ghost.y][ghost.x + 1] !== 0 && ghost.x !== 28) {
                    ghost.x = ghost.x + 1;
                }
            }
        }
        else if (ghost.x === pacman.x){
            if(ghost.y !== pacman.y){
                if(ghost.x < pacman.x){
                    if(field[ghost.y][ghost.x + 1] !== 0 && ghost.x !== 28){
                        ghost.x = ghost.x + 1;
                    } else if(ghost.y < pacman.y){
                        if(field[ghost.y + 1][ghost.x] !== 0){
                            ghost.y = ghost.y + 1;
                        }
                    } else if(ghost.y > pacman.y){
                        if(field[ghost.y - 1][ghost.x] !== 0){
                            ghost.y = ghost.y -1;
                        }
                    }
                }
                else if (ghost.x >pacman.x) {
                    if(field[ghost.y][ghost.x - 1] !== 0 && ghost.x !== 0){
                        ghost.x = ghost.x - 1;
                    } else if(ghost.y < pacman.y){
                        if(field[ghost.y + 1][ghost.x] !== 0){
                            ghost.y = ghost.y + 1;
                        }
                    } else if(ghost.y > pacman.y){
                        if(field[ghost.y - 1][ghost.x] !== 0){
                            ghost.y = ghost.y -1;
                        }
                    }
                }
            }
        }
     }
        animateGhost();
}
//szellem animálása
function animateGhost() {
    $('#ghost').animate({
        top: ghost.y * blockSize,
        left: ghost.x * blockSize
    }, 1, function () {
        gameArea.find('#pacman').each(function () {
                if($(this).css('top') === $('#ghost').css('top')
                    && $(this).css('left') === $('#ghost').css('left')) {
                    if (lives > 0) {
                        myMusic.stop();
                        mySound.play();
                        lives -= 1;
                        myMusic.play();
                        pacman = {
                            x: 14,
                            y: 23
                        }
                         ghost = {
                            x:13,
                            y:15
                        }
                        animateGhost();
                        animatePac();
                    } else {
                        YouLostThisGame();
                    }

                    $('#lives').text(lives);
                }});
    });
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
                if(score === 2870){     //ha a pontszám eléri a maxot, akkor a játékos nyert és hozzáadódik a ranglistához
                    YouWonThisGame();
                }
                $('#score').text(score);
            }
        });
        gameArea.find('.cherry').each(function () {                           //ha cherryt talál, akkor "felveszi" és kap 100 pontot
            if ($(this).css('top') === $('#pacman').css('top')
                && $(this).css('left') === $('#pacman').css('left')) {
                $(this).removeClass('cherry');
                score += 100;
                if(score === 2870){     //ha a pontszám eléri a maxot, akkor a játékos nyert és hozzáadódik a ranglistához
                    YouWonThisGame();
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
                    ghost = {
                        x:13,
                        y:15
                    }
                    animateGhost();
                    animatePac();
                } else {
                        YouLostThisGame();
                }

                $('#lives').text(lives);
            }

        });
    });
}
//játék / új játék kezdése amennyiben a New Game gombra rákattintunk
function startNewGame() {
    gameScreen();                                       //főmenü elrejtése, játékhoz való háttér beállítása
    drawGameArea();                                     //játéktér kirajzolása
    mySound = new sound("musics/losing_lives_music.mp3");      //hangeffekt betöltése
    myMusic = new backgroundMusic("musics/original_music.mp3");    //háttérzene betöltése
    myMusic.play();     //háttérzene elindítása

    setInterval(movePacmanToOtherPosition, 150);  //pacman folytonos mozgatása a megfelelő irányba
    setInterval(movingGhost, 200);                //szellem folytonos mozgatása

    window.addEventListener('keydown', setPacmanDirection, false);

    //játéktérhez hozzárendeljük a pontszám és élet mezőket, a hozzájuk tartozó id-kkal és css-el
    gameArea.append('<div id="score_tab">Score:<span id="score" style="padding-left: 10px"></span></div>')
    $('#score').text(score);
    gameArea.append('<div id="lives_tab">Lives:<span id="lives" style="padding-left: 10px"></span></div>')
    $('#lives').text(lives);
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
//rövid játékleírás, irányítógombok ismertetése
function gameHelper(){
    gameArea.empty();
    gameStopedScreen();
    gameArea.append('<p id=about_my_game>Pac-Man is a maze arcade game developed and released by Namco in 1980. The player controls Pac-Man, who must eat all the coins and cherries inside an enclosed maze while avoiding one colored ghost. <br><br> Pacman controlls: <br><br> W - UP ' +
        '<br> S - DOWN <br> A - LEFT <br> D - RIGHT </p>');
    gameArea.append('<button id="back">Back</button>');
    $(document).ready(function(){
        $("#back").click(function(){
            location.reload(true);
        });
    });
}
//Játék elvesztése - háttérzene megáll, nevet bekér, local storageban eltároli a pontszámot a névvel,
//kilistázza a top10-et, DEFEATED kiíratás és pár egyéb css módosítással a gameStoppedScreen() függvényből
function YouLostThisGame(){
    myMusic.stop();
    let person = prompt("Please tell me your name:", "Nameless");
    localStorage.setItem(person, Number(score));
    FillToplist();
    gameStopedScreen();
    gameArea.append('<div id="loser">DEFEATED</div style>');
}
//Játék elvesztése - háttérzene megáll, nevet bekér, local storageban eltároli a pontszámot a névvel,
//kilistázza a top10-et, WINNER kiíratás és pár egyéb css módosítással a gameStoppedScreen() függvényből
function YouWonThisGame(){
    myMusic.stop();
    let person = prompt("Please tell me your name:", "Nameless");
    localStorage.setItem(person, Number(score));
    FillToplist();
    gameStopedScreen();
    gameArea.append('<div id="winner">WINNER</div style>');
}
//New Gamere kattintáskor, játéktér betöltésekor eltűnjönek a felesleges dolgok, gombok, pár css módosítás
function gameScreen(){
    $('#map').css("background-image", "none");
    $('#map').css("margin-left", "500px");
    $('#main_score').css("display","none");
    $('#newGame').css("display","none");
    $('#list').css("display","none");
    $('#game_helper').css("display","none");
}
//Amikor a játék megáll, akkor jelenjenek meg a játéktér főmenüjének beállításai és háttere
function gameStopedScreen(){
    $('#map').css("background-image", "url('images/main_menu_background.png')");
    $('#map').css("margin-left", "350px");

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
    gameArea.append('<button id="game_helper">About game</button>');
    $("#game_helper").on('click', gameHelper);
})

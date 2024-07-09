//importamos las bibliotecas de sonido, la biblioteca de reproduccion de video, ControlP5, GIF
import ddf.minim.*;
import ddf.minim.analysis.*;
import ddf.minim.effects.*;
import ddf.minim.signals.*;
import ddf.minim.spi.*;
import ddf.minim.ugens.*;

import processing.video.*;

import controlP5.*;

import gifAnimation.*;

/*Definimos las variables globales, en este caso son los distintos estados del programa así como
 las llamadas a las clases Timer y Clock que administran el tiempo del programa
 y el esqueleto básico del programa.*/
int mainState, gameFase, x, y, w, h, cp5Width, cp5Height, cp5PosX, cp5bBackMenuX, cp5bBackMenuY, buttonValue;
/*Definimos los estados de la maquina.
 Utilizo el estado final para que las variables sean inamovibles y no varien dentro del programa*/
final int Start=0;
final int Mainmenu=1;
final int Config=2;
final int Play=3;
final int Exit=4;
/* Por otro lado, incluimos las variables que nos faltan para completar la interfaz, llamadas y otros constructos*/
PFont myFont;
color greyOne, greyTwo, greyThree, colorOne, colorTwo, colorThree;
PImage [][] buttonPng;
Movie video;
Movie video2;
Timer timer;
Clock clock;
Gif loopingGif;
ControlP5 cp5MainMenu, cp5ConfigMenu, cp5Help, cp5GameExit;
Minim myMinim;
AudioPlayer menuMusic, menuMusic2, pong, lose, wall;
Player player1, player2;
Ball ball;
boolean winner;
//Definimos el setup, los frames, el estado inicial del programa y llamamos a las clases Clock y Timer que controlarán
// y almacenarán el tiempo de nuestro programa.
void setup() {
  myFont = createFont("Super Mario.ttf", 20);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  greyOne = color(120, 120, 120);
  greyTwo = color(140, 140, 140);
  greyThree = color(100, 100, 100);
  cp5PosX= 415;
  cp5Width= 200;
  cp5Height= 50;
  cp5bBackMenuX= 1000;
  cp5bBackMenuY= 10;
  buttonValue= 0;

  size(1080, 720);
  frameRate(30);
//cargamos los videos
  video = new Movie(this, "intro.mp4");
  video2 = new Movie(this, "outro.mp4");
//cargamos los gifs
  loopingGif = new Gif (this, "background.gif");
  loopingGif.loop();

  mainState= Start;
  gameFase= 0;
  clock = new Clock();
  timer = new Timer();
//cargamos los sonidos
  myMinim = new Minim (this);
  menuMusic= myMinim.loadFile("pong song.mp3");
  menuMusic2= myMinim.loadFile("new ping pon song.mp3");
  pong= myMinim.loadFile("pong.mp3");
  wall= myMinim.loadFile("wall.mp3");
  lose= myMinim.loadFile("lose.mp3");
//Llamamos a las imagenes de los botones.
  buttonsImages();
  buttonsSet();

//añadimos dos jugadores y una bola
  player1 = new Player (1);
  player2 = new Player (2);

  ball= new Ball();

  winner=false;
}
//Definimos la maquina de estados y sus casos.
void draw() {
  switch(mainState) {
    case(Start):
    state_Start();
    cp5MainMenu.setVisible(false);
    cp5GameExit.setVisible(false);
    cp5ConfigMenu.setVisible(false);
    break;

    case(Mainmenu):
    state_Mainmenu();
    cp5MainMenu.setVisible(true);
    cp5ConfigMenu.setVisible(false);
    break;

    case(Play):
    state_Play();
    cp5GameExit.setVisible(true);
    break;

    case(Config):
    state_Config();
    cp5GameExit.setVisible(true);
    break;

    case(Exit):
    state_Exit();
    cp5GameExit.setVisible(false);
    break;
  }
}
//creamos un metodo para reproducir el video del inicio y del final.
void movieEvent(Movie video) {
  video.read();
}
//Medimos la posicion de la bola respecto al mapa, si esta pasa de su ancho o de 0, se añade un punto y una nueva bola en el centro
void points() {
  PVector posicionBall = ball.getPosicion();
  if (posicionBall.x > width && player1.getPoints()<5) {
    player1.setPoints(1);
    ball = new Ball ();
  } else if (posicionBall.x < 0 && player2.getPoints()<5) {
    player2.setPoints(1);
    ball = new Ball ();
  }
}
//visualizamos el score en la pantalla
void score() {
  text(player1.getPoints(), width/2-60, 50);
  text(player2.getPoints(), width/2+40, 50);
}
//Creamos la funcion ganador, para que el juego sepa cuando ha de parar y ejecutar el estado Exit.
void setWiner() {
  if (player1.getPoints()> 5) {
    mainState=Exit;
    winner=true;
  } else if (player2.getPoints()> 5) {
    mainState=Exit;
    winner=true;
  } else if (keyCode == CONTROL && winner == true ) {
    setup();
  }
}

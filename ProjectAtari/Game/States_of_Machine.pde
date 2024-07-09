/*Definimos las funciones de nuestros estados en la maquina e implementamos los botones que nos permitirán avanzar y
 retroceder, en el bucle infinito que hemos creado */
void state_Start() {
  video.play();
  image(video, 0, 0);
  clock.update();
  timer.update(clock.getSaveTime());
  timer.start(true);
  if (timer.getSeg() ==5) {
    mainState = Mainmenu;
    timer.reset();
  }
}
void state_Mainmenu() {
  background(0);
  image( loopingGif, 0, 0);
  cp5GameExit.setVisible(false);
}
//Invocamos todos los construstores de las clases Player y Ball. estas solo se representarán en el estado play.
void state_Play() {
  background(0);
  player1.show();
  player2.show();// dibuja los players
  player1.move();
  player2.move();// dibuja el movimiento de los players
  ball.move();
  ball.show();// dibuja el movimiento y representa la pelota
  ball.collisionPlayer1(player1.getPosition());
  ball.collisionPlayer2(player2.getPosition());
  ball.collisionWall(); // calculamos la posicion de los players para las colisiones pelota player y la colision pared pelota
  points();
  score();
  setWiner();//representamos los puntos, el score y el constructo winner que nos hara finalizar el juego
  menuMusic.pause();
  menuMusic.rewind();
  menuMusic2.pause();
  menuMusic2.rewind();//pausamos las canciones del menu pricipal
  cp5MainMenu.setVisible(false);
  cp5GameExit.setVisible(true);//escondemos los botones para jugar
}

void state_Config() {
  background(0);
  image( loopingGif, 0, 0);
  cp5ConfigMenu.setVisible(true);
  cp5MainMenu.setVisible(false);
}
void state_Exit() {
  background(0);
  video2.play();
  image(video2, -400, -360);
  cp5MainMenu.setVisible(false);
  clock.update();
  timer.update(clock.getSaveTime());
  timer.start(true);
  if (timer.getSeg() < 5) {
  }
  if (timer.getSeg()==5) {
    exit();
  }
}

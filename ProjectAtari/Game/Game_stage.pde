/* La clase player es la que controlamos, esta esta definida en un maximo de dos jugadores que solo se mueven en el eje Y
esta clase se basa en la posicion, la velocidad, los puntos y la introduccion de datos por teclado.*/
class Player {
  PVector pos, vel;
  int ancho, alto, numPlayer, points, y;
  boolean stop;
  Player(int numPlayer_) {
    numPlayer= numPlayer_;
    ancho= 20;
    alto=100;
    stop = false;
    y=height;
    points = 0;
    if (numPlayer == 1) {
      pos = new PVector(9+ancho/2, 360);
    } else if (numPlayer == 2) {
      pos = new PVector (width - ancho/2, 360);
    }
    vel = new PVector(0, 4);
  }
  void move() {
    if (numPlayer == 1 && key == 'w') {
      pos.sub(vel);
    } else if (numPlayer == 1 && key == 's') {
      pos.add(vel);
    }
    if (numPlayer == 2 && keyCode == UP ) {
      pos.sub(vel);
    } else if (numPlayer == 2 && keyCode == DOWN) {
      pos.add(vel);
    }
  }
  void show() {
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(pos.x, pos.y, ancho, alto);
  }
  void setPoints(int points_) {
    points += points_;
    lose.play();
  }
  int getPoints() {
    return points;
  }
  PVector getPosition() {
    return pos;
  }
}

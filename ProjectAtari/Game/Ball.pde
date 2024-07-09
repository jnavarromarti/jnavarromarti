/* Creamos la clase pelota con una velocidad y una posicion, esta detecta el ancho y el alto, y se redirecciona segun el vector
con el que golpee la barra o el player en este caso, por otra parte acelera segun sus colisiones y devuelve la posicion para
porder sumar puntos.*/
class Ball {
  PVector pos, vel;
  int anchoPlayer, altoPlayer;

  Ball() {
    anchoPlayer= 20;
    altoPlayer=100;
    pos = new PVector(width/2, height/2);
    vel= new PVector (random(2, 4), random(2, 4));
  }
  void move () {
    pos.add(vel);
  }
  void show () {
    fill(255);
    noStroke();
    ellipse(pos.x, pos.y, 20, 20);
  }
  void collisionPlayer1(PVector posPlayer) {
    float minimum = posPlayer.y-altoPlayer;
    float maximum = posPlayer.y+altoPlayer;
    if ( pos.x < anchoPlayer && pos.y > minimum && pos.y < maximum ) {
      vel.x *= -1;
    }
  }
  void collisionPlayer2(PVector posPlayer) {
    float minimum = posPlayer.y-altoPlayer;
    float maximum = posPlayer.y+altoPlayer;
    if ( pos.x > width - anchoPlayer && pos.y > minimum && pos.y < maximum ) {
      vel.x *= -1; 
    }
  }
  void collisionWall() {
    if (pos.y > height ) {
      vel.y *= -1;
    } else if (pos.y<0) {
      vel.y*=-1;
    }
  }
  PVector getPosicion() {
    return pos;
  }
}

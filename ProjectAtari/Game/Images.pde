/*Cargamos las imagenes en dos arrays, de esta forma no hace falta que las incrustemos con un pimage o un image.*/
void buttonsImages(){
  buttonPng = new PImage [4][3];
  buttonPng[0][0]= loadImage("PLAY 1.png");
  buttonPng[0][1]= loadImage("PLAY 1B.png");
  buttonPng[0][2]= loadImage("PLAY 1.png");

  buttonPng[1][0]= loadImage("MENU 1.png");
  buttonPng[1][1]= loadImage("MENU 1B.png");
  buttonPng[1][2]= loadImage("MENU 1.png");

  buttonPng[2][0]= loadImage("EXIT 1.png");
  buttonPng[2][1]= loadImage("EXIT 1B.png");
  buttonPng[2][2]= loadImage("EXIT 1.png");

  buttonPng[3][0]= loadImage("X 1.png");
  buttonPng[3][1]= loadImage("X 1B.png");
  buttonPng[3][2]= loadImage("X 1.png");
}

void buttonsImagesTwo() {
  buttonPng = new PImage [4][3];
  buttonPng[0][0]= loadImage("PLAY 2.png");
  buttonPng[0][1]= loadImage("PLAY 2B.png");
  buttonPng[0][2]= loadImage("PLAY 2.png");

  buttonPng[1][0]= loadImage("MENU 2.png");
  buttonPng[1][1]= loadImage("MENU 2B.png");
  buttonPng[1][2]= loadImage("MENU 2.png");

  buttonPng[2][0]= loadImage("EXIT 2.png");
  buttonPng[2][1]= loadImage("EXIT 2B.png");
  buttonPng[2][2]= loadImage("EXIT 2.png");

  buttonPng[3][0]= loadImage("X 1B.png");
  buttonPng[3][1]= loadImage("X 1.png");
  buttonPng[3][2]= loadImage("X 1B.png");
}

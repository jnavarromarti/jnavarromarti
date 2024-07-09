//Creamos la interfaz con controlp5
void buttonsSet() {
  cp5MainMenu = new ControlP5(this);
  cp5MainMenu.setBroadcast(false);
  cp5MainMenu.addButton("Play")
    .setPosition(cp5PosX, 250)
    .setSize(cp5Width, cp5Height)
    .setImages(buttonPng[0][0], buttonPng[0][1], buttonPng[0][2])
    ;

  cp5MainMenu.setBroadcast(false);
  cp5MainMenu.addButton("Config")
    .setPosition(cp5PosX, 400)
    .setSize(cp5Width, cp5Height)
    .setImages(buttonPng[1][0], buttonPng[1][1], buttonPng[1][2])
    ;

  cp5MainMenu.addButton("Exit")
    .setPosition(cp5PosX, 550)
    .setSize(cp5Width, cp5Height)
    .setImages(buttonPng[2][0], buttonPng[2][1], buttonPng[2][2])
    ;
  cp5MainMenu.setVisible(false);
  cp5MainMenu.setBroadcast(true);

  cp5GameExit = new ControlP5(this);
  cp5GameExit.setBroadcast(false);
  cp5GameExit.addButton("X")
    .setPosition(cp5bBackMenuX, cp5bBackMenuY)
    .setSize(50, cp5Height)
    .setImages(buttonPng[3][0], buttonPng[3][1], buttonPng[3][2])
    ;
  cp5GameExit.setVisible(false);
  cp5GameExit.setBroadcast(true);

  cp5ConfigMenu = new ControlP5(this);
  cp5ConfigMenu.setBroadcast(false);
  cp5ConfigMenu.addDropdownList("modeList")
    .setColorBackground(greyOne)
    .setColorForeground(greyTwo)
    .setColorActive(greyThree)
    .setId(1)
    .setPosition(cp5PosX, 200)
    .setSize(cp5Width, cp5Height*3)
    .setBarHeight(cp5Height)
    .setItemHeight(cp5Height)
    .setFont(myFont)
    .setLabel("mode")
    .addItem("normal", 1)
    .addItem("inverse", 2)
    .setOpen(false)
    ;
  cp5ConfigMenu.setBroadcast(false);
  cp5ConfigMenu.addDropdownList("characterList")
    .setColorBackground(greyOne)
    .setColorForeground(greyTwo)
    .setColorActive(greyThree)
    .setId(2)
    .setPosition(cp5PosX, 400)
    .setSize(cp5Width, cp5Height*3)
    .setBarHeight(cp5Height)
    .setItemHeight(cp5Height)
    .setFont(myFont)
    .setLabel("Musica")
    .addItem("Auto", 1)
    .addItem("Neo", 2)
    .setOpen(false)
    ;
  cp5ConfigMenu.setVisible(false);
  cp5ConfigMenu.setBroadcast(true);
}

void defaultMode() {

  cp5MainMenu.getController("Play").setImages(buttonPng[0][0], buttonPng[0][1], buttonPng[0][2]);
  cp5MainMenu.getController("Play").setPosition(cp5PosX, 250);

  cp5MainMenu.getController("Config").setImages(buttonPng[1][0], buttonPng[1][1], buttonPng[1][2]);
  cp5MainMenu.getController("Config").setPosition(cp5PosX, 400);

  cp5MainMenu.getController("Exit").setImages(buttonPng[2][0], buttonPng[2][1], buttonPng[2][2]);
  cp5MainMenu.getController("Exit").setPosition(cp5PosX, 550);

  cp5GameExit.getController("X").setImages(buttonPng[3][0], buttonPng[3][1], buttonPng[3][2]);
}

void colorModeOn() {

  cp5MainMenu.getController("Play").setImages(buttonPng[0][0], buttonPng[0][1], buttonPng[0][2]);
  cp5MainMenu.getController("Play").setPosition(cp5PosX, 250);

  cp5MainMenu.getController("Config").setImages(buttonPng[1][0], buttonPng[1][1], buttonPng[1][2]);
  cp5MainMenu.getController("Config").setPosition(cp5PosX, 400);

  cp5MainMenu.getController("Exit").setImages(buttonPng[2][0], buttonPng[2][1], buttonPng[2][2]);
  cp5MainMenu.getController("Exit").setPosition(cp5PosX, 550);

  cp5GameExit.getController("X").setImages(buttonPng[3][0], buttonPng[3][1], buttonPng[3][2]);
}
//------------------------------------------  EVENTOS
public void Play() {
  mainState = Play;
}
public void Config() {
  mainState = Config;
}

public void X() {
  mainState= Mainmenu;
}
public void Exit() {
  mainState = Exit;
}
//----------------------------------------- MODOS

void controlEvent (ControlEvent theEvent) {
  switch(int(theEvent.getController().getId())) {
    case (1):
    switch(int(theEvent.getController().getValue())) {
      case(0):
      buttonsImages();
      defaultMode();
      break;
      case(1):
      buttonsImagesTwo();
      colorModeOn();
      break;
    }
    case(2):
    switch(int(theEvent.getController().getValue())) {
      case (0):
      menuMusic.rewind();
      menuMusic2.pause();
      menuMusic.play();
      break;
      case(1):
      menuMusic.pause();
      menuMusic2.play();
      menuMusic2.rewind();
      break;      
    }
  }
}

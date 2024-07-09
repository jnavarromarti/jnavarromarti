/*Creamos la clase principal que trabajará con nuestra clase Clock, esta clase Timer nos ayudará a calcular el tiempo,
resetear el crnometro cuando avancemos de fase, el start y el fin del cronometro, etc.*/

class Timer {
  int startinTime= 5;
  boolean count= false;
  int actualTime= startinTime;
  void reset() {
    count=false;
    actualTime= startinTime;
  }
  void update (int millis) {
    if (count) {
      actualTime += millis;
    }
  }
  void start (boolean trigger) {
    count=trigger;
  }
  void stopCount() {
    startinTime =0;
    count=false;
    actualTime=startinTime;
  }
  int getSeg() {
    return (actualTime/1000);
  }
}

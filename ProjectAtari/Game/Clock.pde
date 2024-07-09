/* Creamos una clase Clock junto a la clase Timer, 
esta calcula el tiempo que ha pasado gracias a la funcion update y guarda el resultado el milesimas,
por ultimo definimos el getsavetime que nos devuelve el tiempo almacenado en millis*/
class Clock {
  int new_time;
  int old_time;
  int save_time;
  float count;
  Clock() {
    new_time=0;
    old_time=0;
    save_time=0;
  }
  void update() {
    new_time=millis();
    save_time= new_time - old_time;
    old_time= new_time;
  }
  int getSaveTime() {
    return save_time;
  }
}

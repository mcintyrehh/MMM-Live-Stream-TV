int adcValue;
int ledPin = 9;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);       // initialize the serial port and set baud rate to 9600
  Serial.println("UNO is ready!");
}

void loop() {
  adcValue = analogRead(A0);
  //map analog to the 0-255 range, and works as PWM duty cycle of ledPin port
  analogWrite(ledPin, map(adcValue, 0, 1023, 0, 255));
  // Send the result to computer through serial
  Serial.print("[sensor:Potentiometer:");
  Serial.println(map(adcValue, 0, 1023, 0, 10));
  delay(500);
}

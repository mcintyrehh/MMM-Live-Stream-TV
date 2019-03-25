int adcValue;
int ledPin = 9;
volatile int32_t m_counter = 0;
bool WasStarted = false;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);       // initialize the serial port and set baud rate to 9600
  while(!Serial);

  Serial.println("[status:setup:starting]");
  
  int test = 1;
  m_counter = test;

  if (test > 1) {
    WasStarted = false;
    Serial.println("[status:setup:failed]");
    return;    
  }

  delay(3000);
  WasStarted = true;
  Serial.println("[status:setup:started]");
  delay(100);
}

void loop() {
  adcValue = analogRead(A0);
  //map analog to the 0-255 range, and works as PWM duty cycle of ledPin port
  analogWrite(ledPin, map(adcValue, 0, 1023, 0, 255));
  // Send the result to computer through serial
  Serial.print("[sensor:PTNM:");
  Serial.print(map(adcValue, 0, 1023, 0, 10));
  Serial.println("]");
  
  delay(1000);
}

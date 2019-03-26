int adcValue;
int ledPin = 9;
int currentChannel = 0;
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
  // value of the potentiometer from 0->1023
  adcValue = analogRead(A0);
  // sets a new channel variable, we will use this to check to see if it is different than the current channel
  int newChannel = map(adcValue, 0, 1023, 0, 10);
  // map analog to the 0-255 range, and works as PWM duty cycle of ledPin port
  analogWrite(ledPin, map(adcValue, 0, 1023, 0, 255));  // this is just for visual confirmation the potentiometer is working
  if (newChannel != currentChannel) {
    // Send the result to computer through serial (formatted for ArduinoPort)
    Serial.print("[sensor:PTNM:");
    Serial.print(map(adcValue, 0, 1023, 0, 10));
    Serial.println("]");
    currentChannel = newChannel;   // saves the new channel state
  };
  
  delay(100);
}

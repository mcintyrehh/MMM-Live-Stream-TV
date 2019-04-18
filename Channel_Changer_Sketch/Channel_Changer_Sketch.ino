int adcValue;
int ledPin = 9;       // **Comment out astrix'd lines to remove LED, its just for visual confirmation that the potentiometer is working (needs to be a PWM pin!!!)
int currentChannel = 0;
volatile int32_t m_counter = 0;
bool WasStarted = false;

void setup() {
  pinMode(ledPin, OUTPUT);  // ** Comment out to remove LED
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
  adcValue = analogRead(A0);                            // sets a new channel variable, we will use this to check to see if it is different than the current channel
  int newChannel = map(adcValue, 0, 1023, 0, 10);       // maps the value received from the potentiometer from 0->1023 to the 10 channels (could be 0, 9 but mapping to 10 gives a little more room for the last channel)
  analogWrite(ledPin, map(adcValue, 0, 1023, 0, 255));  // **Comment out to remove LED // map analog to the 0-255 range, and works as PWM duty cycle of ledPin port
  if (newChannel != currentChannel) {                   // If the channel is indeed new, send the result to computer through serial (formatted for ArduinoPort)
    Serial.print("[sensor:Potentiometer:");
    Serial.print(newChannel);
    Serial.println("]");
    currentChannel = newChannel;   // saves the new channel statelol 
  };
  delay(500);
}

# MMM-Live-Stream-TV
MagicMirror² Module (MMM) for displaying HLS live feeds on your mirror

...BUT WAIT!! Theres more!

Now with Arduino powered channel changing! Clone this repo today and get two arduino sketches for changing the channel with either a potentiometer OR a 10 switch rotary encoder!

![Example Gif](./Screenshots/SlideshowLoop.gif)
Example of the Slideshow function, set to 6 second channel changes 

**these feeds are from EarthCam.com and ONLY to be used for personal art projects like the Magic Mirror*

## Installation

In your terminal, go to your MagicMirror's Module folder:

```bash
cd ~/MagicMirror/modules
```
Clone this repository:
```bash
git clone https://github.com/mcintyrehh/MMM-Live-Stream-TV.git
```
Configure the module in your config.js file.

## Using the module

To use this module, add it to the modules array in your config.js file.

```js
modules: [
   {
      module: 'MMM-Live-Stream-TV',
      position: 'bottom_center',
      config: {
        portname: "/dev/ttyACM0",
        style: "tv",  // Options: tv, slideshow, static
        sensors: [
          {
            name: "Potentiometer",
            description: "Potentiometer Value",
          }
        ]
      },
   }
]
```

## Configuration Options

Option|Description
------|-----------
`portname`|The name/location of the port your Arduino is connected to<br/>**Expected Value type:** `Windows will be COM#, RasPi will be something like /dev/ttyACM#`
`style`|Which display method you want<br/>**Expected Value type:** `"tv", "slideshow", "static"`

## Setting up the Arduino

Plug in your arduino and figure out what port it is connected to with the following command:

```bash
ls ~/dev/tty*
```

The serial port should be '/dev/ttyACM0', but it could have a different name.  If you aren't sure, unplug the arduino run the command again and see which one dissapears.

### Schematic Diagram/Hardware Connection

![Schematic Diagram/Hardware Connection Image](./Screenshots/Schematics-Potentiometer.png)

The LED is only there as an easy way to let you know the potentiometer is working, just take out the resister/LED/data/power wire and comment out the astrix'd (`**`) lines in the arduino sketch

```c++
void loop() {
  // value of the potentiometer from 0->1023
  adcValue = analogRead(A0);
  // sets a new channel variable, we will use this to check to see if it is different than the current channel
  // maps the value received from the potentiometer from 0->1023 to the 10 channels (could be 0, 9 but mapping to 10 gives a little more room for the last channel)
  int newChannel = map(adcValue, 0, 1023, 0, 10);
  // map analog value to the 0-255 range, works as PWM duty cycle of ledPin port
  analogWrite(ledPin, map(adcValue, 0, 1023, 0, 255));  // **Comment out to remove LED
  if (newChannel != currentChannel) {
    // If the channel is indeed new, send the result to computer through serial (formatted for ArduinoPort)
    Serial.print("[sensor:Potentiometer:");
    Serial.print(map(adcValue, 0, 1023, 0, 10));
    Serial.println("]");
    currentChannel = newChannel;   // saves the new channel state
  };
}
```
The name in `Serial.print("[sensor:Potentiometer:");` needs to be the same as in your config "Sensors" name

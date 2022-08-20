import time
from machine import ADC, Pin, Timer

switch_pin  = 8  # GP8
pot_pin     = 26 # GP26
rot_enc_pin = 27 # GP27
led_pin     = 25 # Onboard LED

power_switch   = Pin(switch_pin, Pin.IN, Pin.PULL_UP) # Digital Switch
potentiometer  = ADC(Pin(26))                         # Anolog Potentiometer
rotary_encoder = ADC(Pin(27))                         # Analog 10 Step Rotary Encoder
led            = Pin(led_pin, Pin.OUT)

print("[status:setup:starting]")

def get_volume(adc: ADC, volume_increments: int):
    """"Read raw analog value from ADC object and return an percentage

    Parameters
    ----------
    values : ADC
        Python iterable whose values are summed.

    Returns
    -------
    sum : `float`
        Sum of ``values``.
    """
    percentage = adc.read_u16() / 65536
    percentage_in_increments = int(percentage * 100/volume_increments) * volume_increments / 100
    
    return round(percentage_in_increments, 2)

timer = Timer()
power = power_switch.value() == 1

def power_toggle(timer):
    global power
    power = not power

def debounce(pin):
    timer.init(mode=Timer.ONE_SHOT, period=200, callback=power_toggle)

power_switch.irq(handler=debounce, trigger=Pin.IRQ_FALLING)

def get_channel(adc):
    return int((adc.read_u16() / 65536) * 10)

cached_switch  = power_switch.value() == 1
cached_volume  = get_volume(potentiometer,3)
cached_channel = get_channel(rotary_encoder)


while True:
    #switch
    if cached_switch is not power:
        cached_switch = power
        if power:
            print("[__sensor:Power:On]")
        else:
            print("[__sensor:Power:Off]")

    #potentiometer
    curr_volume = get_volume(potentiometer,3)
    if cached_volume != curr_volume:
        cached_volume = curr_volume;
        print("[__sensor:Volume:{curr_volume}]")

    #rotary encoder
    curr_channel = get_channel(rotary_encoder)
    if cached_channel is not curr_channel:
        cached_channel = curr_channel
        print("[sensor:Potentiometer:{curr_channel}]")
    
    # toggle led to show its working
    led.toggle()
    time.sleep(0.1)

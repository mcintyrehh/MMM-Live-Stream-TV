import time
import math

import machine
print(dir(machine))
# import analogio
# import digitalio

# switch_pin  = board.D10
# pot_pin     = board.A3
# rot_enc_pin = board.A1

# switch = digitalio.DigitalInOut(switch_pin)
# switch.direction = digitalio.Direction.INPUT
# switch.pull = digitalio.Pull.UP

# potentiometer = analogio.AnalogIn(pot_pin)

# rotary_encoder = analogio.AnalogIn(rot_enc_pin)

# def get_voltage(pin):
#     voltage = (pin.value * 3.3) / 65536
#     return round(voltage / 3.3, 2)

# def get_channel(pin):
#     return int((rotary_encoder.value / 65536) * 10)

# cached_switch         = switch.value == True
# cached_volume         = get_voltage(potentiometer)
# cached_channel        = rotary_encoder.value

# while True:
#     #switch
#     if cached_switch is not switch.value:
#         cached_switch = switch.value
#         if switch.value:
#             print("Power On")
#         else:
#             print("Power Off")

#     #potentiometer
#     curr_volume = get_voltage(potentiometer)
#     if cached_volume is not curr_volume:
#         cached_volume = curr_volume;
#         print("Volume: ", curr_volume)

#     #rotary encoder
#     curr_channel = get_channel(rotary_encoder)
#     if cached_channel is not curr_channel:
#         cached_channel = curr_channel
#         #print("rotary_encoder.reference_voltage: ", rotary_encoder.reference_voltage)
#         print("Channel: ", curr_channel)
#     time.sleep(0.1)

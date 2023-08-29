"""
Generating timing delays in minute increments.
Busy mode has 3 "legs", each of which has 3 slots for tasks = 9 play delays needed.
A pesudorandom delay is composed of 3 random minute slots for each leg(1/3 of session duration w/o start delay).
Start delay is used to generate start delay in combination with random minute start delays.
"""

from .leg_utils import divide_into_legs, get_random_from_leg


def busy_mode_timing_stack(data):

    ss_delay = data['start_delay']
    ss_duration = data['session_duration']
    
    leg1, leg2, leg3 = divide_into_legs(ss_duration)
    
    task_delays_leg1 = [ss_delay + minute for minute in get_random_from_leg(leg1, count=3)]
    task_delays_leg2 = [ss_delay + minute for minute in get_random_from_leg(leg2, count=3)]
    task_delays_leg3 = [ss_delay + minute for minute in get_random_from_leg(leg3, count=3)]
    
    delay_1, delay_2, delay_3 = task_delays_leg1
    delay_4, delay_5, delay_6 = task_delays_leg2
    delay_7, delay_8, delay_9 = task_delays_leg3

    return delay_1, delay_2, delay_3, delay_4, delay_5, delay_6, delay_7, delay_8, delay_9

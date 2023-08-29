"""
Generating timing delays in minute increments.
Surprise mode has 3 "legs", each of which has 1 slot for tasks = 3 play delays needed.
A pesudorandom delay is composed of 1 random minute slot for each leg(1/3 of session duration w/o start delay).
Start delay is used to generate start delay in combination with random minute start delays.
"""

from leg_utils import divide_into_legs, get_random_from_leg


def surprise_mode_timing_stack(data):

    st_delay = data['start_delay']
    ss_duration = data['session_duration']
    
    leg1, leg2, leg3 = divide_into_legs(ss_duration)
    
    task_1_delay = st_delay + get_random_from_leg(leg1)[0]
    task_2_delay = st_delay + get_random_from_leg(leg2)[0]
    task_3_delay = st_delay + get_random_from_leg(leg3)[0]
    
    return task_1_delay, task_2_delay, task_3_delay
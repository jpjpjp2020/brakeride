from leg_utils import divide_into_legs, get_random_from_leg


def surprise_mode_timing_stack(data):

    ss_delay = data['start_delay']
    ss_duration = data['session_duration']
    
    leg1, leg2, leg3 = divide_into_legs(ss_duration)
    
    task_1_delay = ss_delay + get_random_from_leg(leg1)[0]
    task_2_delay = ss_delay + get_random_from_leg(leg2)[0]
    task_3_delay = ss_delay + get_random_from_leg(leg3)[0]
    
    return task_1_delay, task_2_delay, task_3_delay
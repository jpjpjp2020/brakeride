from dashboard.forms import DashboardForm
import random


def divide_into_legs(session_duration):
    all_minutes = list(range(1, session_duration + 1))
    leg_size = len(all_minutes) // 3
    leg1 = all_minutes[:leg_size]
    leg2 = all_minutes[leg_size: 2*leg_size]
    leg3 = all_minutes[2*leg_size:]
    return leg1, leg2, leg3


def get_random_from_leg(leg, count=1):
    return random.sample(leg, count)


def surprise_mode_timing_stack(data):

    ss_delay = data['start_delay']
    ss_duration = data['session_duration']
    
    leg1, leg2, leg3 = divide_into_legs(ss_duration)
    
    task_1_delay = ss_delay + get_random_from_leg(leg1)[0]
    task_2_delay = ss_delay + get_random_from_leg(leg2)[0]
    task_3_delay = ss_delay + get_random_from_leg(leg3)[0]
    
    return task_1_delay, task_2_delay, task_3_delay
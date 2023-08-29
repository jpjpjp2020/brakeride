"""
Functions used by busy_utils and surprise_utils.
divide_into_legs generates minute slots for 3 legs.
get_random_from_leg grabs random minute slots per leg.
"""

import random


def divide_into_legs(session_duration):
    session_duration = int(session_duration)  # type check
    all_minutes = list(range(1, session_duration + 1))
    leg_size = len(all_minutes) // 3
    leg1 = all_minutes[:leg_size]
    leg2 = all_minutes[leg_size: 2*leg_size]
    leg3 = all_minutes[2*leg_size:]
    return leg1, leg2, leg3


def get_random_from_leg(leg, count=1):
    return random.sample(leg, count)
"""
Combining generated timing slots and exercise composition into a session stack.
Timing slots depend on mode selection and exercise composition from practice selection.
Session stack and audio cues are combined into a play stack on the view level.
"""

from .emergency_utils import get_emergency_tasks
from .city_traffic_utils import get_city_traffic_tasks
from .busy_utils import busy_mode_timing_stack
from .surprise_utils import surprise_mode_timing_stack


def generate_session_stack(data):

    session_timing_slots = None
    session_exercises = None

    if data["mode"] == "BM":
        session_timing_slots = busy_mode_timing_stack(data)

        if data["practice"] == "EP":
            session_exercises = get_emergency_tasks(data, count=3)
        elif data["practice"] == "CT":
            session_exercises = get_city_traffic_tasks(data, count=3)
    
    elif data["mode"] == "SM":
        session_timing_slots = surprise_mode_timing_stack(data)

        if data["practice"] == "EP":
            session_exercises =  get_emergency_tasks(data)
        elif data["practice"] == "CT":
            session_exercises = get_city_traffic_tasks(data)

    
    if not session_timing_slots or not session_exercises:
        raise ValueError("Invalid combination of mode and practice.")

    return sorted(list(zip(session_timing_slots, session_exercises)), key=lambda x: x[0])
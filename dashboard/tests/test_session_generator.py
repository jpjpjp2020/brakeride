"""
Manual testing for session stack output
"""

from ..utilities.session_generator import generate_session_stack
# from utilities.busy_utils import busy_mode_timing_stack
# from utilities.surprise_utils import surprise_mode_timing_stack
# from utilities.emergency_utils import get_emergency_tasks
# from utilities.city_traffic_utils import get_city_traffic_tasks


data = {
    'start_delay': 1,
    'session_duration': 15,
    'practice': 'CT',
    'ct_exercises': ['spot_and_find', 'spot_a_hazard'],
    'mode': 'BM',
}

# print (get_emergency_tasks(data, count=3))
# print (get_city_traffic_tasks(data))
# print(busy_mode_timing_stack(data))
# print(surprise_mode_timing_stack(data))
print(generate_session_stack(data))
"""
Manual testing for session stack output
"""

from utilities.session_generator import generate_session_stack
from utilities.busy_utils import busy_mode_timing_stack
from utilities.surprise_utils import surprise_mode_timing_stack


data = {
    'start_delay': 5,
    'session_duration': 30,
    'practice': 'CT',
    'ct_exercises': ['spot_a_hazard', 'find_an_escape', 'spot_and_find'],
    'mode': 'BM',
}

print(busy_mode_timing_stack(data))
# print(surprise_mode_timing_stack(data))
# print(generate_session_stack(data))
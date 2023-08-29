"""
User exercise choices from 3 possible city traffic exercises populated into 3 "slots".
get_emergency_tasks then used in session generator to fill task slots for a session stack.
"""

from .stack_task_utils import stack_tasks


def get_city_traffic_tasks(data, count=1):

    ct_exercises = data['ct_exercises']

    return stack_tasks(ct_exercises)
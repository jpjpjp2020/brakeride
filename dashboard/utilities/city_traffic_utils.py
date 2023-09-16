"""
User exercise choices from 3 possible city traffic exercises populated into 3 "slots".
For busy mode output is 3x-d.
get_get_city_traffic_tasks then used in session generator to fill task slots for a session stack.
"""

from .stack_task_utils import stack_tasks


def get_city_traffic_tasks(data, count=1):

    ct_exercises = data.getlist('ct_exercises[]')
    tasks = []

    for _ in range(count):
        tasks.extend(stack_tasks(ct_exercises))

    return tasks
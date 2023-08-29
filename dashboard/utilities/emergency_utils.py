"""
User exercise choices from 3 possible emergency exercises populated into 3 "slots".
For busy mode output is 3x-d.
get_emergency_tasks then used in session generator to fill task slots for a session stack.
"""

from .stack_task_utils import stack_tasks


def get_emergency_tasks(data, count=1):

    ep_exercises = data['ep_exercises']
    tasks = []

    for _ in range(count):
        tasks.extend(stack_tasks(ep_exercises))

    return tasks
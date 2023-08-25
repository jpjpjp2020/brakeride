# combining user choices into a play stack
# rough

from stack_task_utils import stack_tasks
from busy_utils import busy_mode_timing_stack
from surprise_utils import surprise_mode_timing_stack

def generate_session_schedule(data, exercises):
    """
    
    """

    task_stack = stack_tasks(exercises)

    if data["mode"] == "BM":
        timings = busy_mode_timing_stack(data)
    else:
        timings = surprise_mode_timing_stack(data)

    # Combine task_stack with timings
    session_schedule = list(zip(task_stack, timings))

    return session_schedule


# + also a diagram for the flow 
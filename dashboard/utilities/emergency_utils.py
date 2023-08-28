from stack_task_utils import stack_tasks


def get_emergency_tasks(user_choices):

    ep_exercises = user_choices['ep_exercises']

    return stack_tasks(ep_exercises)
from stack_task_utils import stack_tasks


def get_city_traffic_tasks(user_choices):

    ct_exercises = user_choices['ct_exercises']

    return stack_tasks(ct_exercises)
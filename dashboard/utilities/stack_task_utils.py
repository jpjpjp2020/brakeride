import random

def stack_tasks(exercises):
    
    if len(exercises) == 1:
        return [exercises[0], exercises[0], exercises[0]]

    if len(exercises) == 2:
        double_task = random.choice(exercises)
        exercises.remove(double_task)
        single_task = exercises[0]
        tasks = [double_task, double_task, single_task]
        random.shuffle(tasks)
        return tasks

    if len(exercises) == 3:
        random.shuffle(exercises)
        return exercises

    # Additional safety return. *Shouldn't be reached.
    return [None, None, None]
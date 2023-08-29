"""
stack_tasks generates a composition for tasks - used in emergency and city traffic utils.
Busy mode needs 3 tasks per leg; Surprise mode needs 1 task per leg.
A session always has 3 legs.
Emergency practice and City Traffic practice have 3 excercises (A,B,C).
stack_tasks populates 3 tasks by user selection:
User only chose A: 3 tasks would be A A A
User chose A and C: 3 tasks could be C A C, or C A A, etc.
User chose all: 3 tasks could be: A B C, or B A C, etc.
Need a copy of the list to avoid messing up the underlying list on reruns to generate Busy mode task stacks.
"""

import random

def stack_tasks(exercises):

    exercises_copy = exercises.copy()
    
    if len(exercises) == 1:
        return [exercises[0], exercises[0], exercises[0]]

    if len(exercises) == 2:
        double_task = random.choice(exercises_copy)
        exercises_copy.remove(double_task)
        single_task = exercises_copy[0]
        tasks = [double_task, double_task, single_task]
        random.shuffle(tasks)
        return tasks

    if len(exercises_copy) == 3:
        random.shuffle(exercises_copy)
        return exercises_copy

    # Additional safety return. *Shouldn't be reached.
    return [None, None, None]
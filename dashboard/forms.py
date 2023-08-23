from django import forms

class DashboardForm(forms.Form):
    PRACTICE_CHOICES = (
        ('EP', 'Emergency Practice'),
        ('CT', 'City Traffic'),
    )

    EP_EXERCISE_CHOICES = (
        ('brake', 'Brake'),
        ('swerve_right', 'Swerve right'),
        ('swerve_left', 'Swerve left'),
    )

    CT_EXERCISE_CHOICES = (
        ('spot_a_hazard', 'Spot a hazard'),
        ('find_an_escape', 'Find an escape'),
        ('spot_and_find', 'Spot a hazard and find an escape'),
    )
    
    DURATION_CHOICES = (
        (15, '15 minutes'),
        (30, '30 minutes'),
        (60, '1 hour'),
    )

    START_DELAY_OPTIONS = (
        (1, '1 minute'),
        (5, '5 minutes'),
        (15, '15 minutes'),
    )

    MODE_CHOICES = (
        ('BM', 'Busy Mode'),
        ('SM', 'Surprise Mode'),
    )
    
    mode = forms.ChoiceField(choices=PRACTICE_CHOICES, required=True)
    session_duration = forms.ChoiceField(choices=DURATION_CHOICES, required=True)

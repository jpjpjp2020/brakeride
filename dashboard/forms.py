from django import forms
from django.core.exceptions import ValidationError


class DashboardForm(forms.Form):
    PRACTICE_CHOICES = (
        ('EP', 'Emergency Practice'),
        ('CT', 'City Traffic Practice'),
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
    
    practice = forms.ChoiceField(choices=PRACTICE_CHOICES, required=True)
    
    ep_exercises = forms.MultipleChoiceField(
        choices=EP_EXERCISE_CHOICES,
        widget=forms.CheckboxSelectMultiple,
        required=False
    )

    ct_exercises = forms.MultipleChoiceField(
        choices=CT_EXERCISE_CHOICES,
        widget=forms.CheckboxSelectMultiple,
        required=False
    )
    
    session_duration = forms.ChoiceField(choices=DURATION_CHOICES, required=True)

    start_delay = forms.ChoiceField(choices=START_DELAY_OPTIONS, required=True)

    mode = forms.ChoiceField(choices=MODE_CHOICES, required=True)

    def clean(self):
        cleaned_data = super().clean()

        practice = cleaned_data.get('practice')
        ep_exercises = cleaned_data.get('ep_exercises')
        ct_exercises = cleaned_data.get('ct_exercises')

        if practice == 'EP' and not ep_exercises:
            self.add_error('ep_exercises', "Please select at least one exercise.")

        if practice == 'CT' and not ct_exercises:
            self.add_error('ct_exercises', "Please select at least one exercise.")


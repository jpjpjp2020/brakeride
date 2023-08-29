"""
Manual testing for sesson stack generation + form validation
"""
import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'brakeride.settings')
django.setup()

from ..utilities.session_generator import generate_session_stack
from ..forms import DashboardForm

data = {
    'start_delay': 15,
    'session_duration': 60,
    'practice': 'EP',
    'ep_exercises': ['brake'],
    'mode': 'BM',
}

form = DashboardForm(data)

if form.is_valid():
    cleaned_data = form.cleaned_data
    print(generate_session_stack(cleaned_data))
else:
    print("Form is not valid")
    print(form.errors)
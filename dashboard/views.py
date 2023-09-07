from django.shortcuts import render, redirect
from dashboard.forms import DashboardForm
from datetime import datetime, timedelta
from .utilities.session_generator import generate_session_stack
from django.http import JsonResponse


def dashboard_view(request):
    
    if request.method == 'POST':
        form = DashboardForm(request.POST)

        if form.is_valid():
            request.session['user_choices'] = form.cleaned_data

            return redirect('play_stack_view')
        
    else:
        form = DashboardForm()

    return render(request, 'dashboard/dashboard.html', {'form': form})


# Combine play stack with timedelta and audio cues + add countdown timer
# add timedelta logic after form handling is set up
def play_stack_view(request):
    user_choices = request.session.get('user_choices')
    if not user_choices:
        return redirect('dashboard_view')
    
    play_stack = generate_session_stack(user_choices)


def api_endpoint(request):
    if request.method == 'POST':
        form = DashboardForm(request.POST)
        if form.is_valid():
            # Your logic here
            return JsonResponse({'message': 'Successfull setup'})
        else:
            return JsonResponse({'message': 'Sorry! Setup failed'})
        

def play_view(request):
    return render(request, 'dashboard/response_play.html')
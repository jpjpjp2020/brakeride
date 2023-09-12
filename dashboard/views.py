from django.shortcuts import render, redirect
from dashboard.forms import DashboardForm
from datetime import datetime, timedelta
from .utilities.session_generator import generate_session_stack
from django.http import JsonResponse
import logging
from django.urls import reverse


def dashboard_view(request):
    form = DashboardForm()
    
    if request.method == 'POST':
        form = DashboardForm(request.POST)

        if form.is_valid():
            request.session['user_choices'] = form.cleaned_data

            return redirect('play__view')
        
    else:
        form = DashboardForm()

    return render(request, 'dashboard/dashboard.html', {'form': form})
        

def api_endpoint(request):
    if request.method == 'POST':
        try:
            data = request.POST
            validate_data(data)
            session_stack = generate_session_stack(data)

            # session_stack ja audio cues logic siia.
            # pärast processingut Json

            return JsonResponse({
                "success": True,
                "redirect_url": reverse('play')
            })

        except ValueError as e:
            logging.error(f"Validation Error: {str(e)}")

            user_friendly_message = "There was an error processing your request. Please try again."
            return JsonResponse({"success": False, "error": user_friendly_message})


# back-end validation
def validate_data(data):
    if not isinstance(data, dict):
        raise ValueError("Data is not a dictionary")
    
    valid_modes = ["BM", "SM"]
    if data.get("mode") not in valid_modes:
        raise ValueError(f"Invalid mode: {data.get('mode')}")
    
    valid_practices = ["EP", "CT"]
    if data.get("practice") not in valid_practices:
        raise ValueError(f"Invalid practice: {data.get('practice')}")
    
    if not isinstance(data.get("exercises"), list) or not data.get("exercises"):
        raise ValueError("Exercises list cannot be empty")
    
    if not isinstance(data.get("session_duration"), int) or not isinstance(data.get("start_delay"), int):
        raise ValueError("session_duration and start_delay must be ints")
    
    return True


def play_view(request):
    return render(request, 'dashboard/response_play.html')
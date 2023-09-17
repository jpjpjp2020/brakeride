from django.shortcuts import render, redirect
from dashboard.forms import DashboardForm
from datetime import datetime, timedelta
from .utilities.session_generator import generate_session_stack
from .utilities.audio_utils import AUDIO_ACTIONS
from django.http import JsonResponse
import logging
from django.urls import reverse


def dashboard_view(request):
    form = DashboardForm()

    return render(request, 'dashboard/dashboard.html', {'form': form})
        

def api_endpoint(request):
    if request.method == 'POST':
        try:
            data = request.POST

            validate_data(data)
            session_stack = generate_session_stack(data)
            final_play = audio_play_stack(session_stack)
            session_duration = data.get('session_duration', 30)
            start_delay = data.get('start_delay', 5)
            
            # *initialize session storage - no real db reliance:
            request.session['final_play'] = final_play
            request.session['session_duration'] = session_duration
            request.session['start_delay'] = start_delay

            return JsonResponse({
                "success": True,
                "redirect_url": reverse('dashboard:play'),
            })

        except ValueError as e:
            logging.error(f"Validation Error: {str(e)}")

            user_friendly_message = "There was an error processing your request. Please try again."
            return JsonResponse({"success": False, "error": user_friendly_message})


# keep play_end separate - this can be called in play_view
def audio_play_stack(session_stack):
    
    audio_cues = []
    for delay, task in session_stack:
        # play_time = datetime.now() + timedelta(minutes=int(delay))
        play_time = (datetime.now() + timedelta(minutes=int(delay))).strftime('%Y-%m-%d %H:%M:%S')
        audio_file = AUDIO_ACTIONS.get(task, '')
        audio_cues.append({'play_time': play_time, 'audio_file': audio_file})

    return audio_cues


# back-end validation
def validate_data(data):

    if not isinstance(data, dict):
        raise ValueError("Data is not a dictionary")
    
    valid_modes = ["BM", "SM"]
    if data.get("mode") not in valid_modes:
        raise ValueError(f"Invalid mode: {data.get('mode')}")
    
    valid_practices = ["EP", "CT"]
    practice_mode = data.get("practice")
    if practice_mode not in valid_practices:
        raise ValueError(f"Invalid practice: {practice_mode}")

    ep_exercises = data.getlist('ep_exercises[]', [])
    ct_exercises = data.getlist('ct_exercises[]', [])

    if practice_mode == "EP" and not ep_exercises:
        raise ValueError("EP exercises list cannot be empty")

    if practice_mode == "CT" and not ct_exercises:
        raise ValueError("CT exercises list cannot be empty")
    
    try:
        session_duration = int(data.get("session_duration"))
        start_delay = int(data.get("start_delay"))
    except ValueError:
        raise ValueError("session_duration and start_delay must be valid integers")

    return True


def play_view(request):
    final_play = request.session.get('final_play', [])
    
    session_duration_minutes = int(request.session.get('session_duration', 30))
    delay_before_start_seconds = int(request.session.get('start_delay', 5)) * 60

    session_length = session_duration_minutes * 60 + delay_before_start_seconds
    context = {
        'final_play': final_play, 
        'session_length': session_length,
        'start_audio': AUDIO_ACTIONS['start'],
        'end_audio': AUDIO_ACTIONS['end']
    }

    return render(request, 'dashboard/response_play.html', context)


def end_session(request):
    request.session.flush()
    return JsonResponse({"success": True})
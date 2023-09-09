from django.shortcuts import render, redirect
from dashboard.forms import DashboardForm
from datetime import datetime, timedelta
from .utilities.session_generator import generate_session_stack
from django.http import JsonResponse


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


# def api_endpoint(request):
#     if request.method == 'POST':
#         form = DashboardForm(request.POST)
#         if form.is_valid():
#             return JsonResponse({'message': 'Successfull setup'})
#         else:
#             return JsonResponse({'message': 'Sorry! Setup failed'})
        

def api_endpoint(request):
    if request.method == 'POST':
        form = DashboardForm(request.POST)
        if form.is_valid():
            return JsonResponse({'message': 'Successfull setup'})
        if not form.is_valid():
            print(form.errors)
            return JsonResponse({'message': 'Sorry! Setup failed'})

        

def play_view(request):
    return render(request, 'dashboard/response_play.html')
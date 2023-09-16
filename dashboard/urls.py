from django.urls import path
from . import views
# from .views import api_endpoint, play_view

app_name = 'dashboard'

urlpatterns = [
    path('', views.dashboard_view, name='dashboard'),
    path('api_endpoint/', views.api_endpoint, name='api_endpoint'),
    path('play/', views.play_view, name='play'),
]
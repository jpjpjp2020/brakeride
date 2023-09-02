from django.urls import path
from . import views
from .views import api_endpoint

app_name = 'dashboard'

urlpatterns = [
    path('', views.dashboard_view, name='dashboard'),
    path('api_endpoint/', views.api_endpoint, name='api_endpoint'),
]
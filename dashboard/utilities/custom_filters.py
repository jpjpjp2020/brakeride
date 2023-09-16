"""
Provides play template with the placeholder static value per session length before JS manages to take over to start dynamically counting down the session time. Otherwise, user might see an unmatching value before JS takes over.
"""

from django import template

register = template.Library()

@register.filter
def timeformat(value):
    minutes = value // 60
    seconds = value % 60
    return f"{minutes:02}:{seconds:02}"

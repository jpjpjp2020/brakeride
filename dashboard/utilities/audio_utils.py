"""
All audio cues which will be added to sessions stack tasks on the view level.
"""

AUDIO_ACTIONS = {
    # general audio commands:
    'start': 'audio/start.mp3',
    'end': 'audio/end.mp3',
    # emergency practice audio commands:
    'brake': '/static/audio/brake.mp3',
    'swerve_right': '/static/audio/swerve_right.mp3',
    'swerve_left': '/static/audio/swerve_left.mp3',
    # city/traffic practice audio commands:
    'spot_a_hazard': '/static/audio/spot_a_hazard.mp3',
    'find_an_escape': '/static/audio/find_an_escape.mp3',
    'spot_and_find': '/static/audio/spot_and_find.mp3',
}
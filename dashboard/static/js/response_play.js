const sessionLength = parseInt(document.getElementById('sessionData').dataset.sessionLength, 10);
// debug line next for raw data being passed to JSON.parse()
console.log(document.getElementById('final-play-data').dataset.final);
const finalPlay = JSON.parse(document.getElementById('final-play-data').textContent);
const audioPaths = document.getElementById('audio-paths');
const startAudioPath = audioPaths.dataset.startAudio;
const endAudioPath = audioPaths.dataset.endAudio;


function playStartSound() {
    setTimeout(() => {
        let audio = new Audio(startAudioPath);
        audio.play();
    }, 100);
}
playStartSound();

// countdown timer:
let countdown = sessionLength;
const countdownDisplay = document.getElementById('countdown-display');

setInterval(() => {
    if (countdown <= 0) {
        endSession();
        return;
    }

    countdownDisplay.innerText = formatTime(countdown);
    countdown--;

}, 1000);

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    if (remainingSeconds < 10) {
        remainingSeconds = '0' + remainingSeconds;
    }

    return `${minutes}:${remainingSeconds}`;
}

// How to play:
function playAudio(audioPath) {
    let audio = new Audio(audioPath);
    audio.play();
}

// When to play:
let currentIndex = 0;

function checkNextEvent() {
    const now = new Date();

    if (currentIndex < finalPlay.length && new Date(finalPlay[currentIndex].play_time) <= now) {
        playAudio(finalPlay[currentIndex].audio_file);
        currentIndex++;
        setNextInterval();
    }
}

function setNextInterval() {
    if (currentIndex < finalPlay.length) {
        const timeDiff = new Date(finalPlay[currentIndex].play_time) - new Date();
        setTimeout(checkNextEvent, timeDiff);
    }
}
// initial kick for JS to execute sound playing
setNextInterval();

// End session button:
document.getElementById('end-session').addEventListener('click', endSession);

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrfToken = getCookie('csrftoken');

function endSession() {
    fetch('/end_session/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                let audio = new Audio(endAudioPath);
                audio.play();
                audio.onended = function () {
                    window.location.href = '/';
                };
            } else {
                console.error('Session end failed');
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
}

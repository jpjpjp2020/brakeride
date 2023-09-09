$.ajaxSetup({
    headers: {
        'X-CSRFToken': $('input[name=csrfmiddlewaretoken]').val()
    }
});

let userChoices = {};

function formFlow() {
    const formContainer = document.getElementById('formContainer');
    const formSteps = formContainer.querySelectorAll('.form-step');
    const epChoiceBtn = document.getElementById('ep_choice');
    const ctChoiceBtn = document.getElementById('ct_choice');
    const epExercises = document.getElementById('ep_ex');
    const ctExercises = document.getElementById('ct_ex');
    const singleChoiceButtons = [
        'busy_choice', 'surprise_choice',
        'du15_choice', 'du30_choice', 'du60_choice',
        'de1_choice', 'de5_choice', 'de15_choice'
    ];
    let currentStep = 0;

    function showStep(stepIndex) {
        formSteps.forEach(step => step.classList.remove('active'));
        formSteps[stepIndex].classList.add('active');
    }

    function setDefaultSelectionsForBranch(branch) {
        if (branch === 'ep') {
            $('input[name="ep_exercises"][value="brake"]').prop('checked', true);
            $('input[name="ep_exercises"][value="swerve_right"]').prop('checked', true);
            $('input[name="ep_exercises"][value="swerve_left"]').prop('checked', true);

            $('input[name="ct_exercises"]').prop('checked', false);
        } else if (branch === 'ct') {
            $('input[name="ct_exercises"][value="spot_and_find"]').prop('checked', true);

            $('input[name="ep_exercises"]').prop('checked', false);
        }
    }

    epChoiceBtn.addEventListener('click', () => {
        currentStep++;
        showStep(currentStep);
        epExercises.style.display = 'flex';
        ctExercises.style.display = 'none';
        userChoices.practice = "ep";
        setDefaultSelectionsForBranch('ep');
    });

    ctChoiceBtn.addEventListener('click', () => {
        currentStep++;
        showStep(currentStep);
        ctExercises.style.display = 'flex';
        epExercises.style.display = 'none';
        userChoices.practice = "ct";
        setDefaultSelectionsForBranch('ct');
    });

    formContainer.addEventListener('click', (e) => {
        const target = e.target;

        if (target.id.startsWith('back_to_')) {
            const choiceToDelete = target.getAttribute('data-delete-choice');
            if (choiceToDelete) {
                delete userChoices[choiceToDelete];
            }
            currentStep--;
            showStep(currentStep);
        } else if (target.id === 'to_busy_or_surprise') {
            let selectedExercises;

            if (userChoices.practice === 'ep') {
                selectedExercises = Array.from(document.querySelectorAll('#ep_ex input:checked')).map(input => input.value);
            } else {
                selectedExercises = Array.from(document.querySelectorAll('#ct_ex input:checked')).map(input => input.value);
            }

            if (selectedExercises.length === 0) {
                alert('Please select at least one exercise!');
                return;
            }

            if (userChoices.practice === 'ep') {
                userChoices.ep_exercises = selectedExercises;
            } else {
                userChoices.ct_exercises = selectedExercises;
            }
            currentStep++;
            showStep(currentStep);
        }
    });

    singleChoiceButtons.forEach(btnID => {
        const btn = document.getElementById(btnID);
        if (btn) {
            btn.addEventListener('click', () => {
                currentStep++;
                showStep(currentStep);

                if (btnID.startsWith('du')) {
                    switch (btnID) {
                        case 'du15_choice':
                            userChoices.session_duration = 15;
                            break;
                        case 'du30_choice':
                            userChoices.session_duration = 30;
                            break;
                        case 'du60_choice':
                            userChoices.session_duration = 60;
                            break;
                        default:
                            console.error("Unexpected button ID:", btnID);
                    }
                } else if (btnID.startsWith('de')) {
                    switch (btnID) {
                        case 'de1_choice':
                            userChoices.start_delay = 1;
                            break;
                        case 'de5_choice':
                            userChoices.start_delay = 5;
                            break;
                        case 'de15_choice':
                            userChoices.start_delay = 15;
                            break;
                        default:
                            console.error("Unexpected button ID:", btnID);
                    }
                } else {
                    if (btnID === 'busy_choice') {
                        userChoices.mode = 'BM';
                    } else if (btnID === 'surprise_choice') {
                        userChoices.mode = 'SM';
                    }
                }
            });
        }
    });

    return userChoices;
}

$(document).ready(function () {
    formFlow();

    $('#dashboardForm').on('submit', function (event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('userChoices', JSON.stringify(userChoices));

        console.log("Sending data:", JSON.stringify(userChoices));

        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.redirect_url) {
                    window.location.href = data.redirect_url;
                } else {
                    console.error("Expected redirect_url in the server response, but it was not provided.");
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });
});
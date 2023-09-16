$.ajaxSetup({
    headers: {
        'X-CSRFToken': $('input[name=csrfmiddlewaretoken]').val()
    }
});

(function () {

    const formSteps = document.querySelectorAll('.form-step');

    const userChoices = {
        practice: null,
        ep_exercises: [],
        ct_exercises: [],
        mode: null,
        session_duration: null,
        start_delay: null,
    };

    // explicit flow
    const flowSteps = {
        ep_or_ct: {
            id: "ep_or_ct",
            next: "ep_or_ct_practice_ex_comp",
            prev: null,
        },
        ep_or_ct_practice_ex_comp: {
            id: "ep_or_ct_practice_ex_comp",
            next: "busy_or_surprise",
            prev: "ep_or_ct",
        },
        busy_or_surprise: {
            id: "busy_or_surprise",
            next: "s15_30_60_ses_duration",
            prev: "ep_or_ct_practice_ex_comp",
        },
        s15_30_60_ses_duration: {
            id: "s15_30_60_ses_duration",
            next: "s1_5_15_start_delay",
            prev: "busy_or_surprise",
        },
        s1_5_15_start_delay: {
            id: "s1_5_15_start_delay",
            next: "terms_and_start",
            prev: "s15_30_60_ses_duration",
        },
        terms_and_start: {
            id: "terms_and_start",
            next: null,
            prev: "s1_5_15_start_delay",
        }
    };

    // first view for the user
    let currentState = flowSteps.ep_or_ct;
    showStep("ep_or_ct")

    // base to render form steps to the user 1 at a time - show/hide
    function showStep(stepId) {
        formSteps.forEach(step => step.classList.remove('active'));
        document.getElementById(stepId).classList.add('active');
    }

    function moveToNextState() {
        if (currentState.next) {
            currentState = flowSteps[currentState.next];
            showStep(currentState.id);
        }
    }

    function moveToPreviousState() {
        if (currentState.prev) {
            currentState = flowSteps[currentState.prev];
            showStep(currentState.id);
        }
    }

    function submitForm() {

        $('#loadingSpinner').show();
        const apiUrl = document.getElementById('api-endpoint-url').dataset.url;

        $.ajax({
            url: apiUrl,
            method: "POST",
            data: userChoices,
            success: function (response) {
                $('#loadingSpinner').hide();

                if (response.success) {
                    window.location.href = response.redirect_url;
                } else {
                    alert(response.error);
                }
            },
            error: function (error) {
                $('#loadingSpinner').hide();
                alert('An unexpected error occurred. Please try again.');
            }
        });
    }

    // 1. choices Practice
    document.getElementById("ep_choice").addEventListener("click", function () {
        userChoices.practice = 'EP';
        document.getElementById("ep_ex").style.display = "block";
        document.getElementById("ct_ex").style.display = "none";
        setDefaultSelectionsForBranch('EP');
        moveToNextState();
    });

    document.getElementById("ct_choice").addEventListener("click", function () {
        userChoices.practice = 'CT';
        document.getElementById("ct_ex").style.display = "block";
        document.getElementById("ep_ex").style.display = "none";
        setDefaultSelectionsForBranch('CT');
        moveToNextState();
    });

    // Default values for multiplechoicefields
    function setDefaultSelectionsForBranch(branch) {
        if (branch === 'EP') {
            $('input[name="ep_exercises"][value="brake"]').prop('checked', true);
            $('input[name="ep_exercises"][value="swerve_right"]').prop('checked', true);
            $('input[name="ep_exercises"][value="swerve_left"]').prop('checked', true);

            $('input[name="ct_exercises"]').prop('checked', false);
        } else if (branch === 'CT') {
            $('input[name="ct_exercises"][value="spot_and_find"]').prop('checked', true);

            $('input[name="ep_exercises"]').prop('checked', false);
        }
    }

    //  2. choices Exercises in Practice
    // NB - specify HERE and remove reformatting from session_generator
    document.getElementById("to_busy_or_surprise").addEventListener("click", function () {

        userChoices.ep_exercises = [];
        userChoices.ct_exercises = [];

        let epExercises = document.querySelectorAll('#ep_ex input[type="checkbox"]:checked');
        epExercises.forEach(function (checkbox) {
            userChoices.ep_exercises.push(checkbox.value);
        });

        let ctExercises = document.querySelectorAll('#ct_ex input[type="checkbox"]:checked');
        ctExercises.forEach(function (checkbox) {
            userChoices.ct_exercises.push(checkbox.value);
        });

        // Force at least 1 choice
        if (userChoices.practice === "EP" && userChoices.ep_exercises.length === 0) {
            alert('Please select at least one emergency practice exercise!');
            return;
        } else if (userChoices.practice === "CT" && userChoices.ct_exercises.length === 0) {
            alert('Please select at least one city traffic practice exercise!');
            return;
        }

        moveToNextState();

    });

    // back from 2. Reset Exercises in Practice
    document.getElementById("back_to_ep_ct").addEventListener("click", function () {

        userChoices.ep_exercises = [];
        userChoices.ct_exercises = [];

        let epExercises = document.querySelectorAll('#ep_ex input[type="checkbox"]');
        epExercises.forEach(function (checkbox) {
            checkbox.checked = false;
        });

        let ctExercises = document.querySelectorAll('#ct_ex input[type="checkbox"]');
        ctExercises.forEach(function (checkbox) {
            checkbox.checked = false;
        });

        moveToPreviousState();

    })

    // 3. choices Mode
    document.getElementById("busy_choice").addEventListener("click", function () {
        userChoices.mode = 'BM';
        moveToNextState();
    });

    document.getElementById("surprise_choice").addEventListener("click", function () {
        userChoices.mode = 'SM';
        moveToNextState();
    });

    // back from 3. Reset Step 3 Choice
    document.getElementById("back_to_ex_comp").addEventListener("click", function () {
        delete userChoices.mode;
        moveToPreviousState();
    });

    // 4. choices Session duration
    document.getElementById("du15_choice").addEventListener("click", function () {
        userChoices.session_duration = 15;
        moveToNextState();
    });

    document.getElementById("du30_choice").addEventListener("click", function () {
        userChoices.session_duration = 30;
        moveToNextState();
    });

    document.getElementById("du60_choice").addEventListener("click", function () {
        userChoices.session_duration = 60;
        moveToNextState();
    });

    // back from 4. Reset Step 4 Choice
    document.getElementById("back_to_busy_surprise").addEventListener("click", function () {
        delete userChoices.session_duration;
        moveToPreviousState();
    });

    // 5. choices Start delay
    document.getElementById("de1_choice").addEventListener("click", function () {
        userChoices.start_delay = 1;
        moveToNextState();
    });

    document.getElementById("de5_choice").addEventListener("click", function () {
        userChoices.start_delay = 5;
        moveToNextState();
    });

    document.getElementById("de15_choice").addEventListener("click", function () {
        userChoices.start_delay = 15;
        moveToNextState();
    });

    // back from 5. Reset Step 5 Choice
    document.getElementById("back_to_ses_duration").addEventListener("click", function () {
        delete userChoices.start_delay;
        moveToPreviousState();
    });

    // 6. Submit and start
    document.getElementById("submit_form_start").addEventListener("click", function (e) {
        e.preventDefault();
        submitForm();
    });

    // back from 6. 
    document.getElementById("back_to_start_delay").addEventListener("click", function () {
        moveToPreviousState();
    });

})();

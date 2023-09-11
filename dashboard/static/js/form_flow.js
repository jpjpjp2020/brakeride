$.ajaxSetup({
    headers: {
        'X-CSRFToken': $('input[name=csrfmiddlewaretoken]').val()
    }
});

(function () {

    const formSteps = document.querySelectorAll('.form-step');

    const userChoices = {
        practice: null,
        exercises: [],
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
        console.log("Before moving to next:", currentState);
        if (currentState.next) {
            currentState = flowSteps[currentState.next];
            console.log("After moving to next:", currentState);
            showStep(currentState.id);
        }
    }

    function moveToPreviousState() {
        console.log("Before moving back:", currentState);
        if (currentState.prev) {
            currentState = flowSteps[currentState.prev];
            console.log("After moving back:", currentState);
            showStep(currentState.id);
        }
    }

    function submitForm() {
        $.ajax({
            url: "{% url 'dashboard:api_endpoint' %}",
            method: "POST",
            data: userChoices,
            success: function (response) {
                // also handle success***********************************
            },
            error: function (error) {
                // also handle error***********************************
            }
        });
    }

    // 1. choices Practice
    document.getElementById("ep_choice").addEventListener("click", function () {
        console.log("Choice made at step:", "ep_choice");
        userChoices.practice = 'EP';
        document.getElementById("ep_ex").style.display = "block";
        document.getElementById("ct_ex").style.display = "none";
        setDefaultSelectionsForBranch('EP');
        moveToNextState();
        console.log(userChoices);
    });

    document.getElementById("ct_choice").addEventListener("click", function () {
        console.log("Choice made at step:", "ct_choice");
        userChoices.practice = 'CT';
        document.getElementById("ct_ex").style.display = "block";
        document.getElementById("ep_ex").style.display = "none";
        setDefaultSelectionsForBranch('CT');
        moveToNextState();
        console.log(userChoices);
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
    document.getElementById("to_busy_or_surprise").addEventListener("click", function () {

        console.log("Choice made at step:", "to_busy_or_surprise");
        userChoices.exercises = [];

        let epExercises = document.querySelectorAll('#ep_ex input[type="checkbox"]:checked');
        epExercises.forEach(function (checkbox) {
            userChoices.exercises.push(checkbox.value);
        });

        let ctExercises = document.querySelectorAll('#ct_ex input[type="checkbox"]:checked');
        ctExercises.forEach(function (checkbox) {
            userChoices.exercises.push(checkbox.value);
        });

        // Force at least 1 choice
        if (userChoices.exercises.length === 0) {
            alert('Please select at least one exercise!');
            return;
        }

        moveToNextState();
        console.log(userChoices)

    });

    // back from 2. Reset Exercises in Practice
    document.getElementById("back_to_ep_ct").addEventListener("click", function () {

        console.log("Choice made at step:", "back_to_ep_ct");
        userChoices.exercises = [];

        let epExercises = document.querySelectorAll('#ep_ex input[type="checkbox"]');
        epExercises.forEach(function (checkbox) {
            checkbox.checked = false;
        });

        let ctExercises = document.querySelectorAll('#ct_ex input[type="checkbox"]');
        ctExercises.forEach(function (checkbox) {
            checkbox.checked = false;
        });

        moveToPreviousState();
        console.log(userChoices)

    })

    // 3. choices Mode
    document.getElementById("busy_choice").addEventListener("click", function () {
        console.log("Choice made at step:", "busy_choice");
        userChoices.mode = 'BM';
        moveToNextState();
        console.log(userChoices);
    });

    document.getElementById("surprise_choice").addEventListener("click", function () {
        console.log("Choice made at step:", "surprise_choice");
        userChoices.mode = 'SM';
        moveToNextState();
        console.log(userChoices);
    });

    // back from 3. Reset Step 3 Choice
    document.getElementById("back_to_ex_comp").addEventListener("click", function () {
        console.log("Choice made at step:", "back_to_ex_comp");
        delete userChoices.mode;
        moveToPreviousState();
        console.log(userChoices);
    });

    // 4. choices Session duration
    document.getElementById("du15_choice").addEventListener("click", function () {
        console.log("Choice made at step:", "du15_choice");
        userChoices.session_duration = 15;
        moveToNextState();
        console.log(userChoices);
    });

    document.getElementById("du30_choice").addEventListener("click", function () {
        console.log("Choice made at step:", "du30_choice");
        userChoices.session_duration = 30;
        moveToNextState();
        console.log(userChoices);
    });

    document.getElementById("du60_choice").addEventListener("click", function () {
        console.log("Choice made at step:", "du60_choice");
        userChoices.session_duration = 60;
        moveToNextState();
        console.log(userChoices);
    });

    // back from 4. Reset Step 4 Choice
    document.getElementById("back_to_busy_surprise").addEventListener("click", function () {
        console.log("Choice made at step:", "back_to_busy_surprise");
        delete userChoices.session_duration;
        moveToPreviousState();
        console.log(userChoices);
    });

    // 5. choices Start delay
    document.getElementById("de1_choice").addEventListener("click", function () {
        console.log("Choice made at step:", "de1_choice");
        userChoices.start_delay = 1;
        moveToNextState();
        console.log(userChoices);
    });

    document.getElementById("de5_choice").addEventListener("click", function () {
        console.log("Choice made at step:", "de5_choice");
        userChoices.start_delay = 5;
        moveToNextState();
        console.log(userChoices);
    });

    document.getElementById("de15_choice").addEventListener("click", function () {
        console.log("Choice made at step:", "de15_choice");
        userChoices.start_delay = 15;
        moveToNextState();
        console.log(userChoices);
    });

    // back from 5. Reset Step 5 Choice
    document.getElementById("back_to_ses_duration").addEventListener("click", function () {
        console.log("Choice made at step:", "back_to_ses_duration");
        delete userChoices.start_delay;
        moveToPreviousState();
        console.log(userChoices);
    });

    // 6. Submit and start
    document.getElementById("submit_form_start").addEventListener("click", function (e) {
        console.log("Choice made at step:", "submit_form_start");
        e.preventDefault();
        submitForm();
        console.log(userChoices);
    });

    // back from 6. 
    document.getElementById("back_to_start_delay").addEventListener("click", function () {
        console.log("Choice made at step:", "back_to_start_delay");
        moveToPreviousState();
        console.log(userChoices);
    });

})();

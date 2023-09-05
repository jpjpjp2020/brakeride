function formFlow() {
    const formContainer = document.getElementById('formContainer');
    const formSteps = formContainer.querySelectorAll('.form-step');
    const epChoiceBtn = document.getElementById('ep_choice');
    const ctChoiceBtn = document.getElementById('ct_choice');
    const epExercises = document.getElementById('ep_ex');
    const ctExercises = document.getElementById('ct_ex');
    let currentStep = 0;

    function showStep(stepIndex) {
        formSteps.forEach(step => step.classList.remove('active'));
        formSteps[stepIndex].classList.add('active');
    }

    // event listener to ep choice button
    epChoiceBtn.addEventListener('click', () => {
        showStep(currentStep + 1);
        epExercises.style.display = 'flex';
        ctExercises.style.display = 'none';
    });

    // event listener to ct choice button
    ctChoiceBtn.addEventListener('click', () => {
        showStep(currentStep + 1);
        ctExercises.style.display = 'flex';
        epExercises.style.display = 'none';
    });

    // event listeners to back/next buttons
    formContainer.addEventListener('click', (e) => {
        const target = e.target;

        if (target.id === 'back_to_ep_ct' || target.id === 'back_to_ex_comp' || target.id === 'back_to_busy_surprise' || target.id === 'back_to_ses_duration' || target.id === 'back_to_start_delay') {
            showStep(currentStep - 1);
            currentStep--;
        } else if (target.id === 'to_busy_or_surprise') {
            showStep(currentStep + 1);
            currentStep++;
        }
    });

    // ChoiceField next
    const singleChoiceButtons = ['busy_choice', 'surprise_choice', 'du15_choice', 'du30_choice', 'du60_choice', 'de1_choice', 'de5_choice', 'de15_choice'];
    singleChoiceButtons.forEach(btnID => {
        const btn = document.getElementById(btnID);
        btn.addEventListener('click', () => {
            showStep(currentStep + 1);
            currentStep++;
        });
    });
}

document.addEventListener('DOMContentLoaded', formFlow);


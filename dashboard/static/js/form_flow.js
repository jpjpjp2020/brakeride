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

    epChoiceBtn.addEventListener('click', () => {
        currentStep++;
        showStep(currentStep);
        epExercises.style.display = 'flex';
        ctExercises.style.display = 'none';
    });

    ctChoiceBtn.addEventListener('click', () => {
        currentStep++;
        showStep(currentStep);
        ctExercises.style.display = 'flex';
        epExercises.style.display = 'none';
    });

    formContainer.addEventListener('click', (e) => {
        const target = e.target;

        if (target.id.startsWith('back_to_')) {
            currentStep--;
            showStep(currentStep);
        } else if (target.id === 'to_busy_or_surprise') {
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
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', formFlow);
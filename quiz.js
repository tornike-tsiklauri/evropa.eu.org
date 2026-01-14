// Quiz functionality
document.addEventListener('DOMContentLoaded', function() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const submitBtn = document.getElementById('submitQuiz');
    const quizResult = document.getElementById('quizResult');
    const quizScore = document.getElementById('quizScore');
    const quizMessage = document.getElementById('quizMessage');
    const quizContainer = document.getElementById('quizContainer');
    
    // Get alert messages from data attributes
    const alertMessage = submitBtn.getAttribute('data-alert-message') || 'Please answer all questions!';
    const perfectMessage = submitBtn.getAttribute('data-perfect-message') || '🎉 Excellent! All answers are correct!';
    const goodMessage = submitBtn.getAttribute('data-good-message') || '👍 Good job! Keep learning.';
    const tryAgainMessage = submitBtn.getAttribute('data-tryagain-message') || '📚 Review the material again and try once more.';
    const resultShownText = submitBtn.getAttribute('data-result-shown') || 'Results Shown';
    
    // Correct answers
    const correctAnswers = {
        q1: 'a',
        q2: 'b',
        q3: 'b',
        q4: 'c',
        q5: 'b'
    };

    // Add click handlers to options
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const input = this.querySelector('input[type="radio"]');
            input.checked = true;
            
            // Remove selected class from siblings
            const name = input.name;
            document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
                radio.parentElement.classList.remove('selected');
            });
            
            // Add selected class to this option
            this.classList.add('selected');
        });
    });

    // Submit quiz
    submitBtn.addEventListener('click', function() {
        let score = 0;
        let totalQuestions = Object.keys(correctAnswers).length;
        let allAnswered = true;

        // Check each question
        for (let question in correctAnswers) {
            const selected = document.querySelector(`input[name="${question}"]:checked`);
            
            if (!selected) {
                allAnswered = false;
                continue;
            }

            const questionDiv = document.querySelector(`[data-question="${question.substring(1)}"]`);
            const options = questionDiv.querySelectorAll('.quiz-option');

            // Check if answer is correct
            if (selected.value === correctAnswers[question]) {
                score++;
                selected.parentElement.classList.add('correct');
            } else {
                selected.parentElement.classList.add('incorrect');
                // Highlight the correct answer
                options.forEach(option => {
                    const input = option.querySelector('input[type="radio"]');
                    if (input.value === correctAnswers[question]) {
                        option.classList.add('correct');
                    }
                });
            }
        }

        if (!allAnswered) {
            // Create inline error message
            let errorMsg = document.getElementById('quizError');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.id = 'quizError';
                errorMsg.className = 'alert alert-danger mt-3';
                errorMsg.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>${alertMessage}`;
                quizContainer.insertBefore(errorMsg, document.querySelector('.text-center.mt-4'));
            }
            errorMsg.style.display = 'block';
            errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }

        // Hide error message if it exists
        const errorMsg = document.getElementById('quizError');
        if (errorMsg) {
            errorMsg.style.display = 'none';
        }

        // Display result
        const percentage = (score / totalQuestions) * 100;
        quizScore.textContent = `${score}/${totalQuestions}`;
        
        if (percentage === 100) {
            quizMessage.textContent = perfectMessage;
            quizResult.className = 'quiz-result show success';
        } else if (percentage >= 60) {
            quizMessage.textContent = goodMessage;
            quizResult.className = 'quiz-result show warning';
        } else {
            quizMessage.textContent = tryAgainMessage;
            quizResult.className = 'quiz-result show danger';
        }

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = resultShownText;

        // Scroll to result
        quizResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});

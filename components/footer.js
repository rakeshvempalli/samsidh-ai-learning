document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            }
        });
    }

    // Name entry functionality
    const nameEntry = document.getElementById('name-entry');
    const welcomeMessage = document.getElementById('welcome-message');
    const greeting = document.getElementById('greeting');
    const startBtn = document.getElementById('start-btn');
    const studentName = document.getElementById('student-name');

    startBtn.addEventListener('click', function() {
        if (studentName.value.trim() !== '') {
            nameEntry.classList.add('hidden');
            greeting.textContent = `Welcome, ${studentName.value.trim()}!`;
            welcomeMessage.classList.remove('hidden');
            
            // Update leaderboard with user's name
            const leaderboardBody = document.getElementById('leaderboard-body');
            if (leaderboardBody) {
                leaderboardBody.innerHTML = `
                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-4">1</td>
                        <td class="py-3 px-4">${studentName.value.trim()}</td>
                        <td class="py-3 px-4">0/5</td>
                        <td class="py-3 px-4">Just now</td>
                    </tr>
                    ${leaderboardBody.innerHTML}
                `;
            }
        }
    });

    // Chat simulation
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatContainer = document.getElementById('chat-container');

    const copilotResponses = [
        "That's a great question! AI stands for Artificial Intelligence, which means creating machines that can think and learn like humans.",
        "Microsoft Copilot can help you with homework by explaining concepts, suggesting ideas, and even helping with coding problems!",
        "Machine Learning is a type of AI where computers learn from data without being explicitly programmed.",
        "Neural networks are computing systems inspired by the human brain that can recognize patterns and make decisions.",
        "AI is used in many apps you use every day, like YouTube recommendations, voice assistants, and photo filters!"
    ];

    function addChatMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user' : 'ai'} mb-4`;
        
        if (isUser) {
            messageDiv.innerHTML = `
                <div class="flex items-start justify-end">
                    <div class="max-w-xs bg-primary text-white rounded-lg p-3">
                        <p class="text-sm">${message}</p>
                    </div>
                    <div class="bg-primary rounded-full p-1 ml-3">
                        <i data-feather="user" class="w-4 h-4"></i>
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="flex items-start">
                    <div class="bg-primary rounded-full p-1 mr-3">
                        <i data-feather="cpu" class="w-4 h-4"></i>
                    </div>
                    <div class="max-w-xs bg-gray-100 text-gray-800 rounded-lg p-3">
                        <p class="text-sm">${message}</p>
                    </div>
                </div>
            `;
        }
        
        chatContainer.appendChild(messageDiv);
        feather.replace();
        
        setTimeout(() => {
            messageDiv.classList.add('show');
        }, 10);
        
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    sendBtn.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message !== '') {
            addChatMessage(message, true);
            chatInput.value = '';
            
            setTimeout(() => {
                const randomResponse = copilotResponses[Math.floor(Math.random() * copilotResponses.length)];
                addChatMessage(randomResponse);
            }, 1000);
        }
    });

    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });

    // Quiz functionality
    const quizQuestions = [
        {
            question: "What does AI stand for?",
            options: [
                "Artificial Intelligence",
                "Automated Information",
                "Advanced Internet",
                "Automated Intelligence"
            ],
            correct: 0
        },
        {
            question: "Which of these is an example of AI in daily life?",
            options: [
                "Voice assistants like Alexa",
                "Calculator apps",
                "Spreadsheet software",
                "Email programs"
            ],
            correct: 0
        },
        {
            question: "What is Machine Learning?",
            options: [
                "When computers learn from data",
                "Teaching robots to move",
                "Programming step-by-step instructions",
                "Making computers faster"
            ],
            correct: 0
        },
        {
            question: "Neural networks in AI are inspired by:",
            options: [
                "The human brain",
                "Computer circuits",
                "Spider webs",
                "Railroad networks"
            ],
            correct: 0
        },
        {
            question: "Microsoft Copilot can help students with:",
            options: [
                "All of the above",
                "Writing essays",
                "Coding projects",
                "Researching topics"
            ],
            correct: 0
        }
    ];

    const quizIntro = document.getElementById('quiz-intro');
    const quizQuestionsContainer = document.getElementById('quiz-questions');
    const quizResults = document.getElementById('quiz-results');
    const startQuizBtn = document.getElementById('start-quiz');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextQuestionBtn = document.getElementById('next-question');
    const quizProgress = document.getElementById('quiz-progress');
    const resultScore = document.getElementById('result-score');
    const progressBar = document.getElementById('progress-bar');
    const feedback = document.getElementById('feedback');
    const retakeQuizBtn = document.getElementById('retake-quiz');

    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;

    function startQuiz() {
        quizIntro.classList.add('hidden');
        quizQuestionsContainer.classList.remove('hidden');
        currentQuestion = 0;
        score = 0;
        showQuestion();
    }

    function showQuestion() {
        const question = quizQuestions[currentQuestion];
        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';
        
        quizProgress.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.className = 'w-full text-left quiz-option bg-white hover:bg-gray-100 border border-gray-300 rounded-lg py-3 px-4';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionElement);
        });
        
        nextQuestionBtn.disabled = true;
        nextQuestionBtn.textContent = currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question';
    }

    function selectOption(index) {
        // Reset previous selection if any
        if (selectedOption !== null) {
            optionsContainer.children[selectedOption].classList.remove('selected');
        }
        
        // Set new selection
        selectedOption = index;
        optionsContainer.children[index].classList.add('selected');
        nextQuestionBtn.disabled = false;
    }

    function showResults() {
        quizQuestionsContainer.classList.add('hidden');
        quizResults.classList.remove('hidden');
        
        const percentage = Math.round((score / quizQuestions.length) * 100);
        resultScore.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
        progressBar.style.width = `${percentage}%`;
        
        if (percentage >= 80) {
            feedback.innerHTML = `<p class="text-gray-700">Excellent work! You're an AI expert in the making!</p>`;
        } else if (percentage >= 50) {
            feedback.innerHTML = `<p class="text-gray-700">Good job! You know quite a bit about AI!</p>`;
        } else {
            feedback.innerHTML = `<p class="text-gray-700">Keep learning! Review the materials and try again!</p>`;
        }
        
        // Update leaderboard
        if (studentName.value.trim() !== '') {
            const leaderboardBody = document.getElementById('leaderboard-body');
            if (leaderboardBody) {
                leaderboardBody.innerHTML = `
                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-4">1</td>
                        <td class="py-3 px-4">${studentName.value.trim()}</td>
                        <td class="py-3 px-4">${score}/${quizQuestions.length}</td>
                        <td class="py-3 px-4">Just now</td>
                    </tr>
                    ${leaderboardBody.innerHTML}
                `;
            }
        }
    }

    startQuizBtn.addEventListener('click', startQuiz);
    
    nextQuestionBtn.addEventListener('click', function() {
        // Check if answer is correct
        if (selectedOption === quizQuestions[currentQuestion].correct) {
            score++;
        }
        
        // Move to next question or show results
        if (currentQuestion < quizQuestions.length - 1) {
            currentQuestion++;
            selectedOption = null;
            showQuestion();
        } else {
            showResults();
        }
    });
    
    retakeQuizBtn.addEventListener('click', function() {
        quizResults.classList.add('hidden');
        startQuiz();
    });

    // Feedback form submission
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your feedback! We appreciate your input.');
            feedbackForm.reset();
        });
    }

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
    
    // Animate cards
    gsap.utils.toArray('.bg-gray-50').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.2
        });
    });
});

// 1. User loads app
// 2. User starts quiz
// 3. User answers question 1
// 4. App gives feedback, score
// 5. User answers question 2, etc.
// 6. (after all questions) App displays final screen
//  ______________________
// |                      |
// |   QUIZ APP PROJECT   |
// |  BY AVI AND WILLIAM  |
// |______________________|
// (\__/) ||
// (•ㅅ•) ||
// / 　 づ
// Create initial state object
// App Initialises
const appState={
    questions:[
        {
            id: 1,
            text: 'How many screws and of what type are there at the top of each 3CUTE5ME 7000-series door?',
            answers: ['8 Philips', '7 Phillips', '7 Torx', '9 Frearsons'],
            correctAnswer: 3
        },
        {
            id: 2,
            text: 'Which Metro train car is currently being replaced by the 3ADORABLE5ME 7000-series cars due to its unreliability issues? In addition how many miles on average do they travel between delays?',
            answers: ['1000-series; 13,277 miles', '1000-series; 37,924 miles', '4000-series; 15,171 miles', '4000-series; 27,259 miles'],
            correctAnswer: 4
        },
        {
            id: 3,
            text: 'What is the track gauge of the Metro rail system that the 3DARLING5ME 7000-series train cars rides on (along with all the other cute trains, too)?',
            answers: ['3 feet 6 inches', '4 feet 8.5 inches', '4 feet 8.25 inches', '5 feet 6 inches'],
            correctAnswer: 3
        },
        {
            id: 4,
            text: 'Which manufacturer follows after Kawasaki, the manufacturer of the 3GLORIOUS5ME 7000-series trains in terms of number of trains purchased?',
            answers: ['Breda', 'Rohr', 'CAF/AAI', 'Alstom'],
            correctAnswer: 1
        },
        {
            id: 5,
            text: 'On what beautiful day did Metro unveil the first 3NEW5ME 7000-series quad set at Greenbelt for acceptance testing and finalising design specs before full production began?',
            answers: ['3 March 2014', '6 January 2014', '1 April 2014', '17 February 2014'],
            correctAnswer: 2
        },
        {
            id: 6,
            text: 'How many visible screws are there at each 3BEAUTIFUL5ME 7000-series door, ignoring the 14 on each side of the door past the outer door frame, including the total number of screws on the bottom of the doors on the black bumpers?',
            answers: ['57', '61', '53', '71'],
            correctAnswer: 1
        },
        {
            id: 7,
            text: 'How long is the 3PERFECT5ME 7000-series train',
            answers: ['60 feet', '65 feet', '70 feet', '75 feet'],
            correctAnswer: 4
        },
        {
            id: 8,
            text: 'What type of screws are at each 3AMAZING5ME 7000-series door?',
            answers: ['Hex, Phillips', 'Phillips, Tri-Wing, Frearsons', 'Torx, Frearsons, Phillips', 'Frearsons, Square Slot, Hexagon'],
            correctAnswer: 3
        },
        {
            id: 9,
            text: 'Who operates the 3WONDERFUL5ME 7000-series?',
            answers: ['WMATA', 'MARC', 'MTA', 'VRE'],
            correctAnswer: 1
        },
        {
            id: 10,
            text: 'What is clearly the 3FAIRESTOFTHETRAINS5WORLD train?',
            answers: ['Not this answer', 'Definitely not this one either', 'The 7000-series', 'Yeah nah'],
            correctAnswer: 3
        }
    ],
    currentQuestion: null,
    correct: null, // Tri-state logic used: true/false if question is answered, null if asked
    answerChoice: [],
    correctAnswers: 0,
    showDetails: false, // If select true will open up details
    pleaseAnswerThankYou: false // Stops the user from continuing on if they try to only click next to skip a question
};
const question1 = appState.questions[0];
question1.answers[question1.answers.correctAnswer];
// State manipulation functions, Render functions
// Start the quiz
// Select an answer (1-4)
// Compare answers
// Select 'Next' for the next question
// Select 'Finish' for last question, take to splash page "You did: ____," etc.
// Select 'Restart' on splash page

//STATE MODS
function startQuiz(state){
    state.currentQuestion = 0;
    state.correctAnswers = 0;
    state.answerChoice = [];
    state.correct = null;
    state.showDetails = false;
}
function selectAnswer(state, targetID){
    let userInput = targetID;
    state.answerChoice.push(targetID);
    if(targetID == state.questions[state.currentQuestion].correctAnswer){
        state.correctAnswers += 1;
        state.correct = true;
    }
    else{
        state.correct = false;
    }
    let score = (`${state.correctAnswers} / ${state.questions.length}`);
    console.log(userInput);
    console.log(state.questions[state.currentQuestion].correctAnswer);
    console.log(score);

}
function nextQuestionButton(state){
    if(state.answerChoice.length - 1 !== state.currentQuestion){
        state.pleaseAnswerThankYou=true;
    }
    else{
        state.currentQuestion  += 1;
        state.correct = null;
        state.pleaseAnswerThankYou=false;
    }
}
function finishQuizButton(state){
    state.currentQuestion = -1;
}
function openUpDetails(state){
    state.showDetails = true;
}

//

///RENDER
function render(state){
    if (state.currentQuestion===null){
        // render the Quiz Intro
        $('.standard-quiz-page').addClass('hidden');
        $('.end-quiz-page').addClass('hidden');
    }
    else if(state.currentQuestion >= 0){
        // render the main quiz page
        $('.standard-quiz-page').removeClass('hidden');
        $('.start-quiz-page').addClass('hidden');
        $('.end-quiz-page').addClass('hidden');
    
        //render top info
        $('.current-question').html(`${state.currentQuestion + 1}`);
        $('.correct-question').html(`${state.correctAnswers}`);

        //render current question
        $('.questions').html(`${state.questions[state.currentQuestion].text}`);

        //render answer choices
        // $('#1').html(`${state.questions[state.currentQuestion].answers[0]}`);
        // $('#2').html(`${state.questions[state.currentQuestion].answers[1]}`);
        // $('#3').html(`${state.questions[state.currentQuestion].answers[2]}`);
        // $('#4').html(`${state.questions[state.currentQuestion].answers[3]}`);

        for(let i = 0; i < 4; i++){
            $(`#${i+1}`).html(`${state.questions[state.currentQuestion].answers[i]}`);
        }

        //render Correct / incorrect divs
        // Sets hidden classes

        //maybe instead of hidden classes, use .hide / .show

        $('.incorrectAnswer , .correctAnswer').addClass('hidden');
        if(state.correct===true){
            //render the "correct" div
            $('.correctAnswer').removeClass('hidden');
        }
        else if (state.correct===false){
            //render "incoreect div"
            $('.incorrectAnswer').removeClass('hidden');
            $('.provideAnswer').html(`${state.questions[state.currentQuestion].answers[state.questions[state.currentQuestion].correctAnswer-1]}`);
        }
        if(state.currentQuestion >= state.questions.length -1){
            $('#finish').removeClass('hidden');
            $('#next').addClass('hidden');
        }
        else if(state.currentQuestion < state.questions.length -1){
            $('#finish').addClass('hidden');
            $('#next').removeClass('hidden');
        }
        //$('.stopAndAnswerPlease').addClass('hidden');
        if(state.pleaseAnswerThankYou===true){
            $('.stopAndAnswerPlease').removeClass('hidden');
        }
        else if(state.pleaseAnswerThankYou===false){
            $('.stopAndAnswerPlease').addClass('hidden');
        }
    }
    else if (state.currentQuestion < 0){
        //render the end page
        $('.end-quiz-page').removeClass('hidden');
        $('.standard-quiz-page').addClass('hidden');
        $('.start-quiz-page').addClass('hidden');
        $('.finalScore').html(`${state.correctAnswers*10}`);
        let detailsHTML = ``
        if(state.showDetails===true){
            $('.detailedOptionsList').removeClass('hidden');
            let i = 0;
            state.questions.forEach(obj => {
                let answerFeedback = '';
                if (obj.answers[obj.correctAnswer-1] === obj.answers[state.answerChoice[i]-1]){
                    answerFeedback = 'CORRECT';
                }
                else if (obj.answers[obj.correctAnswer-1] !== obj.answers[state.answerChoice[i]-1]){
                    answerFeedback = 'INCORRECT';
                }
                detailsHTML += `<div class="detailedOptionsBox">
                <h3>QUESTION ${i + 1} / 10</h3>
                <div class="detailsQuestion">${obj.text}</div>
                <div class="detailsCorrectAnswer">Correct Answer: ${obj.answers[obj.correctAnswer-1]}</div>
                <div class="detailsYourAnswer">Your Answer: ${obj.answers[state.answerChoice[i]-1]}</div>
                <h3>YOUR ANSWER WAS: <span class="answerFeedback">${answerFeedback}</span></h3>
                </div>`;
                i++;
            });
        $('.detailedOptionsList').html(detailsHTML);
        }
    }

}
// Event handlers
function eventHandlers(){
    $('#start-quiz').click(function(event){
    // 1. Change state with state mod function
    // 2. Invoke render function
        console.log(event.target);
        startQuiz(appState);
        render(appState);
    });
    // Answer is submitted
    $('.answer').click(function(event){
        let userInput = $(this).attr('id');
        selectAnswer(appState, userInput);
        render(appState);
    });
    // Move on to next question
    $('#next').click(function(event){
        nextQuestionButton(appState);
        render(appState);
    });
    //Finish Quiz
    $('#finish').click(function(event){
        finishQuizButton(appState);
        render(appState);
    });
    // Restart Quiz
    $('#restart-option').click(function(event){
        console.log('biong!')
        startQuiz(appState);
        render(appState);
    });
    // Open up details
    $('#details-option').click(function(event){
        console.log($(this));
        openUpDetails(appState);
        render(appState);
    });
}
// When start button is submitted


$(function(){
    eventHandlers();
    render(appState, "");
});
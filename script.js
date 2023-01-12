window.onload = function() {

    //This codes will control our Timer

    var timeElapse = "";

    //Convert time to format of hours, minutes, 
    //seconds and milliseconds
    function timeToString(time) {

        //Divide the time by 3,600,000 to 
        //get hours (which gives 2.7777777)
        //Use Math.floor() to get the part before the decimal
        var diffInHrs = time / 3600000;
        var hh = Math.floor(diffInHrs);

        //Calculate the difference in Minutes
        var diffInMm = (diffInHrs - hh) * 60;
        var mm = Math.floor(diffInMm);

        //Calculate the difference in Seconds
        var diffInSec = (diffInMm - mm) * 60;
        var sec = Math.floor(diffInSec);

        //Calculate the difference in Milliseconds
        var diffInMs = (diffInSec - sec) * 100;
        var ms = Math.floor(diffInMs);

        //Convert our hour, minute, second 
        //and millisecond values tostring()
        var formattedHRS = hh.toString();
        var formattedMM  = mm.toString();
        var formattedSS  = sec.toString();
        var formattedMS  = ms.toString();

        //If the Minutes is 0 (time not upto minute yet),
        //return only the second, but if its upto minute,
        //return both the minute and the second
        timeElapse = formattedMM === "0" ? formattedSS + "sec " : formattedMM + "min " + formattedSS + "sec ";

        //Return this value
        //Since we want our stopwatch to be in "00" format,
        //we will use the padStart() function
        return `${(formattedMM).padStart("2","0")}:${(formattedSS).padStart("2","0")}:${(formattedMS).padStart("2","0")}`;
        

    }

    //Declare some variables we will use below
    var startTime;
    var elapsedTime = 0;
    var timerInterval;

    //This function will insert the Timer value into our "Timer"
    function print(txt) {
        document.querySelector(".quiz-Timer").innerHTML = txt;
    }

    //Create the Start, Pause and Reset functions

    function startTimer() {
        //Change the value of the startTime variable above
        startTime = Date.now() - elapsedTime;

        //Using the setInterval() function, update our timer 
        //every 10 milliseconds
        timerInterval = setInterval(function printTime() {
            elapsedTime = Date.now() - startTime;

            //Update our timer by Running our print() function 
            //and pass the value of the elapsedTime variable to it
            print(timeToString(elapsedTime));
        },10);
    }

    function pauseTimer() {
        //Stop updating the timer' value
        clearInterval(timerInterval);
    }

    function resetTimer() {
        //Clear the interval
        clearInterval(timerInterval);

        //Display our Timer's default value
        print("00:00:00");

        //Set the elapsedTime variable to zero
        elapsedTime = 0;
    }
    //End of Timer Codes


    //Our Quiz Codes goes here
    
    //Get the Quiz App Container
    var quizApp = document.querySelector(".quiz-app");
    //Since the display property is = "none" by default,
    //change it to "block"
    quizApp.style.display = "block";
    //Then fade it in by increasing the opacity to 1
    setTimeout(()=>{
        quizApp.style.opacity = "1";
    },200);

    //Get the Start Quiz button
    var startQuiz = document.querySelector(".startQuiz");

    //Get the Timer and About button container
    var aboutTimer = document.querySelector(".aboutTimerContent");
    //Get the About button
    var aboutBtn = document.querySelector(".aboutBtn");

    //Get the Home Page
    var home = document.querySelector(".home");

    //Get the Quiz Page
    var quiz = document.querySelector(".quiz");

    //Get the Quiz Result Page
    var quizResultPage = document.querySelector(".quiz-result");

    //Get the Quiz Correction Page
    var quizCorrectionPage = document.querySelector(".quizCorrection");

    //When the Start Quiz button is clicked,
    //open the Quiz Page
    startQuiz.onclick = ()=> {
        //First, reset our Timer, incase it was running
        resetTimer();

        //Close the Home Page usig a slide-fadeOut effect
        home.classList.add("slide-fadeOut");
        setTimeout(function(){
            //After that, change its display property to "none"
            home.style.display = "none";
        },500);

        //Then show the Quiz Page
        setTimeout(function(){
            quiz.style.display = "block";
        },500);
        setTimeout(function(){
            quiz.classList.add("slide-fadeIn");
            aboutTimer.style.right = "0";
            aboutBtn.style.opacity = "0";
        },550);
        setTimeout(function(){
            aboutBtn.style.display = "none";
        },700);

        //20 milliseconds after opening the Quiz Page,
        setTimeout(function(){
            //Start the Timer
            startTimer();        
        },720);
        
        
    }

    //Let's handle our Quiz Button Actions

    //First, let's get our Quiz Control Buttons
    var previousBtn = document.querySelector(".previousBtn");
    var previousBtn2 = document.querySelector(".previousBtn2");
    var nextBtn = document.querySelector(".nextBtn");
    var nextBtn2 = document.querySelector(".nextBtn2");
    var submitBtn = document.querySelector(".submitBtn");
    var endQuiz = document.querySelector(".endQuiz");
    var goToHomeBtn = document.querySelector(".goToHomeBtn");
    var quizCorrectionsBtn = document.querySelector(".quizCorrectionsBtn");
    var resultBtn = document.querySelector(".resultBtn");

    //and also declare some useful variables
    var questionNum = 0; //will hold our question index.
    var answeredQuestions = 0; //will hold the number of questions answered
    var correctlyAnswered = 0; //will hold number of correctly answered questions
    var usersAnswer = []; //will hold whatever answer user chooses
    
    //This is the Question Number element
    var questionNumText= document.querySelector(".questionNumText");

    //Let's get our question option elements
    //using the getElementsByClassName() method
    var answerOptions = document.getElementsByClassName("option");
    var answerOptions2 = document.getElementsByClassName("option2");

    //Using this for() loop...
    for (var i = 0; i < answerOptions.length; i++) {
        var answerOption = answerOptions[i];
        
        //Attach a click event listener to all 
        //our question option elements
        answerOption.onclick = function() {            

            //Now check if the currently clicked element  
            //has the selectedAnswer class on it. If it does,            
            if (this.classList.contains("selectedAnswer")) {
                //use the toggle() method to remove it
                this.classList.toggle("selectedAnswer");

                //Since clicking on this option element will deselect it,
                //clear the user's answer from the usersAnswer array,
                //using the questionNum as the index
                usersAnswer[questionNum] = "";

                //Update our Progress Element value
                var progress = document.querySelector(".progress");
                var percentComplete = document.querySelector(".percentComplete");
                
                //Using this condition, minus one from our
                //answeredQuestions variable since this 
                //question option has been deselected.
                //This is to help us set our Progress Element's
                //value correctly
                if (usersAnswer[questionNum] == undefined || usersAnswer[questionNum] === "") {
                    answeredQuestions -= 1;
                    var percent = (answeredQuestions / questions.length) * 100;
                    progress.style.width = percent + "%";
                    percentComplete.innerHTML = percent.toFixed() + "%";
                }

                //Also, change the current question's 
                //anwered property in the question array to false
                questions[questionNum].answered = false;

            } 
            //But if it doesn't,
            else {

                //Run another for() loop that will remove the
                //selectedAnswer class from any element that has it.                
                //This trick will help us remove the highlighted style from
                //the previously highlighted element and apply it
                //only on the currently clicked element
                for (var i = 0; i < answerOptions.length; i++) {
                    answerOptions[i].classList.remove("selectedAnswer"); 
                }
                //then toggle the selected class on the
                //currently clicked element 
                this.classList.toggle("selectedAnswer"); 

                //and update our progress element
                var progress = document.querySelector(".progress");
                var percentComplete = document.querySelector(".percentComplete");

                //Using this condition, add one to our
                //answeredQuestions variable.
                //This is to help us set our progress elements
                //value correctly
                if (usersAnswer[questionNum] == undefined || usersAnswer[questionNum] == "") {
                    answeredQuestions += 1;
                    var percent = (answeredQuestions / questions.length) * 100;
                    progress.style.width = percent + "%";
                    percentComplete.innerHTML = percent.toFixed() + "%";
                }

                //Using the charAt() method, get the first text
                //of the clicked option and store it in the array,
                //using the questionNum to get the correct index
                usersAnswer[questionNum] = this.innerText.charAt(0);
                
                //Also, change the current question's answered property
                //in the questions array to true
                questions[questionNum].answered = true;
            } 
        }
    }

    //Let's create our questions
    var questions = [
        {
            question: "What does HTML stand for?",
            answers: {
                a: "a. Hyper Text Mark Language",
                b: "b. Hyper Text Markup Language",
                c: "c. Hyper Text Markup League",
                d: "d. Hyper Text Mockup Language"
            },
            correctAnswer: "b",
            //will help us know if the question has been answered
            answered: false
        },
        {
            question: "What does CSS stand for?",
            answers: {
                a: "a. Computer Style Sheet",
                b: "b. Cascading Sorting Sheet",
                c: "c. Cascading Style Sheet",
                d: "d. Cascading Storage Sheet"
            },
            correctAnswer: "c",
            answered: false
        },
        {
            question: "What does XML stand for?",
            answers: {
                a: "a. Extensible Markup Language",
                b: "b. Extension Markup Language",
                c: "c. Extrusion Mark Language",
                d: "d. Extensive Markup Language"
            },
            correctAnswer: "a",
            answered: false
        },
        {
            question: "What does SQL stand for?",
            answers: {
                a: "a. Sequential Query Language",
                b: "b. Strong Query Language",
                c: "c. Semantic Query Language",
                d: "d. Structured Query Language"
            },
            correctAnswer: "d",
            answered: false
        },
        {
            question: "What is the correct tag for inserting a line break?",
            answers: {
                a: "a. &lt/break&gt",
                b: "b. &lt/br&gt",
                c: "c. &lt/lbr&gt",
                d: "d. &lt/line-break&gt"
            },
            correctAnswer: "b",
            answered: false
        },
        {
            question: "What is the correct syntax for HTML comments?",
            answers: {
                a: "a. &lt!--Comment goes here--&gt",
                b: "b. &lt!-Comment goes here-&gt",
                c: "c. &lt--Comment goes here--&gt",
                d: "d. &lt--!Comment goes here--&gt"
            },
            correctAnswer: "a",
            answered: false
        },
        {
            question: "HTML attribute for disabling an element is:",
            answers: {
                a: "a. &ltelement style= \"disabled: true\"&gt",
                b: "b. &ltelement style= \"disable: disabled\"&gt",
                c: "c. &ltelement disabled= \"true\"&gt",
                d: "d. &ltelement disabled: \"true\"&gt"
            },
            correctAnswer: "c",
            answered: false
        },
        {
            question: "What is an IDE?",
            answers: {
                a: "a. Integrated Development Environment",
                b: "b. Internal Development Environment",
                c: "c. Internal Developers Engine",
                d: "d. Initiated Development Environment"
            },
            correctAnswer: "a",
            answered: false
        },
        {
            question: "What does FTP stand for?",
            answers: {
                a: "a. File Transfer Phase",
                b: "b. Field Transfer Protocol",
                c: "c. File Transmission Protocol",
                d: "d. File Transfer Protocol"
            },
            correctAnswer: "d",
            answered: false
        },
        {
            question: "What is a Web Hosting Platform?",
            answers: {
                a: "a. A domain name",
                b: "b. A website host",
                c: "c. An online space for websites and data",
                d: "d. A web container"
            },
            correctAnswer: "c",
            answered: false
        },
        {
            question: "Which is a correct email link?",
            answers: {
                a: "a. &ltelement href=\"mailto:xxx@yyy.com\"&gt",
                b: "b. &ltelement href=\"xxx@yyy.com\"&gt",
                c: "c. &ltelement href=\"email:xxx@yyy.com\"&gt",
                d: "d. &ltelement href=\"mail:xxx@yyy.com\"&gt"
            },
            correctAnswer: "a",
            answered: false
        },
        {
            question: "Which will open a new Browser window?",
            answers: {
                a: "a. &ltelement href=\"url\" new&gt",
                b: "b. &ltelement href=\"url\" target=\"_blank\"&gt",
                c: "c. &ltelement href=\"url\" newpage=\"new\"&gt",
                d: "d. &ltelement href=\"url\" blank&gt"
            },
            correctAnswer: "b",
            answered: false
        },
        {
            question: "Which is the correct HTML to insert an image?",
            answers: {
                a: "a. &ltimg url=\"image.jpeg\"&gt",
                b: "b. &ltimg src=\"image\"&gt",
                c: "c. &ltimg href=\"image.jpeg\"&gt",
                d: "d. &ltimg src=\"image.jpeg\"&gt"
            },
            correctAnswer: "d",
            answered: false
        },
        {
            question: "JavaScript links are best placed:",
            answers: {
                a: "a. at the top of the HTML body tag",
                b: "b. at the middle of the HTML body tag",
                c: "c. at the bottom of the HTML body tag",
                d: "d. inside the HTML head tag"
            },
            correctAnswer: "c",
            answered: false
        },
        {
            question: "CSS links are best placed:",
            answers: {
                a: "a. at the top of the HTML body tag",
                b: "b. at the middle of the HTML body tag",
                c: "c. at the bottom of the HTML body tag",
                d: "d. inside the HTML head tag"
            },
            correctAnswer: "d",
            answered: false
        },
        {
            question: "HTML is what type of Language?",
            answers: {
                a: "a. Scripting Language",
                b: "b. Markup Language",
                c: "c. Programming Language",
                d: "d. Query Language"
            },
            correctAnswer: "b",
            answered: false
        },
        {
            question: "CSS is what type of Language?",
            answers: {
                a: "a. Markup Language",
                b: "b. Cascading Style Language",
                c: "c. Styling Language",
                d: "d. Style Sheet Language"
            },
            correctAnswer: "d",
            answered: false
        },
        {
            question: "JavaScript is what type of Language?",
            answers: {
                a: "a. Query Language",
                b: "b. Web Language",
                c: "c. Scripting Language",
                d: "d. Programming Language"
            },
            correctAnswer: "c",
            answered: false
        },
        {
            question: "SQL is what type of Language",
            answers: {
                a: "a. Structured Query Language",
                b: "b. Database Language",
                c: "c. Data Management Language",
                d: "d. Programming Language"
            },
            correctAnswer: "a",
            answered: false
        },
        {
            question: "What is an API?",
            answers: {
                a: "a. Applicable Programmable Interface",
                b: "b. Application Production Interface",
                c: "c. App Programming Interface",
                d: "d. Application Programming Interface"
            },
            correctAnswer: "d",
            answered: false
        },
        {
            question: "SQL is a Language used for:",
            answers: {
                a: "a. Creating and Managing Databases",
                b: "b. Programming and Web Development",
                c: "c. Building Applications",
                d: "d. Software Development"
            },
            correctAnswer: "a",
            answered: false
        },
        {
            question: "What is the latest version of HTML?",
            answers: {
                a: "a. HTML6",
                b: "b. HTML3",
                c: "c. HTML5",
                d: "d. HTML2"
            },
            correctAnswer: "c",
            answered: false
        },
        {
            question: "What is the latest version of CSS?",
            answers: {
                a: "a. CSS3",
                b: "b. CSS4",
                c: "c. CSS5",
                d: "d. CSS6"
            },
            correctAnswer: "a",
            answered: false
        },
        {
            question: "When was JavaScript Invented?",
            answers: {
                a: "a. 1993",
                b: "b. 1995",
                c: "c. 1997",
                d: "d. 1999"
            },
            correctAnswer: "b",
            answered: false
        },
        {
            question: "Who invented JavaScript?",
            answers: {
                a: "a. Douglas Crockford",
                b: "b. Sheryl Sandberg",
                c: "c. Brendan Eich",
                d: "d. George Hernandes"
            },
            correctAnswer: "c",
            answered: false
        }
    ]; //End of Questions array object

    //When the Next button is pressed, open a new question
    nextBtn.onclick = ()=> {    
        
        //Since a new question has been opened,
        //enable the Previous button
        previousBtn.disabled = false;

        //Increment our questionNum variable
        questionNum += 1;

        //Update our Question Number element value
        questionNumText.innerHTML = `Question ${questionNum +1}/${questions.length}`;

        //Insert a question into the question element,
        //using the questionNum variable value as an index
        document.querySelector(".quiz-question").innerHTML = 
        questions[questionNum].question;

        //Then insert the answers same way too
        document.querySelector(".option-A").innerHTML = 
        questions[questionNum].answers.a;
        document.querySelector(".option-B").innerHTML = 
        questions[questionNum].answers.b;
        document.querySelector(".option-C").innerHTML = 
        questions[questionNum].answers.c;
        document.querySelector(".option-D").innerHTML = 
        questions[questionNum].answers.d;

        //Let's check if the next question has been answered...
        //If it has,
        if (questions[questionNum].answered = true) {
            //Loop through all the question options elements,
            for (var i = 0; i < answerOptions.length; i++) {
                //and remove the selected class from anyone that has it
                answerOptions[i].classList.remove("selectedAnswer");
                //After that, add the selectedAnswer class to the
                //question option that matches what the user selected previously 
                if (answerOptions[i].innerText.charAt(0) === usersAnswer[questionNum]){
                    answerOptions[i].classList.add("selectedAnswer");
                }
            }
        }

        //If user gets to the end of the question,
        //disable the Next button
        //Note: I removed one because JavaScript counts
        //from zero. Eg. 0,1,2,3,4; which is 5 in length.
        //Doing that will help us get the correct question index
        if (questionNum === questions.length -1) {
            questionNum = questions.length - 1;
            nextBtn.disabled = true;
        }

    }

    //When the Previous button is pressed, go to the 
    //previous question
    previousBtn.onclick = ()=> {
        //Since we are no longer at the end of the question,
        //enable the Next button
        nextBtn.disabled = false;

        //Decrement the questionNum variable so we can 
        //go to the previous question
        questionNum--;

        //Update our Question Number element using template literals
        //I added +1 since our questionNum variable starts at 0;
        questionNumText.innerHTML = `Question ${questionNum +1}/${questions.length}`;

        //Insert a question into the question element,
        //using the questionNum variable value as an index
        document.querySelector(".quiz-question").innerHTML = 
        questions[questionNum].question;

        //Then insert the answers same way too
        document.querySelector(".option-A").innerHTML = 
        questions[questionNum].answers.a;
        document.querySelector(".option-B").innerHTML = 
        questions[questionNum].answers.b;
        document.querySelector(".option-C").innerHTML = 
        questions[questionNum].answers.c;
        document.querySelector(".option-D").innerHTML = 
        questions[questionNum].answers.d;

        //Let's check if the next question has been answered...
        //If it has,
        if (questions[questionNum].answered = true) {
            //Loop through all the question options elements,
            for (var i = 0; i < answerOptions.length; i++) {
                //and remove the selectedAnswer class from anyone that has it
                answerOptions[i].classList.remove("selectedAnswer");
                //After that, add the selectedAnswer class to the
                //question option that matches what the user selected previously 
                if (answerOptions[i].innerText.charAt(0) === usersAnswer[questionNum]){
                    answerOptions[i].classList.add("selectedAnswer");
                }
            }
        }

        //If user gets to the beginning of the question,
        //disable the Previous button
        if (questionNum === 0) {
            previousBtn.disabled = true;
        }
    }

    //Once the page loads, update our Question Number 
    //element's value
    questionNumText.innerHTML = `Question ${questionNum +1}/${questions.length}`;

    //Our Modal Dialogue
    //Let's get our Modal Buttons
    var closeModalBtns = document.getElementsByClassName("closeModal");
    var endQuiz = document.querySelector(".endQuiz");
    //Let's get our Modal
    var modal = document.querySelector(".modal");
    //Let's get our Modal Title element
    var modalTitle = document.querySelector(".modal-title"); 
    //Let's get our Modal Info element
    var modalInfo = document.querySelector(".modal-info");
    //Let's get our Modal Control Container
    var modalControlsContainer = document.querySelector(".modalControlsContainer");  
    //Let's get our Modal background element
    var modalBg = document.querySelector(".modalBg");

    //This function can be called to open the Modal
    function openModal() {

        //First, pause the Timer
        pauseTimer();

        //In opening the Modal, follow these steps...
        //Since our Modal container's display property 
        //is currently = "none," change it to the
        //original property: "flex"
        modalBg.style.display = "flex";

        //After that, wait for 50milliseconds, then
        setTimeout(()=> {
            //fade in the Modal Background by adding the 
            //fadeIn class to it
            modalBg.classList.add("fadeIn");
        },50);

        //After that, wait for 10milliseconds (60-50), then
        setTimeout(()=> {
            //show the Modal using our scaleUp-fadeIn
            //animation style class
            modal.classList.add("scaleUp-fadeIn");
        },60);

        //Using this for() loop,
        for (var i = 0; i < closeModalBtns.length; i++) {
            //get the two buttons in the Modal which we
            //will be using to close it
            
            //When any of the close button is clicked,
            closeModalBtns[i].onclick = function() {
                //run this function to close the Modal
                closeModal();
                //After closing the Modal, start the Timer
                //from where it stopped
                startTimer();
            }          
            
        }

        //End the quiz when any button inside the Modal
        //with the endQuizBtn class is pressed,
        var endQuizBtn = document.querySelector(".endQuizBtn");
        endQuizBtn.onclick = ()=> {
            //run the closeModal() function to close the Modal
            closeModal();
            //and reset the Quiz Timer
            resetTimer();

            //After we've closed the Modal, perform these actions

            //Using this for() loop,
            for (var i = 0; i < questions.length; i++) {
                //reset the answered property's value for each of
                //our questions to false,
                questions[i].answered = false;
            }

            //reset the value of these variables
            //and arrays,
            questionNum = 0; 
            answeredQuestions = 0;
            correctlyAnswered = 0;
            usersAnswer = [];

            //Reset the Question Number Element value using 
            //template literals. We added +1 since our
            //questionNum variable starts at 0,
            questionNumText.innerHTML = `Question ${questionNum +1}/${questions.length}`;

            //Reset the Question Element value
            document.querySelector(".quiz-question").innerHTML = 
            questions[questionNum].question;

            //and the Option Elements value.
            document.querySelector(".option-A").innerHTML = 
            questions[questionNum].answers.a;
            document.querySelector(".option-B").innerHTML = 
            questions[questionNum].answers.b;
            document.querySelector(".option-C").innerHTML = 
            questions[questionNum].answers.c;
            document.querySelector(".option-D").innerHTML = 
            questions[questionNum].answers.d;

            //Disable the Previous button
            previousBtn.disabled = true;
            //Enable the Next Button
            nextBtn.disabled = false;

            
            //Remove the selectedAnswer class from any
            //question option that has it
            for (var i = 0; i < answerOptions.length; i++) {
                answerOptions[i].classList.remove("selectedAnswer"); 
            }
            //and update our progress element
            var progress = document.querySelector(".progress");
            var percentComplete = document.querySelector(".percentComplete");
            progress.style.width = "0%";
            percentComplete.innerHTML = "0%";

            //Then, go to our Home Page using these steps
            
            //Fade out the Quiz Page by replacing the
            //slide-fadeIn class on it with slide-fadeOut
            quiz.classList.replace("slide-fadeIn","slide-fadeOut");

            //After 200milliseconds, change the Quiz Page
            //display property to none, and the Home Page
            //display property to "block"
            setTimeout(function(){
                quiz.style.display = "none";
                home.style.display = "";
            },200);

            //15milliseconds later, remove the slide-fadeOut
            //class from the Home Page so it can revert to 
            //its original style which is shown by default
            setTimeout(function(){
                home.classList.remove("slide-fadeOut");
            },215);

            //Since we are now in the Home Page,
            //Fade out the Quiz Timer and Show the About button
            setTimeout(function(){
                aboutTimer.style.right = "-86px";
                aboutBtn.style.display = "";
            },215);
            setTimeout(function(){
                aboutBtn.style.opacity = "1";
            },215);
        }

    }

    //Call this function for closing the Modal
    function closeModal() {

        //Follow these steps to close the Modal...

        //Remove the fadeIn and scaleUp-fadeIn classes
        //from the Modal and Modal Background,
        modalBg.classList.remove("fadeIn");
        modal.classList.remove("scaleUp-fadeIn");

        //After that, close the Modal finally by
        setTimeout(()=> {
            //changing the Modal Container's 
            //display property to "none"
            modalBg.style.display = "none";
        },200);

        setTimeout(()=> {
            //Make sure to change the Modal Title, information
            ///and buttons to their default values
            modalTitle.innerHTML = "End Quiz!";
            modalInfo.innerHTML = 
            `<p>Your Progress will not be saved.</p>
            <p>Are you sure you want to end quiz?</p>`;
            
            modalControlsContainer.innerHTML = 
            `<button class="closeModal closeModalBtn">Nope</button>
            <button class="endQuizBtn">Yes!</button>`;
        },210);
        
    }

    //When the End Quiz Button on the quiz page is clicked,
    endQuiz.onclick = ()=> {         
        //run this function to open the Modal. Here we get 
        //Users feedback on whether the Quiz should 
        //end or continue
        openModal();

    }

    //Let's handle the Submit Quiz operation

    //When the Submit button is clicked,
    submitBtn.onclick = ()=> {
        //if user have not answered any question,
        //open the Modal and ask user to answer some
        //questions before submitting
        if (answeredQuestions == 0) {
            //Before opening the Modal, 
            //change our Modal Title to this:
            modalTitle.innerHTML = "Submit Quiz!"
            //change our Modal info to this:
            modalInfo.innerHTML = 
            `<p>
                You've not answered any questions yet. 
                Kindly answer some questions before submitting.
            </p>`;

            //Replace the buttons that are already in the
            //Modal with these:
            modalControlsContainer.innerHTML = 
            `<button class="closeModal closeModalBtn">Okay</button>
            <button class="endQuizBtn">I\'m Out!</button>`;

            //After that, open the Modal
            openModal();

        //But if user have not answered upto three 
        //questions, open the Modal and ask the user 
        //to answer some few more questions
        } else if (answeredQuestions < 4) {
            //Open the Modal
            openModal();
            
            //Change our Modal Title to this:
            modalTitle.innerHTML = "Submit Quiz!";
            //Change our Modal info to this:
            modalInfo.innerHTML = 
            `<p>
                Kindly answer some few more 
                questions before submiting.
            </p>
            <p>
                Or, you can submit anyway.
            </p>`;

            //Replace the buttons that are already in the
            //Modal with these:
            modalControlsContainer.innerHTML =
            `<button class="closeModal closeModalBtn">Okay</button>
            <button class="submitQuiz">Submit</button>`;
            
            //Get the submitQuiz button inside the 
            //Modal and attach an onclick event listener to it. 
            var submitQuizBtn = document.querySelector(".submitQuiz");            
            //When the button is clicked, run this function            
            submitQuizBtn.onclick = function() {
                //Close Modal and Stop the Timer, 
                //before submitting
                closeModal();
                submitQuiz(); 
            }

            //Get the Okay button inside the Modal too
            let closeModalBtn = document.querySelector(".closeModalBtn");
            //When the button is clicked, close the Modal 
            closeModalBtn.onclick = function() {
                closeModal();
                //After closing the Modal, start the Timer
                //from where it stopped
                startTimer();
            }          

        //If the above conditions have or have 
        //already been met, Submit Quiz    
        } else {
            submitQuiz();
        }
    }

    //We can call this function to Submit the Quiz
    function submitQuiz() { 
        //Pause the Timer
        pauseTimer();

         //Close the Quiz Page using a slide-fadeOut effect
         quiz.classList.replace("slide-fadeIn","slide-fadeOut");
         setTimeout(function(){
             quiz.style.display = "none";
         },500);
 
         //Then show the Quiz Result Page using a slide-fadeIn effect
         setTimeout(function(){
             quizResultPage.style.display = "block";
         },500);
         setTimeout(function(){
            quizResultPage.classList.add("slide-fadeIn");
         },550);

         //Get the table to display the Quiz Result
         var quizResultBoard = document.querySelector(".quizResultBoard");
         
         //Using this for() loop, compare User's answer
         //to the correct answer, if it's the same, add +1
         //to the correctlyAnswered variable.
         //This will help use get how many questions User 
         //answered correctly.
         for (var i = 0; i < usersAnswer.length; i++) {
             if (usersAnswer[i] === questions[i].correctAnswer) {
                 correctlyAnswered++;
             }
         }
         
         //Put the Quiz Result inside the table
         quizResultBoard.innerHTML =
            `<tr>
                <td>Quiz Result</td>
                <!--Each question carries 4 marks-->
                <td>${correctlyAnswered * 4}/100</td>
            </tr>
            <tr>
                <td>Answers Correct</td>
                <td>${correctlyAnswered}</td>
            </tr>
            <tr>
                <td>Answers Wrong</td>
                <td>${questions.length - correctlyAnswered}</td>
            </tr>
            <tr>
                <td>Percentage Score</td>
                <td>${(correctlyAnswered / questions.length * 100).toFixed()}%</td>
            </tr>
            <tr>
                <td>Time Spent</td>
                <td>${timeElapse}</td>
            </tr>`;
            
        //Reset our questionNum variable to 0, since the 
        //Quiz have been submitted.
        questionNum = 0; 
    }

    //When the Home button in our Quiz Result Page is clicked,
    goToHomeBtn.onclick = ()=> {        
        //Perform these actions:
        
        //Using this for() loop,
        for (var i = 0; i < questions.length; i++) {
            //reset the answered property value for each of
            //our questions to false
            questions[i].answered = false;
        }

        //Reset the value of these variables
        //and arrays also
        questionNum = 0; 
        answeredQuestions = 0;
        correctlyAnswered = 0;
        usersAnswer = [];

        //Reset the Question Number Element value using 
        //template literals. We added +1 since our
        //questionNum variable starts at 0,
        questionNumText.innerHTML = `Question ${questionNum +1}/${questions.length}`;

        //Reset the Question Element value
        document.querySelector(".quiz-question").innerHTML = 
        questions[questionNum].question;

        //and the Option Elements value.
        document.querySelector(".option-A").innerHTML = 
        questions[questionNum].answers.a;
        document.querySelector(".option-B").innerHTML = 
        questions[questionNum].answers.b;
        document.querySelector(".option-C").innerHTML = 
        questions[questionNum].answers.c;
        document.querySelector(".option-D").innerHTML = 
        questions[questionNum].answers.d;

        previousBtn.disabled = true;
        nextBtn.disabled = false;

        
        //Remove the selectedAnswer class from any
        //question option that has it
        for (var i = 0; i < answerOptions.length; i++) {
            answerOptions[i].classList.remove("selectedAnswer"); 
        }
        //and update our progress element
        var progress = document.querySelector(".progress");
        var percentComplete = document.querySelector(".percentComplete");
        progress.style.width = "0%";
        percentComplete.innerHTML = "0%";

        //Then, go to our Home Page using these steps
        
        //Fade out the Quiz Result Page by replacing the
        //slide-fadeIn class on it with the slide-fadeOut class
        quizResultPage.classList.replace("slide-fadeIn","slide-fadeOut");

        //After 200milliseconds, change the Quiz Page
        //display property to none, and the Home Page
        //display property to "block"
        setTimeout(function(){
            quizResultPage.style.display = "none";
            home.style.display = "";
        },200);

        //15milliseconds later, remove the slide-fadeOut
        //class from the Home Page so it can revert to 
        //its original style which is shown by default
        setTimeout(function(){
            home.classList.remove("slide-fadeOut");
        },215);

        //Since we are now in the Home Page,
        //Fade out the Quiz Timer and Show the About button
        setTimeout(function(){
            aboutTimer.style.right = "-86px";
            aboutBtn.style.display = "";
        },215);
        setTimeout(function(){
            aboutBtn.style.opacity = "1";
        },215);

        //Reset our Timer
        resetTimer();
    }

    //When the quizCorrectionsBtn is pressed,
    quizCorrectionsBtn.onclick = ()=> {
        //Close the Quiz Result Page
        quizResultPage.classList.replace("slide-fadeIn","slide-fadeOut");
        setTimeout(function(){
            quizResultPage.style.display = "none";
        },500);

        //Then show the Quiz Correction Page.
        setTimeout(function(){
            quizCorrectionPage.style.display = "block";
        },500);
        setTimeout(function(){
            quizCorrectionPage.classList.add("slide-fadeIn");
        },550);

        //Update our Progress Guage value to where the quiz stopped
        var percent2 = (answeredQuestions / questions.length) * 100;
        var progress2 = document.querySelector(".progress2");
        var percentComplete2 = document.querySelector(".percentComplete2");
        progress2.style.width = percent2 + "%";
        percentComplete2.innerHTML = percent2.toFixed() + "%";

        //Update our Question Number element value
        var questionNumText2 = document.querySelector(".questionNumText2");
        questionNumText2.innerHTML = `Question ${questionNum +1}/${questions.length}`;

        //First, let's "reinsert" the answers into the options

        //It took me over 3hrs to figure this out: reinserting
        //the answers into the question element, before
        //the highlighting could work.
        //The idea was that once the quizCorrectionsBtn is 
        //clicked, the Quiz Correction Page should open and 
        //question one, being the first question, should be
        //highlighted: the User's answer and the Correct answer.
        //Am glad I figured it out; 
        //that's the power of never giving up.
        
        //Insert the answers into their respective option elements
        document.querySelector(".option-A2").innerHTML = 
        questions[questionNum].answers.a;
        document.querySelector(".option-B2").innerHTML = 
        questions[questionNum].answers.b;
        document.querySelector(".option-C2").innerHTML = 
        questions[questionNum].answers.c;
        document.querySelector(".option-D2").innerHTML = 
        questions[questionNum].answers.d;

        //Let's check if the question has been answered...
        //If it has,
        if (questions[questionNum].answered = true) {
            //Loop through all the question options elements,
            for (var i = 0; i < answerOptions2.length; i++) {
                //remove the wrongAnswer class from anyone that has it
                answerOptions2[i].classList.remove("wrongAnswer");
                //remove the correctAnswer class from anyone that has it
                answerOptions2[i].classList.remove("correctAnswer");

                //After that, add the selectedAnswer class to the
                //question option that matches what the user selected previously 
                if (answerOptions2[i].innerText.charAt(0) === usersAnswer[questionNum]){
                    answerOptions2[i].classList.add("wrongAnswer");
                }
                //Also highlight the correct answer by adding
                //the correctAnswer class to the correct option
                if (answerOptions2[i].innerText.charAt(0) === questions[questionNum].correctAnswer){
                    //First, remove the wrongAnswer class from it, if any,
                    answerOptions2[i].classList.remove("wrongAnswer");
                    //before adding the correctAnswer class
                    answerOptions2[i].classList.add("correctAnswer");
                }
            }
        }       


        //Let's add event listeners to our 
        //Next and Previous button in the Quiz Result Page

        //When the Next button is pressed, open a new question
        nextBtn2.onclick = ()=> {    
            
            //Since a new question has been opened,
            //enable the Previous button
            previousBtn2.disabled = false;

            //Increment our questionNum variable
            questionNum += 1;

            //Update our Question Number element value
            var questionNumText2 = document.querySelector(".questionNumText2");
            questionNumText2.innerHTML = `Question ${questionNum +1}/${questions.length}`;

            //Insert a question into the question element,
            //using the questionNum variable value as a reference
            document.querySelector(".quiz-question2").innerHTML = 
            questions[questionNum].question;

            //Then insert the answers same way too
            document.querySelector(".option-A2").innerHTML = 
            questions[questionNum].answers.a;
            document.querySelector(".option-B2").innerHTML = 
            questions[questionNum].answers.b;
            document.querySelector(".option-C2").innerHTML = 
            questions[questionNum].answers.c;
            document.querySelector(".option-D2").innerHTML = 
            questions[questionNum].answers.d;
    
            //Let's check if the next question has been answered...
            //If it has,
            if (questions[questionNum].answered = true) {
                //Loop through all the question options elements,
                for (var i = 0; i < answerOptions2.length; i++) {
                    //remove the wrongAnswer class from anyone that has it
                    answerOptions2[i].classList.remove("wrongAnswer");
                    //remove the correctAnswer class from anyone that has it
                    answerOptions2[i].classList.remove("correctAnswer");
    
                    //After that, add the wrongAnswer class to the
                    //question option that matches what the user selected previously 
                    if (answerOptions2[i].innerText.charAt(0) === usersAnswer[questionNum]){
                        answerOptions2[i].classList.add("wrongAnswer");
                    }
                    //Then highlight the correct answer by adding
                    //the correctAnswer class to the correct option
                    if (answerOptions2[i].innerText.charAt(0) === questions[questionNum].correctAnswer){
                        //First, remove the wrongAnswer class from it, if any,
                        answerOptions2[i].classList.remove("wrongAnswer");
                        //before adding the correctAnswer class
                        answerOptions2[i].classList.add("correctAnswer");
                    }
                }
            }  

            //If user gets to the end of the question,
            //disable the Next button
            //Note: I removed one because JavaScript's counts
            //from zero. Eg. 0,1,2,3,4; which is 5 in length.
            //Doing that will help us get the correct question index
            if (questionNum === questions.length -1) {
                questionNum = questions.length - 1;
                nextBtn2.disabled = true;
            }

        }

        //When the Previous button is pressed, go to the 
        //previous question
        previousBtn2.onclick = ()=> {
            //Since we are no longer at the end of the question,
            //enable the Next button
            nextBtn2.disabled = false;

            //Decrement the questionNum variable so we can 
            //go to the previous question
            questionNum--;

            //Update our Question Number element using template literals
            //We added +1 since our questionNum variable starts at 0;
            var questionNumText2 = document.querySelector(".questionNumText2");
            questionNumText2.innerHTML = `Question ${questionNum +1}/${questions.length}`;

            //Insert a question into the question element,
            //using the questionNum variable value as a reference
            document.querySelector(".quiz-question2").innerHTML = 
            questions[questionNum].question;

            //Then insert the answers same way too
            document.querySelector(".option-A2").innerHTML = 
            questions[questionNum].answers.a;
            document.querySelector(".option-B2").innerHTML = 
            questions[questionNum].answers.b;
            document.querySelector(".option-C2").innerHTML = 
            questions[questionNum].answers.c;
            document.querySelector(".option-D2").innerHTML = 
            questions[questionNum].answers.d;
    
            //Let's check if the next question has been answered...
            //If it has,
            if (questions[questionNum].answered = true) {
                //Loop through all the question options elements,
                for (var i = 0; i < answerOptions2.length; i++) {
                    //remove the wrongAnswer class from anyone that has it
                    answerOptions2[i].classList.remove("wrongAnswer");
                    //remove the correctAnswer class from anyone that has it
                    answerOptions2[i].classList.remove("correctAnswer");
    
                    //After that, add the wrongAnswer class to the
                    //question option that matches what the user selected previously 
                    if (answerOptions2[i].innerText.charAt(0) === usersAnswer[questionNum]){
                        answerOptions2[i].classList.add("wrongAnswer");
                    }
                    //Then highlight the correct answer by adding
                    //the correctAnswer class to the correct option
                    if (answerOptions2[i].innerText.charAt(0) === questions[questionNum].correctAnswer){
                        //First, remove the wrongAnswer class from it, if any,
                        answerOptions2[i].classList.remove("wrongAnswer");
                        //before adding the correctAnswer class
                        answerOptions2[i].classList.add("correctAnswer");
                    }
                }
            }  

            //If user gets to the beginning of the question,
            //disable the Previous button
            if (questionNum === 0) {
                previousBtn2.disabled = true;
            }
        }

        //When the Result button is pressed, go back to 
        //the Quiz Result Page
        resultBtn.onclick = ()=> {
            //Close the Quiz Correction Page using a slide-fadeOut effect
            quizCorrectionPage.classList.replace("slide-fadeIn","slide-fadeOut");
            setTimeout(function(){
                quizCorrectionPage.style.display = "none";
            },500);
    
            //Then show the Quiz Result Page using a slide-fadeIn effect
            setTimeout(function(){
                quizResultPage.style.display = "block";
            },500);
            setTimeout(function(){
                quizResultPage.classList.add("slide-fadeIn");
            },550);
        }
        

    }
    
    //When the About button is clicked,
    aboutBtn.onclick = ()=> {
        //Open the Modal
        openModal();

        //Change the Modal Title to this:
        modalTitle.innerHTML = "About";
        //Change the Modal info to this:
        modalInfo.innerHTML = 
        `<div class="infoCont">
        <p>
            <b>Developer:</b> 
        </p>
        <p>
            Mark Friday Chimaobi
        </p>
        <p>
            <b>Email:</b> 
        </p>
        <p>
            davidmarkfriday16@gmail.com
        </p>
        <p>
            <b>WhatsApp:</b> 
        </p>
        <p>
            +2348072157818
        </p></br>
        <p>
            <b>Date Started:</b> Sat. 12th Feb, 2022 
        </p>
        <p>
            <b>Date Completed:</b> Thurs. 26th Feb, 2022
        </p>
        </div>
        <style>
            .infoCont p {
                font-size: 18px;
            }
        </style>`;
        

        //and remove the buttons inside the Modal, since
        //we don't need it here
        modalControlsContainer.innerHTML = "";

    }
    
}
/*

    Am glad that I am finally done with 
    this Quiz App project.

    I've always seen myself as not been too 
    good enough to create a project such as this,
    but I decided to give it a try and I've proved
    to myself that I can do it.

    While creating this project, I have learn't
    and improved more on my HTML, CSS and JavaScript
    knowledge.

    I won't stop here. I will keep improving.

    - Mark Friday Chimaobi
    - 26th February, 2022

*/
    
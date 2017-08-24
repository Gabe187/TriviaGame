// DECLARE GLOBAL VARIABLES

//  This code will run as soon as the page loads so the buttons are ready to receive input.
window.onload = function() {

	//  Click events are done for us:
	$("#submit").click(timer.submit);
	$("#start").click(timer.start);
};

// Declaring the scoring variables (correct, incorrect, & unanswered)
var correct = 0;
var incorrect = 0;
var questionCount = 0;
var unanswered = 0;

//  Variable that will hold our setInterval that runs the timer
var intervalId;

//prevents the timer from being sped up unnecessarily if start button is clicked AFTER the timer has already started.
var timerRunning = false;

// Our timer object
var timer = {

	time: 120,

	start: function() {

		// DONE: Use setInterval to start the count here and set the clock to running.
		if (!timerRunning) {
			intervalId = setInterval(timer.count, 1000);
			timerRunning = true;
			renderQuestions();
		}
	},

	count: function() {

		// DONE: increment time by 1, 
		timer.time--;

		// Display the timer in the "timer-display" div.
		$("#timer-display").html(timer.time);
	},

	submit: function() {

		//Stops the timer and displays "0" to the user
		clearInterval(intervalId);
		timerRunning = false;
		timer.time = 0;
		$("#timer-display").html(timer.time);

		//This will be the function to stop the timer and then calculate the results.

	},

};


// FUNCTIONS
function renderQuestions () {

	var threeQuestions = [
		{
			question: "When was the Coast Guard founded?",
			answerOptions: ["1790", "1806", "1655", "1941"],
			correctAnswer: "1790",
		},
		{
			question: "Who was the first Secretary of Treasury in charge of the Coast Guard?",
			answerOptions: ["Aaron Burr", "Steven Mnunchin", "Alexander Hamilton", "James Guthrie"],
			correctAnswer: "Alexander Hamilton",
		},
		{
			question: "What is the training ship of the Coast Guard?",
			answerOptions: ["Eagle", "Hawk", "Neptune", "Intrepid"],
			correctAnswer: "Eagle",
		},
	];

	// Console log 3 questions
	//for (var i = 0; i < threeQuestions.length; i++) {
	console.log(threeQuestions[questionCount].question);
	$("#questions").append(threeQuestions[questionCount].question,"<br>");

	// TRY THIS TO MAKE THE ANSWER CLICKABLE:  Put a for loop inside of a for loop to assign buttons for each answer & assign the "right answer" to the buttons (similar to assigning the random numbers to the crystal images), using the "attr".  That should do it!!

	// fill the div "answers" with answer options for the specific question
	$("#answers").html("");
	for (var i2 = 0; i2 < 4; i2++) {

		// For each iteration, create an imageButton
		var imageButton = $("<img>");

		// Each button receives the class ".button-image" so they are all the same size.
		imageButton.addClass("button-image");

	    // Each imageButton will be given a src link to the button image in the assets folder
	    imageButton.attr("src", "assets/images/Coast_Guard_button.png");

	    // Each imageButton will be given a data attribute called data-answervalue from the threeQuestions.
	    imageButton.attr("data-answervalue", threeQuestions[questionCount].answerOptions[i2]);

	    // Lastly, each crystal image (with all it classes and attributes) will be rendered to the page.
	    $("#answers").append(imageButton);
	    $("#answers").append(threeQuestions[questionCount].answerOptions[i2]);
	    console.log(threeQuestions[questionCount].answerOptions[i2]);
	};

	// This is the click function to select an answer.
 	$(".button-image").on("click", function() {

	    // Pull value from data attribute of the clicked crystal and convert into an interger (vs. string from the attribut).    
	    var answerChoice = ($(this).attr("data-answervalue"));
	    
	    // Update the Total score value for the user to see
	    console.log(answerChoice);

		if (answerChoice === threeQuestions[questionCount].correctAnswer) {

			correct++;
			questionCount++;
			//unanswered--;
			console.log(correct);
			$("#total-correct").html(correct);

			//check to see if all questions were asked.  If so, then complete the game; otherwise, render the next question.
			if (questionCount === threeQuestions.length) {
				clearInterval(intervalId);
				timerRunning = false;
				timer.time = 0;
				$("#timer-display").html(timer.time);
			} else {
				renderQuestions();
			};

		} else {

			incorrect++;
			questionCount++;
			//unanswered = ;
			console.log(incorrect);
			$("#total-incorrect").html(incorrect);

			//check to see if all questions were asked.  If so, then complete the game; otherwise, render the next question.
			if (questionCount === threeQuestions.length) {
				clearInterval(intervalId);
				timerRunning = false;
				timer.time = 0;
				$("#timer-display").html(timer.time);
			} else {
				renderQuestions();
			};

		} 

	});

};




// PROCESSES


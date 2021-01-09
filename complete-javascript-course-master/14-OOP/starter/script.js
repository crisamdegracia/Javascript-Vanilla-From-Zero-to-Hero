'use strict';

// Function constructor

/*
//Constructor
var Person = function(firstname, birthPlace, job) {
	this.firstname = firstname;
	this.birthPlace = birthPlace;
	this.job = job;
}

//because we use mark as new Person. we can now use the 
//variable we created in Person object
var mark = new Person('Mark', 1990, 'Designer')
console.log(mark.firstname)


//we create a function prototype on the fly
//so now mark can use it, because we create a new Person for him 
Person.prototype.calculateAge = function (){
	console.log( 2021 - this.birthPlace );
}

mark.calculateAge()
*/

//Object.create

// var personProto = {
// 	calculateAge: function(){
// 		console.log(2021 - this.yearOfBirth)
// 	}
// };
// Two ways

// var john = Object.create(personProto);
// john.name = 'John';
// john.yearOfBirth = 1990;
// john.job = 'Teacher';

// var jane = Object.create(personProto, {
// 	name: {value: 'Jane'},
// 	yearOfBirth: {value: 1968},
// 	job: {value: 'I.T'}
// })

// Both share personProto
/* 
The difference between object.create and function constructor

- is that the object.create builds an object that inherits directly
	from the one that we passed into the first argument.
- while function constructor - the newly created object inherits
	from the constructor's prototype
*/

// Primitives vs Objects
/* 
The big difference between Primitive and Objects
	is that variables containing primitives actually hold
	that data inside of variable itself 

On objects it very different 
	variable associated with objects DO NOT actually containing
	the object -- but instead they contain a reference to the
	place in memory where the objects sessionStorage, so where the
	objects stored

- AGAIN -
	a variable declared as an object
	does not have a real copy of the object 
	it points to that object! AHA! */

/* 
	Functions returning function
	

	function interviewJobs(job){
		if(job === 'designer'){
			return function(name){
				console.log(name + ', can you please explain that UX design is?');
			}
		}
		else if( job === 'teacher'){
			return function(name){
				console.log('What subject do you teach ' + name + '?');
			}
		} else {
			return function(name){
				console.log('Hello ' + name + ', what do you do?');
			}
		}
	}

	// store them in variable so we can us the name on returning function

	var teacherQuestion = interviewJobs('teacher');
	var designerQuestion = interviewJobs('designer');

	teacherQuestion('John');
	designerQuestion('Mark');

	interviewJobs('teacher')('Grace');

	*/

/* 
	CLOSURE - an inner function has always access to the variable
	and parameters of its outer function, even after the outer function
	has returned	

		- even after return or remove from the execution context
		the outer function can still have an access to the function
		and that is called CLOSURE


function retirement(retirementAge) {
  var a = ' years left until retirement.';

  return function (yearOfBirth) {
    var age = 2021 - yearOfBirth;
    console.log(retirementAge - age + a);
  };
}

//two ways to call

//1
var retirementUS = retirement(66);
retirementUS(1990);
var retirementGermany = retirement(65);
retirementGermany(2020);
var retirementIceland = retirement(67);
retirementIceland(1990);
//2
retirement(66)(1990);



function interviewJobs(jobs){
	var designer = ' Can you please explain what UX is?';
	var teacher  = ' What subject do you teach? ';
	var noOne 	= ' Hello, what do you do? ';

	return function(name){
		if(jobs == 'designer'){
			console.log(name + designer);
		}else if(jobs == 'teacher'){
			console.log(teacher + name);
		} else {
			console.log(noOne + name)
		}
	}
}

var interviewDesigner = interviewJobs('designer');
interviewDesigner('John');
var interviewTeacher = interviewJobs('teacher');
interviewTeacher('Merry'); 
	*/



	var john = {
		name: 'John',
		age: 17,
		job: 'Designer',
		presentation: function(style, timeOfDay){
			if(style === 'formal'){
				console.log("Good " + timeOfDay + ", Ladies and gentlemen! I'm " + this.name + ', I\'m a ' + this.job + " and I'm " + this.age + " years old." );

			} else if (style === 'friendly' ){
				console.log('Hey! What\'s up? I\'m '+ this.name + ', I\'m a ' + this.job + " and I'm " + this.age + " years old. Have a nice " + timeOfDay);
			}
		}

	};

	var emily = {
		name: 'Emily',
		job: 'Teacher',
		age: 22
	}

	// we will use bind method to create a function, with preset argument
	//the preset argument is the 'friendly
	//the 1st argument is the 'this' 
	var johnFrendly = john.presentation.bind(john, 'friendly');

	johnFrendly('lorem lorem');


	john.presentation('formal','Morning');


	//call() - as method borrowing - we borrowed method from john
	john.presentation.call(emily, 'friendly', 'noon');

	// apply() - this arguments accepts as array 
	// - 2 arguments- 1st variable is 'this' and then  next is an array where all other arguments go

	john.presentation.apply(emily, ['friendly', 'Darkest day']);

	/* 

			  not john
	call(this(emliy), arg1, arg2) - the first argument of call method is always to set the 'this' variable
		- it allow us to set this variable on 1st argument. so we can borrow other method
	
	apply() - this arguments accepts as array 
			- 2 arguments- 1st variable is 'this' and then  next is an array where all other arguments go
	bind() - doesnt immediatly call the function, but instead it generates a copy of a function
			- so that we can store it somewhere
			- useful for function with preset argument
			- it will return a function() - so we have to store  it at function somewhere
			*/
/* 
Summary
1. We create the module patter
	1. budgetController
	2. UIcontroller
	3. controller   <- Global app controller
		3a. we give budgetController and UIcontroller as argument 
2. We add addEventlistener for enter and add button
3. we create a function when we press enter and add button.  ctrlAddItem();
4. On UIcontroller - we create a method to get a value and return them. getInput() - type, description, value
5. Now on controller we pass the value.
6. SERIOUS -
		--BEFORE----------------------------
		//not a good practice daw kasi kapag nag palit daw ng name we will also change each string manually
		//so we simply create an object to store all the data

			getInput: function(){
				return {

					type : document.querySelector('.add__type').value, 
					description : document.querySelector('.add__description').value,
					value : document.querySelector('.add__value').value
				}
			}
	6a. So, we create var and call DOMstrings
			
	--AFTER--------------------
	var DOMstring = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value' }
return {
		getInput: function(){
			return {
				 type : document.querySelector(DOMstring.inputType).value, ////income or expenses
				 description : document.querySelector(DOMstring.inputDescription).value,
				 value : document.querySelector(DOMstring.inputValue).value
			}
	}
	We create object and replaced all the string values.
	---AFTER END------
7. we also add   addBtn: '.add__btn' to the DOMstring method and made it public by create getDOMstring returning it in UIContoller.
	7a. so the eventListener string value of CSS name .add__btn will be easier to change in the future
8. Now we create a function on controller() for all of our eventlistener  -var setupEventListeners()
	8a. we also put var DOM = UICtrl.getDOMstrings(); inside because we only want to trigger the value on event listeners
9. We now return init() function on controller. to call all the eventListener. then finally, outside this 3 objects (budget controller,uicontroller,controller) we call it. controll.init()
10. We need a data model to store data for expenses and income and set this up on budgetController();
	10a. so we create a function constructor for Expense and Income
	10b. its always better to create one data to store all our data instead of having a lot of random variables flowing around
		10ba. so we create one big structure for everything 
		10bb. and we call it var data {} and create all items inside it with expenses and income and total with expenses and income
11. f6v10 - how to avoid conflicts and how to pass data from one module to another
	11a. we create a public method in the budget controller, thats gonna allow other modules to add a new item into our data structure
	11b. so we will create a return an object{addItem} which is gonna contain all of our public methods
	11c. then on function body if someone calls this method
	11d. what type? is it expenses or income., description, and value 
	11e. now we add or create a new type (expense or income)  so if expense create new expense. else if income create new income
		11ea. if type is exp then create, if income then create.
			if(type === 'exp'){
				newItem new Expense(ID, des, val);
			} else if (type === 'inc'){
				newItem new Income(ID, des, val);
			}
		11ea. then we will store them
		data.allItems[type].push(newItem);
			11eaa. to read this. data.allITems[inc or exp].push( allItems );
	11f. VERY POWERFUL NABALIW NAKO DITO KAKAINTINDI
	11g. we will also return the newItem; so the other module or methods daw will have a direct aceess to the new items
	11h. ID explained. kung ung id daw is based on length. so ID[1,2,3,4,5]  the next id is 6 -> ID[1,2,3,4,5,6]. pero daw mag dedelet tayo ng ietm based on ID. at hindi daw pwede
		11ha. hindi daw pwede maulit ung mga ID nayon. so ang simple solution is last ID + 1
		11hb. how to add the ID daw - sabi nya 1st come in mind daw is to get the length of the already existing array then add 1 ( existing array length + 1)
		11hc. the big problem with the solution in 11hb. is later on we will delete 1 item from them.
		11hd. the ID must only exist once 
		11he. so the solution is the LAST ID + 1  - so base on array index number, if the array has 6 in it so the last number is 5 .becoz its zero base
		11hf. so (array.length -1) + 1 
	11g. then we will store the new objects in variable 
		11ga. add the item to the budget controller
				var	budgetCtrl.addItem(input.type, input.description, input.value);
12. f6v11 - 1, A teknik for adding big chunks of HTML into the DOM : 2, How to replace Parts of string : 3, How to do DOM manipulation using insertAdjacentHTML method
	12a. We create addListem in budgetController for HTML chunk of code, if the type is income of expenses -- to display to the UI
	12b. to replace the actual data with some placeholder - %id% , %value% , %description%
	12c. kasi daw pag pumunta tayo dun sa actual data. we can replace with the actual data
	12d. we add element in UIController to DOMStrings - incomeContainer - ExpenseContainer
	12e. then we create var element to decide which container will we insert the chunk HTML
			12ea. 
			if(type === 'inc'){
				element = DOMstring.incomeContainer;
				html = ;
				} else if (type === 'exp') {
				element = DOMstring.expenseContainer;
					html = ;
			}
			
			//Replace placeholder text with actual data
			// replace('what data to be replace' , 'the data to insert')
			// sa 2nd newHTML na, kasi ung una na html napalitan na don dun value, so it doesnt exist na. so newHTML na sya GETS?
			newHTML = html.replace('%id%', obj.id);
			newHTML = newHTML.replace('%description%', obj.description);
			newHTML = newHTML.replace('%value%', obj.value);
			


			// Insert the HTML into the DOM
			// search how to use insertAdjacentHTML();
			// beforeend -meaning it will be insert as a last child of the income__list or expense__list
			//beforebegin  - it will be inserted as a sibling . not a child, and before the PARENT element
			//afterend			- will be inserted as sibling but after the previous element
			document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

	12f. then we will now append it in the webpage
	12g. then we call it on controller() 
			12ga. 
				//3. add the item to the ui
				//newITEM - the argument here is the new item that created before
				//input.type = ung ininput ng user, fresh from the input field this is
				UICtrl.addListItem(newItem, input.type);
13. f6v12 - Clearing Our input fields
		- How to clear HTML fields, How to use querySelectorAll, How to convert a list to an  array, A better way to loop over an array then for loops: for each
		13x. Clear input field - 
		13x. use slice() to return a copy of the array - but another array
		13a. we create a return method on UIController named. clearFields() then use querySelectorAll
			13ab. it hold the result of the selection 
				13aba. problem it does return a nice array. which we can the use and loop over. but it return something similar but still different.that's a list
				13abb. solution to, convert the list to an array. so we use SLICE() 
				13abc. call the slice() using call() - then passing the fields var into it -- so that it becomes the 'this' variable
				13abd. where is slice method actually stored?
					13abda. its in the array.prototype
						13xxx. Array  - is a function contructor for all arrays
						13xxx. so we know that all the function that we inherit from the array function constructors are in the array prototype property.
							13xxxx. there the slice method must also be there
				13xxxx.  fieldsArr = Array.prototype.slice.call(fields);

						//pass a callback function  into this method
						//then the callback() will be applied to each of the element in the array
						//this anonymous function() can recieved up to 3 arguments
						// we have automatic access to the event object -- and we can name as we wanted.
						// current - so here we have access to the current value, -- current value of the input field of the current value being proccessed
						// index - zero to the length minus 1 
						//array - the entire array
						fieldsArr.forEach(function(current, index, array ){
							current.value = '';
						})

			13xx.. THEN BOOM! the fields are now empty when element added!
			13xx. set to focus the first element of the array.
						fieldsArr[0].focus();
14. f6v13. How to convert field inputs to numbers, How to prevent false input
  14a. we create updateBudget() in controller module
  14b. its value will be on getInput() - value : farseFloat() -  on budgetControl
  14c. PROBLEM. when user keep click add button, it will add empty listing on the fields
  14d. SOLUTION:  
		14da. these methods will only execute the input value is not empty.
		 if (!isNaN(input.value) && input.description !== "" && input.value > 0) {

			  newItem = budgetCtrl()
			  UICtrl.addListITem(newItem, input.type);
			  UICtrl.clearFields()
			  updateBudget()
			}
15. f6v14 - How and Why to create simple reusable function with only one purpose, How to sum all elements of an array using the forEach method
   15a. we create calculateBudget: on budgetController
   15b. we also create var calculateTotal = function(type)
	15c. so all item are store daw in data.allItems{[]}
		15ca. 1st thing we need to do is create sum variable - which store the sum
	15d. we create a global object on budget controller data.budget
	15e. we now call it on  controller() - so para gumana
			var updateBudget = function () {
	
				budgetCtrl.calculateBudget(); }
				--------------------

					calculateBudget: function(){

			calculateTotal('exp');
			calculateTotal('inc');

			data.budget = data.totals.inc - data.totals.exp

			data.percentage = Math.round(( data.totals.exp / data.totals.inc ) * 100);

			//Expense = 100 and income 200, spent 50% = 100/200 = 0.5 * 100

	15f. then we return a function
		getBudget: function(){
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: percentage
			}
		}
		},

16. f6v15 - Updating the budget UIController : Practice DOM manipulation by updating the budget and total values.
  16a. we create    displayBudget: function(obj){ on UIController - to display on front-end
  16b. create strings -> 
  	    budgetLabel: ".budget__value",
		incomeLabel: ".budget__income--value",
		expenseLabel: ".budget__expenses--value",
		percentageLabel: ".budget__expenses--percentage"
  16c. then create this
			document.querySelector(DOMstring.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMstring.incomeLabel).textContent = obj.totalInc;
			document.querySelector(DOMstring.expenseLabel).textContent = obj.totalExp;
			document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage;
  16d. then call it on controller()
	 -> UICtrl.displayBudget(budget);
	 16a. now the UI on front end changes! WOW!
  16e. PROBLEM. when adding only expenses. the ui giving us -1 value. that we dont want.
  16f. Solution  - we put the obj.percentage on if else statement - else kung walang laman show nothing
	
			if(obj.percentage > 0 ){
				document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage + '%';
			} else {
				document.querySelector(DOMstring.percentageLabel).textContent = '';
			}
  16g. then we change the init(). so when the application started the value on fronend UI is zero
				//we want everything to reset to zero
			// pass the object and change the value to zero
			// percentage is same as the value above
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1,
			});
17. f6v17 - Event delegation - 
			Event Bubbling - when the event is fired or triggered on some DOM element,
				- example. the button was pressed . 
				- then the exact same event is also triggered on all of the parent elements
				- again, the event only from btn but then it will also be fired on all the parent element
				- it will also fire on the paragraph
				- to the section the main element and actually all the way up to the DOM tree until 
				- the HTML element which is the root
				- that is why its called event bubling
				Event Bubling - kung pag press daw ng button it will take effec	
18. f6v18 - Setting up the DELETE EVENT Listener using EVENT DELEGATION
    - How to use event delegation in practice | How to use IDs in HTML tp connect the UI wiht datamodel | How to use the parentNode property for DOM traversing

	18a. we create event handle on controller()

	document.querySelector(DOMstring.container)
	18b. 	console.log(event.target.parentNode);   <- ung parent ung ibbgay na result
				console.log(event.target.parentNode.parentNode.parentNode.parentNode); 
				- pwede daw mas maraming beses til mareach mo ung desired mo na parent element
				itemID = console.log(event.target.parentNode.parentNode.parentNode.parentNode.id = it gives us the ID atrributes
				   - tapos ilagay natin sa variable

					// so gagana daw kung merong ID ung kin-click na element kaya nag set ng if statement
		if(itemID){
				//inc-1
				// then it will be splited like this (   ['inc', '1']  )
				splitID = itemID.split('-');
				//eto ung na split sa splitID nilagay sa variable
				type = splitID[0]; // inc or exp	
				ID = parseInt(splitID[1]); tapos iconvert natin sa integer

		}

19. f6v19 - Deleting an Item from our Budget Controller
		- another method to loop an array: map; | How to remove elements from an array using splice method.
		- hindi ko na input dito
		- pero nag start un sa pag create natin ng 
			deleteItem : function(type, id){
			var ids, index;

			then to be called sa controller
	

20. f6v20 - Deleting an Item from the Ui
	- More DOM manipulation, how to remove an element from the DOM
	20a. we create on UIController  deleteListITem() 
			deleteListItem: function(){
			
			var el = document.getElementById(selectorID);

			el.parentNode.removeChild(el);


		}
	20b. now we call it on controller()
		-inside ctrlDeleteItem, then call updatebudget() so the UI will be updated


21. f6v22 Updating the percentages Controller
		- Reinforcing the concepts and techniques we have learned so far.
	21a. we create updatePercentages on controller(); 

	21b. then we add it inside ctrlAddItem() - to calculate and update the percentages

22. f6v23. Updating the percentages budget controller
  - How to make our budget controller interact with Expense prototype.
  22a. add method to our budgetController()

  22b. we create prototype then create property percentage = -1  // to hold the value of the prototype function
	  Expense.prototype.calcPercentage = function(totalIncome){
  23. just read the code okay?
  24. we create a prototype to calculate it then we create a prototype to return it. bat kaya hindi nalang calculate and return no?

	};
23. f6v24. Updadting the oercentages UI Controller
  - How to create our own forEach function but for nodeList instead of arrays.

  - add new method in UIController()  displayPercentages(percentages)
  - we get frontend CSS .item__percentages
  23a. var fields = document.querySelectorAll(DOMstring.expensesPercLabel)
	   23aa. it will return a list and actually called nodeList
	   23ab. the nodeList doesnot have forEach method
	   23c. we then create now our own forEach. just check that out	
	   24c. now gumana na ung percentage
	   
24. f6v25 - Formatting our Budget Numbers String Manipulation
  - How to use different string methods to manipulate strings
 24a. we create formatNumber() in UIController()	
  Math.abs() - absolute number - absolute simply removes the sign of the number
	.toFixed() - a method of number prototype
		- becoz string number also have methods
  24b. int = int.substr(0, int.length -3 ) + ',' + int.substr(int.length - 3, int.length )
	 - that is WTF
	 - newHTML = newHTML.replace("%value%",this.formatNumber obj.value);
  24c. we wil also change the UI in the TOP
 	document.querySelector(DOMstring.budgetLabel).textContent = formatNumber(obj.budget, type) ;
	document.querySelector(DOMstring.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc' );
	document.querySelector(DOMstring.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
					
25. f6v26 Displaying the current Month and YEar
  - How to get current data by using the Date object constructor
  25a. we create displayMonth() on CtrlBudget()
  25b. we create DOMString dateLabel
  25c every new Date() constructor has getFulYear and just check it.

26. f6v27 - Finishing Touches Improving the UX
	- when to Use Change Events

	- created eventListener('change' , ) in controller()
	- then created the function changedType() in UIController
	- then we change the position of 	
	
	ALL DONE!
	*/

var budgetController = (function () {
	// a private functions
	// function constructor
	var Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calcPercentage = function (totalIncome) {
		if (totalIncome > 0) {
			this.percentage = Math.round((this.value / totalIncome) * 100);
		} else {
			this.percentage = -1;
		}
	};

	Expense.prototype.getPercentage = function () {
		return this.percentage;
	};

	// function constructor
	var Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	//this will be stored in global data structure
	var calculateTotal = function (type) {
		var sum = 0;

		data.allItems[type].forEach(function (cur) {
			//sum = previous sum + the current value
			sum += cur.value;
		});

		data.totals[type] = sum;
	};

	var data = {
		allItems: {
			exp: [],
			inc: [],
		},
		totals: {
			exp: 0,
			inc: 0,
		},
		budget: 0,
		percentage: -1,
	};

	//GRABEE!
	return {
		addItem: function (type, des, val) {
			var newItem, ID;

			//1st we will select the last element - data.allItems[inc or exp]
			//2nd is the last one??? - the last one is length minus 1
			//need daw natin to to select new item
			if (data.allItems.length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			// remember all of this item will be store in the data
			if (type === "exp") {
				newItem = new Expense(ID, des, val);
			} else if (type === "inc") {
				newItem = new Income(ID, des, val);
			}

			if (newItem) {
				data.allItems[type].push(newItem);
			}
			//after storing them push it to the data
			//return new element
			return newItem;
		},

		//to be called by budgetController
		deleteItem: function (type, id) {
			var ids, index;
			// id = 6
			//data.allItems[type][id]
			// ids = [1, 2, 3, 6, 8];
			//index = 3

			//diferrence of map and foreach - map returns a brandnew array

			ids = data.allItems[type].map(function (current) {
				return current.id;
			});

			//after executing the map() we wud endup with this array ids = [1, 2, 3, 6, 8];
			//it will return the index number of the element of the array the we put here which is the (id);
			index = ids.indexOf(id);

			//will delete
			if (index !== -1) {
				//while slice - use to create a copy
				//splice - to remove elements
				//1st arg, when we start deleting
				//2nd the number of elements we want to delete
				data.allItems[type].splice(index, 1);
			}
		},

		//calculate the sum of all income and expenses
		// total income and total expenses
		calculateBudget: function () {
			//calculate total income and expenses
			calculateTotal("exp");
			calculateTotal("inc");

			//calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp;

			if (data.totals.inc > 0) {
				//calculate the percentage of income that we spent
				data.percentage = Math.round(
					(data.totals.exp / data.totals.inc) * 100
				);
			} else {
				data.percentage = -1;
			}

			//Expense = 100 and income 200, spent 50% = 100/200 = 0.5 * 100
		},

		calculatePercentages: function () {
			/* how wud it work
			a=20, b=10, c=40 | income = 100 | a=20%/100 = 20% | b=10/100=10% | c=40/100= 40%
			*/
			//now  we can the method that we just wrote for each of the elements in the array in our data structure

			//what we want to happen to each element
			//what we want to happen to each is to call the calcPercentage method
			// this will calculate percentage for each and every expense that we have in our project
			data.allItems.exp.forEach(function (cur) {
				cur.calcPercentage(data.totals.inc);
			});
		},
		//we need to loop over all of our expenses
		// map returns something and stores it in a variable while forEach does not
		getPercentages: function () {
			var allPerc = data.allItems.exp.map(function (cur) {
				//imagin daw we have 5 arrays in exp or in our expenses array
				//it will return what we stored in allPerc variable
				return cur.getPercentage(); // so this daw we get called 5 times /for each of the element

				//return it then store it daw
			});

			return allPerc;
		},
		getBudget: function () {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage,
			};
		},
	};
})(); // BUDGET Controller

//These Controller dont know each other. REALLY? LOL

// a function that we want to use to other controller -- cannot be a private function -- so its a public method
var UIController = (function () {
	//so when we decide to change the string name, we will just go here and change this piece of code! OMOSHIROI!
	var DOMstring = {
		inputType: ".add__type",
		inputDescription: ".add__description",
		inputValue: ".add__value",
		inputBtn: ".add__btn",
		incomeContainer: ".income__list",
		expenseContainer: ".expenses__list",
		budgetLabel: ".budget__value",
		incomeLabel: ".budget__income--value",
		expenseLabel: ".budget__expenses--value",
		percentageLabel: ".budget__expenses--percentage",
		container: ".container",
		expensePercLabel: ".item__percentage",
		dateLabel: ".budget__title--month",
	};
	//lahat ng nasa return is public function
	//kaya nasa labas ng return to is kasi private function
	//if expense we want to prepen minus sign, if income plus sign
	var formatNumber = function (num, type) {
		var numSplit, int, dec, type;
		/* 
+ or - before number
exactly 2 decimal points
comma separating the thousands

example. -> 2310.4567 -> + 2,310.46 -  we give comma and round them
		- 2000 -> 2,000.00
		Math.abs - Math absolute - removes the sign of the number
		*/
		num = Math.abs(num);
		//toFixed(2) - example  - (2).toFixed(2) -->> 2.00
		num = num.toFixed(2);

		//then split 2.00 - >> [2, 00]
		numSplit = num.split(".");
		//now we store them separately
		int = numSplit[0];

		//to add a comma if we have a thousand
		if (int.length > 3) {
			//1st arg wher we want to start, 2nd how many character we want
			//(0,1) gives us the 1st part of the number
			int =
				int.substr(0, int.length - 3) +
				"," +
				int.substr(int.length - 3, 3); //input 2310, output 2,310
		}
		dec = numSplit[1];

		// if the type is exp else inc then output the sign, int + decimals
		return (type === "exp" ? "-" : "+") + " " + int + "." + dec;
	};



		//we will create our own forEach()
		var nodeListForEach = function (list, callback) {
			for (var i = 0; i < list.length; i++) {
				//when we call nodeListForEach(), we will pass a callback function into it
				//the callback function parameter is the nodeListForEach we created

				callback(list[i], i);
			}
		};


	return {
		getInput: function () {
			//Remember that the contoller is going to call this method to recieve back all the values thats why we need to return a value
			return {
				//not a good practice daw kasi kapag nag palit daw ng name we will also change each string manually
				//so we simply create an object to store the data
				type: document.querySelector(DOMstring.inputType).value, ////income or expenses
				description: document.querySelector(DOMstring.inputDescription)
					.value,
				value: parseFloat(
					document.querySelector(DOMstring.inputValue).value
				),
			};
		},

		//obj is the same ibject that we created using the function constructor and then passed to our app controller in the last lecture
		addListItem: function (obj, type) {
			var html, newHTML, element;
			//Create HTML string wiht place holder text

			if (type === "inc") {
				element = DOMstring.incomeContainer;
				html =
					'<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === "exp") {
				element = DOMstring.expenseContainer;
				html =
					'<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			//Replace placeholder text with actual data
			// replace('what data to be replace' , 'the data to insert')
			// sa 2nd newHTML na, kasi ung una na html napalitan na don dun value, so it doesnt exist na. so newHTML na sya GETS?
			newHTML = html.replace("%id%", obj.id);
			newHTML = newHTML.replace("%description%", obj.description);
			newHTML = newHTML.replace("%value%", formatNumber(obj.value, type)); // pinalitan sa f6v25 16: 30
			// now when we hit the job.value with the type. they will be formated

			// Insert the HTML into the DOM
			// search how to use insertAdjacentHTML();
			// beforeend -meaning it will be insert as a last child of the income__list or expense__list
			//beforebegin  - it will be inserted as a sibling . not a child, and before the PARENT element
			//afterend			- will be inserted as sibling but after the previous element
			document
				.querySelector(element)
				.insertAdjacentHTML("beforeend", newHTML);
		},

		deleteListItem: function (selectorID) {
			//to remove child method so we must know the parent element
			// document.getElementById(selectorID).parentNode.removeChild();

			var el = document.getElementById(selectorID);

			el.parentNode.removeChild(el);
		},

		clearFields: function () {
			var fields, fieldsArr;

			// holds the result of the selection 					// the syntax here daw is like CSS  selecting
			fields = document.querySelectorAll(
				DOMstring.inputDescription + ", " + DOMstring.inputValue
			);

			//since it a function we can then use the CALL() method on it
			// this will trick the slice method into thinking, that we give it an array and so it will return an array.
			//we can now loop over and clear the fields that were selected.
			fieldsArr = Array.prototype.slice.call(fields);

			//pass a callback function  into this method
			//then the callback() will be applied to each of the element in the array
			//this anonymous function() can recieved up to 3 arguments
			// we have automatic access to the event object -- and we can name as we wanted.
			// current - so here we have access to the current value, -- current value of the input field of the current value being proccessed
			// index - zero to the length minus 1
			//array - the entire array
			fieldsArr.forEach(function (current, index, array) {
				current.value = "";
			});

			//set to focus the 1st element of the array
			fieldsArr[0].focus();
		},

		displayBudget: function (obj) {
			obj.budget > 0 ? (type = "inc") : (type = "exp");

			//hindi daw ung HTML papalitan, ung content lang
			document.querySelector(
				DOMstring.budgetLabel
			).textContent = formatNumber(obj.budget, type);
			document.querySelector(
				DOMstring.incomeLabel
			).textContent = formatNumber(obj.totalInc, "inc");
			document.querySelector(
				DOMstring.expenseLabel
			).textContent = formatNumber(obj.totalExp, "exp");
			// document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage;

			if (obj.percentage > 0) {
				document.querySelector(DOMstring.percentageLabel).textContent =
					obj.percentage + "%";
			} else {
				document.querySelector(DOMstring.percentageLabel).textContent =
					"---";
			}
		},

		displayPercentages: function (percentages) {
			var fields = document.querySelectorAll(DOMstring.expensePercLabel);

		
			nodeListForEach(fields, function (current, index) {
				if (percentages[index] > 0) {
					current.textContent = percentages[index] + "%";
				} else {
					current.textContent = "----";
				}
			});
		},

		displayMonth: function () {
			var now, month, year;

			now = new Date();
			months = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"Septembe",
				"November",
				"December",
			];
			month = now.getMonth();
			year = now.getFullYear();
			document.querySelector(DOMstring.dateLabel).textContent =
				months[month] + " " + year;
		},

		changedType: function () {
			var fields = document.querySelectorAll(
				DOMstring.inputType+ ',' +
				DOMstring.inputDescription + ',' +
				DOMstring.inputValue);
			

				nodeListForEach(fields, function(cur){
					cur.classList.toggle('red-focus');
				});

				document.querySelector(DOMstring.inputBtn).classList.toggle('red')
		},

		//we also made public the DOMstring which has the values of value,description, and type
		//and let the controller() get an access to it
		getDOMstrings: function () {
			return DOMstring;
		},
	};
})(); // UI CONTROLLER

//--------------------------------------------------------------------------

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
	var setupEventListeners = function () {
		//this is also inside becoz we only need it in eventListener
		var DOM = UICtrl.getDOMstrings();
		//when add button clicks
		document
			.querySelector(DOM.inputBtn)
			.addEventListener("click", ctrlAddItem);

		//when enter is pressed
		document.addEventListener("keypress", function (e) {
			//some browser doesnt use keyCode, so we use which -> e.which === 13
			if (e.keyCode === 13 || e.which === 13) {
				ctrlAddItem();
			}
		});

		document
			.querySelector(DOM.container)
			.addEventListener("click", ctrlDeleteItem);

		document
			.querySelector(DOM.inputType)
			.addEventListener("change", UICtrl.changedType);
	};

	var updateBudget = function () {
		//1. calculate the budget
		budgetCtrl.calculateBudget();
		//2.return the budget

		var budget = budgetCtrl.getBudget();

		//3.display the budget on UI
		UICtrl.displayBudget(budget);
	};

	var updatePercentages = function () {
		//1. Calculate percentages
		budgetCtrl.calculatePercentages();
		//2. Read percentages from the budget controller
		var percentages = budgetCtrl.getPercentages();

		//3. Update the UI with the new percentages
		UICtrl.displayPercentages(percentages);
	};

	//this is a private function and not exposed to the public
	var ctrlAddItem = function () {
		var newItem, input;

		//1.get the field input data
		input = UIController.getInput();

		// console.log(input.type, input.description, input.value);

		if (
			!isNaN(input.value) &&
			input.description !== "" &&
			input.value > 0
		) {
			//2.add the item to the budget controller
			newItem = budgetCtrl.addItem(
				input.type,
				input.description,
				input.value
			);

			//3. add the item to the ui
			//newITEM - the argument here is the new item that created before
			//input.type = ung ininput ng user, fresh from the input field this is
			UICtrl.addListItem(newItem, input.type);

			//clear the fields
			UICtrl.clearFields();

			//5. Calculate and update budget
			updateBudget();

			//6. Calculate and update percentages
			updatePercentages();
		}
	};

	var ctrlDeleteItem = function (event) {
		var itemID, splitID, type, ID;

		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if (itemID) {
			//inc-1
			// then it will be splited like this (   ['inc', '1']  )
			splitID = itemID.split("-");
			//eto ung na split sa splitID nilagay sa variable
			type = splitID[0]; // inc or exp
			ID = parseInt(splitID[1]);

			//1. delete item from the data structure
			budgetCtrl.deleteItem(type, ID);

			//2. then delete from the UI
			UICtrl.deleteListItem(itemID);

			//3. update and show the new budget
			updateBudget();
		}
	};

	return {
		init: function () {
			console.log("Application has started");

			UICtrl.displayMonth();

			//we want everything to reset to zero
			// pass the object and change the value to zero
			// percentage is same as the value above
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1,
			});
			setupEventListeners();

			console.log(budgetCtrl.addItem());
		},
	};
})(budgetController, UIController);

controller.init();

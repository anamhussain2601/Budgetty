var budgetController = (function() {
  var Expense = (id, description, value) => {
    //function constructor
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = (id, description, value) => {
    //function constructor
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: (type, des, val) => {
      var newItem, ID;

      //Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //create bew item based on 'inc' or 'exp' type
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }

      //push it into our data structure
      data.allItems[type].push(newItem);
      //return the new element
      return newItem;
    }
  };
})();

var UIController = (() => {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };

  return {
    getInput: () => {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //will be eiher inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: () => {
      return DOMstrings;
    }
  };
})();

//Global app controller
var controller = ((budgetCtrl, UICtrl) => {
  var setUpEventListeners = () => {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", e => {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = () => {
    var input, newItem;
    //1. get the field input data
    input = UIController.getInput();
    //2. Add the item to budget controller

    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    //3. Add item to UI
    //4. Calculate the budget
    //5. Dispaly the budget on ui
  };
  return {
    init: () => {
      console.log("started");
      setUpEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();

const $ = require('jquery')
const Food = require('../models/Food')
const Ajax = require('../ajax_requests/ajax')
const HTML = require('../response_handlers/foodHandlers')

// event listener for adding food

$(document).ready(function(){
  $("#food_form").submit(event => {
    let name = $("input[name=name]").val()
    let calories = $("input[name=calories]").val()
    if (name.length === 0) {
      event.preventDefault();
      $("p#submit-food-name").append("Please enter a food name.")
    } else if (calories.length === 0) {
      event.preventDefault();
      $("p#submit-calories").append("Please enter a calorie amount.")
    } else {
      $("p#submit-food-name").remove()
      $("p#submit-calories").remove()
      Ajax.postFoods(name, calories)
      $('input').val('').removeAttr('checked').removeAttr('selected');
    }
  })
})

// event listener for deleting food

$("#food-list").click(event => {
  let objectId = event.target.parentElement.parentElement.dataset.id
  let row = event.target.parentElement.parentElement.parentElement
  Ajax.deleteFood(objectId, row)
})

// event listener for editing food


$("#food-list").focusout(event => {
  let input = event.target.textContent
  let newFoodValue = event.target.textContent.replace(/\s/g, '-')
  let currentFoodValue = event.target.attributes[1].value
  let objectId = event.target.attributes[0].value
  if ((newFoodValue != currentFoodValue) && (event.target.attributes[2].value === "name")){
    let calories = event.target.nextElementSibling.textContent
    let food = { food: {
        name: input,
        calories: calories
      }
    }
    Ajax.updateFood(food, objectId)
  } else {
    let name = event.target.previousElementSibling.textContent
    let food = { food: {
        name: name,
        calories: input
      }
    }
    Ajax.updateFood(food, objectId)
  }
});

// event listener for listing all food


$(document).ready(() => {
  Food.allFoods().then(data => {
    return HTML.populateFoodTable(data)
  })
})

// event listener for filtering food by name

$("#filterFood").keypress(event => {
  let input, filter, table, tr, td, i;
  input = document.getElementById("filterFood");
  filter = input.value.toUpperCase();
  table = document.getElementById("foodTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
})

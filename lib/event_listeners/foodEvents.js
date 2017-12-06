const $ = require('jquery')
const Food = require('../models/Food')
const Ajax = require('../ajax_requests/ajax')
const FoodHandler = require('../response_handlers/foodHandlers')

// event listener for adding food

$(document).ready(function(){
  $("#food_form").submit(event => {
    let name = $("input[name=name]").val()
    let calories = $("input[name=calories]").val()
    let thisObject = event
    return FoodHandler.validateFoodInput(name, calories, thisObject)
  })
})

// event listener for deleting food


$(document).ready(function(){
  $("#food-list").click(event => {
    if ((event.target.className === "delete-button") || (event.target.parentElement.className === "delete-button")) {
    let objectId = event.target.parentElement.parentElement.dataset.id
    sessionStorage.clear();
    sessionStorage.setItem('objectId', objectId);
    Ajax.deleteFood(objectId).then(()=>{
      $("#food-list tr").remove();
      FoodHandler.populateFoodTable(JSON.parse(sessionStorage.getItem('newTable')))
    })} else {
      event.stopPropagation()
    }
  })
})

// event listener for editing food

$(document).ready(() => {
  $("#food-list").focusout(event => {
    let input = event.target.textContent
    let newFoodValue = event.target.textContent.replace(/\s/g, '-')
    let currentFoodValue = event.target.attributes[1].value
    let objectId = event.target.parentElement.dataset.id
    let thisObject = event
    FoodHandler.editFood(input, newFoodValue, currentFoodValue, objectId, thisObject)
  })
})

// event listener for listing all food

$(document).ready(() => {
  Food.allFoods().then(data => {
    return FoodHandler.populateFoodTable(data)
  })
})

// event listener for filtering food by name

$("#filterFood").keypress(event => {
  let input, filter, table, tr, td, i;
  input = document.getElementById("filterFood");
  filter = input.value.toUpperCase();
  table = document.getElementById("foodTable");
  tr = table.getElementsByTagName("tr");
  FoodHandler.filterFood(input, filter, table, tr, td, i)
})

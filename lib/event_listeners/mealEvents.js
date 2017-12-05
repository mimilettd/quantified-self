const $ = require('jquery')
const $mealsTable = $('.meal-tables');
const $foodsTable = $('.food-meal-body');
const $consumedCals = $('.calories-consumed-val');
const $mealSelectionButton = $('.add-to-meal-button');
const $totalRemainingCals = $('.total-remaining-calories-val');
const $mealFoodCalorieHeader = $('.meal-food-table-calorie-header');

const Meal = require('../models/Meal')
const Food = require('../models/Food')
const mealHandlers = require('../response_handlers/mealHandlers')

let sort = "id"

Meal.allMeals().then((data)=>{
  mealHandlers.allMeals(data, $mealsTable, $consumedCals)
})

Food.allFood().then((data)=>{
  mealHandlers.allFood(data, $foodsTable)
})

$($mealsTable).on('click', '.delete-button', (event)=>{
  mealHandlers.deleteFood(event)
})

$($consumedCals).on('click', (event)=>{
  mealHandlers.updateCalories($consumedCals, $totalRemainingCals)

})

$($totalRemainingCals).on('click', (event)=>{
  mealHandlers.updateRemainingCalories($totalRemainingCals, $consumedCals)
})

$($mealsTable).on('click', '.meal-calories', (event)=>{
  mealHandlers.updateMealCalories(event)
})

$($mealsTable).on('click', '.meal-calories-remaining', (event)=>{
  const meal = (event.target.className).split('-')[0]
  const mealID = event.target.id
  mealHandlers.updateRemainingMealCalories(meal, mealID)
})

$($mealSelectionButton).on('click', (event)=>{
  mealHandlers.addFoodToMeal(event, $consumedCals)
})


$($mealFoodCalorieHeader).on('click', (event)=>{
  $foodsTable.empty()
  mealHandlers.sortFoodCaloriesHeader(event, sort, $foodsTable)
})

$("#searchFood").keypress(event=>{
  let input, filter, table, tr, td, i;
  input = document.getElementById("searchFood");
  filter = input.value.toUpperCase();
  table = document.getElementById("foodTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
})

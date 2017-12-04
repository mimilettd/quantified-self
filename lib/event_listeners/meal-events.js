const $ = require('jquery')
const $mealsTable = $('.meal-tables');
const $foodsTable = $('.food-meal-body');
const $foodForm = $('#food_form');
const $consumedCals = $('.calories-consumed-val');
const $mealSelectionButton = $('.add-to-meal-button');
const $totalRemainingCals = $('.total-remaining-calories-val');
const $mealFoodCalorieHeader = $('.meal-food-table-calorie-header');

const Meal = require('../models/Meal')
const Food = require('../models/Food')
const HTMLRunner = require('../helpers/HTMLRunner')
const Calories = require('../helpers/Calories')
const LocalStorage = require('../response_handlers/LocalStorage')

let sort = "id"

$foodForm.hide();
Meal.allMeals().then((data)=>{
  LocalStorage.saveMealData(data, $mealsTable);
  $consumedCals.trigger('click')
})

Food.allFood().then((data)=>{
  LocalStorage.saveFoodData(data, $foodsTable);
})

$($mealsTable).on('click', (event)=>{
  if (event.target.className.includes('delete')) {
    Meal.deleteMealFood(
      event.target,
      event.target.parentElement.parentElement.parentElement
    ).then((meal)=>{
      $consumedCals.trigger('click')
      HTMLRunner.eventCalTrigger(meal)
    })
  }
})
$($consumedCals).on('click', (event)=>{
  Calories.updateCalories($consumedCals).then((data)=>{
    $totalRemainingCals.trigger('click')
  })
})

$($totalRemainingCals).on('click', (event)=>{
  Calories.updateRemainingCalories(
    $totalRemainingCals,
    $consumedCals.html()
  )
})

$($mealsTable).on('click', '.meal-calories', (event)=>{
  const meal = (event.target.className).split('-')[0]
  const mealID = event.target.id
  Calories.updateMealCalories($(`.${meal}-calories`), mealID, meal)
  .then((data)=>{
    HTMLRunner.eventRemainingTrigger(meal)
  })
})

$($mealsTable).on('click', '.meal-calories-remaining', (event)=>{
  const meal = (event.target.className).split('-')[0]
  const mealID = event.target.id
  Calories.updateRemainingMealCalories($(`.${meal}-remaining-calories`), mealID)
})

$($mealSelectionButton).on('click', (event)=>{
  const foodIDs = []
  const mealID = event.target.id
  const meal = event.target.innerText
  $('.food-meal-body input:checkbox:checked').map( function(){
    foodIDs.push($(this).attr("id").split(" ")[1])
    $(this).prop('checked', false)
  });
  Meal.addFoodToMeal(mealID, foodIDs).then((data)=>{
    HTMLRunner.eventCalTrigger(meal)
    $consumedCals.trigger('click')
  })
})


$($mealFoodCalorieHeader).on('click', (event)=>{
  $foodsTable.empty()
  if (sort == "id") {
    sort = "top"
    Food.sortedCaloriesFood().then((data)=>{
      LocalStorage.saveFoodData(data, $foodsTable)
    })
  } else if (sort == "top") {
    sort = "bottom"
    Food.reverseSortCaloriesFood().then((data)=>{
      LocalStorage.saveFoodData(data, $foodsTable)
    })
  } else if (sort == "bottom") {
    sort = "id"
    Food.allFood().then((data)=>{
      LocalStorage.saveFoodData(data, $foodsTable);
    })
  }
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

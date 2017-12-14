const $ = require('jquery')
const Meal = require('../models/Meal')
const Food = require('../models/Food')
const HTMLRunner = require('../helpers/HTMLRunner')
const Calories = require('../helpers/Calories')
const LocalStorage = require('../response_handlers/LocalStorage')
const FilterTable = require('../helpers/FilterTable')

let sort = "id"

module.exports = class MealHandlers{

  static deleteFood(event, consumedCals){
    const parentRow = $(event.target).parents().eq(2)
    Meal.deleteMealFood(event.target, parentRow)
    .then((meal)=>{
      consumedCals.trigger('click')
      HTMLRunner.eventCalTrigger(meal)
    })
  }

  static allMeals(consumedCals){
    consumedCals.trigger('click')
  }

  static updateCalories(consumedCals, totalRemainingCals){
    Calories.updateCalories(consumedCals).then((data)=>{
      totalRemainingCals.trigger('click')
    })
  }

  static updateRemainingCalories(totalRemainingCals, consumedCals){
    Calories.updateRemainingCalories(
      totalRemainingCals,
      consumedCals.html()
    )
  }

  static updateMealCalories(event){
    const meal = (event.target.className).split('-')[0]
    const mealID = event.target.id
    Calories.updateMealCalories($(`.${meal}-calories`), mealID, meal)
    .then((data)=>{
      HTMLRunner.eventRemainingTrigger(meal)
    })
  }

  static updateRemainingMealCalories(meal, mealID){
    Calories.updateRemainingMealCalories($(`.${meal}-remaining-calories`), mealID)
  }

  static addFoodToMeal(event, consumedCals){
    const foodIDs = []
    const mealID = event.target.id
    const meal = event.target.innerText
    $('.food-meal-body input:checkbox:checked').map( function(){
      foodIDs.push($(this).attr("id").split(" ")[1])
      $(this).prop('checked', false)
    });
    Meal.addFoodToMeal(mealID, foodIDs).then((data)=>{
      HTMLRunner.eventCalTrigger(meal)
      consumedCals.trigger('click')
    })
  }

  static sortFoodCaloriesHeader(event, foodsTable){
    if (sort == "id") {
      sort = "top"
      Food.sortedCaloriesFood(foodsTable)
    } else if (sort == "top") {
      sort = "bottom"
      Food.reverseSortCaloriesFood(foodsTable)
    } else if (sort == "bottom") {
      sort = "id"
      Food.allSortedFood(foodsTable)
    }
  }

  static searchFood(){
    let input, filter, table, tr, td, i;
    input = document.getElementById("searchFood");
    filter = input.value.toUpperCase();
    table = document.getElementById("foodTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      FilterTable.returnFilteredRow(td, filter, tr, i)
    }
  }
}

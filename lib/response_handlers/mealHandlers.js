const $ = require('jquery')
const Meal = require('../models/Meal')
const HTMLRunner = require('../helpers/HTMLRunner')
const LocalStorage = require('../response_handlers/LocalStorage')
const Calories = require('../helpers/Calories')


const $consumedCals = $('.calories-consumed-val');

module.exports = class MealHandlers{

  static deleteFood(event){
    const parentRow = $(event.target).parents().eq(2)
    Meal.deleteMealFood(event.target, parentRow)
    .then((meal)=>{
      $consumedCals.trigger('click')
      HTMLRunner.eventCalTrigger(meal)
    })
  }

  static allFood(data, foodsTable){
    LocalStorage.saveFoodData(data, foodsTable);
  }

  static allMeals(data, mealsTable, consumedCals){
    LocalStorage.saveMealData(data, mealsTable);
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
      $consumedCals.trigger('click')
    })
  }

  static sortFoodCaloriesHeader(event, sort, foodsTable){
    if (sort == "id") {
      sort = "top"
      Food.sortedCaloriesFood().then((data)=>{
        LocalStorage.saveFoodData(data, foodsTable)
      })
    } else if (sort == "top") {
      sort = "bottom"
      Food.reverseSortCaloriesFood().then((data)=>{
        LocalStorage.saveFoodData(data, foodsTable)
      })
    } else if (sort == "bottom") {
      sort = "id"
      Food.allFood().then((data)=>{
        LocalStorage.saveFoodData(data, foodsTable);
      })
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
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}

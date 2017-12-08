const $ = require('jquery')
const Ajax = require('../ajax_requests/ajax')
const HTMLHelper = require('../helpers/HTMLHelper')

module.exports = class FoodHandlers {
  static populateFoodTable(data){
    data.forEach(object => {
      HTMLHelper.appendFoodToTable(object)
    })
  }

  static validateFoodInput(name, calories, event){
    if ((isNaN(calories)) || (calories.length === 0)) {
      event.preventDefault();
      $("p#submit-calories").append("Please enter a calorie amount.")
    } else if (name.length === 0) {
      event.preventDefault();
      $("p#submit-food-name").append("Please enter a food name.")
    } else {
      $("p#submit-food-name").remove()
      $("p#submit-calories").remove()
      Ajax.postFood(name, calories)
      $('input').val('').removeAttr('checked').removeAttr('selected');
    }
  }

  static editFood(input, newFoodValue, currentFoodValue, objectId, thisObject){
    let calories, name;
    if ((newFoodValue != currentFoodValue) && (thisObject.target.attributes[1].value === "name")){
      name = input
      calories = thisObject.target.nextElementSibling.textContent
    } else {
      name = thisObject.target.previousElementSibling.textContent
      calories = input
    }

    const food = { food: { name, calories}}
    Ajax.updateFood(food, objectId)
  }

}

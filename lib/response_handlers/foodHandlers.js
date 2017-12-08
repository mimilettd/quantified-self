const $ = require('jquery')
const Ajax = require('../ajax_requests/ajax')

module.exports = class FoodHandlers {
  static populateFoodTable(data){
    data.forEach(object => {
      let row = "<tr class=food data-id=" + object.id + "><td name=" + object.name.replace(/\s/g, '-') +" data-type='name' class='display' contenteditable='true'>" + object.name + "</td><td name=" + object.calories + " data-type='calories' class='display' contenteditable='true'>" + object.calories + "</td><td class='delete-button'><i class='fa fa-minus-circle' aria-hidden='true' style='font-size:24px'></i></td></tr>"
      $(".food-body").prepend(row)
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
      Ajax.postFoods(name, calories)
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

const $ = require('jquery')
const Ajax = require('../ajax_requests/ajax')

module.exports = class FoodHandlers {
  static populateFoodTable(data){
    data.forEach(object => {
      let row = "<tr class=food item-" + object.id + "><td data-id=" + object.id +" name=" + object.name.replace(/\s/g, '-') +" data-type='name' class='display' contenteditable='true'>" + object.name + "</td><td data-id=" + object.id +" name=" + object.calories + " data-type='calories' class='display' contenteditable='true'><span class='killer' contenteditable='false'><i class='fa fa-minus-circle' aria-hidden='true' style='font-size:24px'></i></span>" + object.calories + "</td></tr>"
      $(".food-body").prepend(row)
    })
  }

  static validateFoodInput(name, calories){
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
  }

  static editFood(input, newFoodValue, currentFoodValue, objectId){
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
  }

  static filterFood(input, filter, table, tr, td, i){
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
  }
}

const $ = require('jquery')
const HTMLHelper = require('../helpers/HTMLHelper')
const apiURL = "https://quantified-self-api-mlwd.herokuapp.com"

module.exports = class Ajax{

  static getAllMeals(){
    return $.getJSON(`${apiURL}/api/v1/meals`)
  }

  static addFoodToMeal(mealID, foodID){
    return $.ajax({
      method: "POST",
      url: (`${apiURL}/api/v1/meals/${mealID}/foods/${foodID}`)
    })
  }

  static getFood(id){
    return $.getJSON(`${apiURL}/api/v1/foods/${id}`)
  }
  static getAllFood(id){
    return $.getJSON(`${apiURL}/api/v1/foods`)
  }

  static deleteMealFood(meal, food){
    return $.ajax({
      method: "DELETE",
      url: (`${apiURL}/api/v1/meals/${meal}/foods/${food}`)
    })
  }

  static getAllFoods(){
    return $.getJSON(`${apiURL}/api/v1/foods`)
  }

  static postFood(name, calories){
    const params = { food: { name: name, calories: calories} }
    $.post(`${apiURL}/api/v1/foods`, params).then(event => {
      HTMLHelper.appendFoodToTable(event)
    })
  }

  static updateFood(food, id){
    $.ajax({
      url: `${apiURL}/api/v1/foods/${id}`,
      type: 'PATCH',
      data: food,
      success: function(data) {
        console.log('Food successfully updated.');
      }
    })
  }
  static deleteFood(id){
    $.ajax({
      url: `${apiURL}/api/v1/foods/${id}`,
      type: 'DELETE'
    })
    return this.getAllFoods().done(event => {
      let newTable = event.filter(e => {
        return e.id != sessionStorage.getItem('objectId')
      })
      sessionStorage.setItem('newTable', JSON.stringify(newTable))
    })
  }
}

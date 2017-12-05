const $ = require('jquery')
const Ajax = require('../ajax_requests/ajax')
const HTMLHelper = require('../helpers/HTMLHelper')
const LocalStorage = require('../response_handlers/LocalStorage')


module.exports = class Food{
  constructor(food){
    this.id = food.id
    this.name = food.name
    this.calories = food.calories
    this.tableRow = HTMLHelper.newTableRow
  }

  static allFood(){
    return Ajax.getAllFood().then((data)=>{
      const allFood = data.map((k,v)=>{
        return new Food(k)
      })
      return allFood
    })
  }

  static allSortedFood(foodsTable){
    Food.allFood().then((allFood)=>{
      Food.sort(allFood)
      LocalStorage.saveFoodData(allFood, foodsTable)
      return allFood
    })
  }

  static sortedCaloriesFood(foodsTable){
    Food.allFood().then((allFood)=>{
      Food.calorieSort(allFood)
      LocalStorage.saveFoodData(allFood, foodsTable)
      return allFood
    })
  }

  static reverseSortCaloriesFood(foodsTable){
    Food.allFood().then((allFood)=>{
      Food.reverseCalorieSort(allFood)
      LocalStorage.saveFoodData(allFood, foodsTable)
      return allFood
    })
  }

  static getFood(foods){
    return foods.map((food)=>{
      return new Food(food)
    })
  }

  static sort(foods){
    foods.sort((a,b)=>{
      b.id - a.id
    })
  }

  static calorieSort(foods){
    foods.sort((a,b)=>{
      return (b.calories - a.calories)
    })
  }

  static reverseCalorieSort(foods){
    foods.sort((a,b)=>{
      return (a.calories - b.calories)
    })
  }

  static allFoods(){
    return Food.allFood().then((allFood)=>{
      var byId = allFood.slice(0);
      byId.sort(function(a,b) {
        return a.id - b.id;
      });
      return byId
    })

  }
}

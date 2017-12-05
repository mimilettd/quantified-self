const $ = require('jquery')

module.exports = class HTML {
  static populateFoodTable(data){
    data.forEach(object => {
      let row = "<tr class=food item-" + object.id + "><td data-id=" + object.id +" name=" + object.name.replace(/\s/g, '-') +" data-type='name' class='display' contenteditable='true'>" + object.name + "</td><td data-id=" + object.id +" name=" + object.calories + " data-type='calories' class='display' contenteditable='true'><span class='killer' contenteditable='false'><i class='fa fa-minus-circle' aria-hidden='true' style='font-size:24px'></i></span>" + object.calories + "</td></tr>"
      $(".food-body").prepend(row)
    })
  }
}
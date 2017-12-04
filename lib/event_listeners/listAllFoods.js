const $ = require('jquery')
const Food = require('../models/Food')

$(document).ready(function(){
  Food.allFoods().then((data)=>{
    data.forEach(function(object) {
      $(".food-body").prepend("<tr class=food item-" + object.id + "><td data-id=" + object.id +" name=" + object.name.replace(/\s/g, '-') +" data-type='name' class='display' contenteditable='true'>" + object.name + "</td><td data-id=" + object.id +" name=" + object.calories + " data-type='calories' class='display' contenteditable='true'><span class='killer'><i class='fa fa-minus-circle' aria-hidden='true' style='font-size:24px'></i></span>" + object.calories + "</td></tr>")
    })
  })
})


$("#filterFood").keypress(function(){
  var input, filter, table, tr, td, i;
  input = document.getElementById("filterFood");
  filter = input.value.toUpperCase();
  table = document.getElementById("foodTable");
  tr = table.getElementsByTagName("tr");
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
})

const FoodHandler = require('../response_handlers/foodHandlers')

module.exports = class FilterTable {
  static setFoodTableVariables() {
    let input, filter, table, tr, td, i
    input = document.getElementById("filterFood")
    filter = input.value.toUpperCase();
    table = document.getElementById("foodTable")
    tr = table.getElementsByTagName("tr")
    this.filterFood(input, filter, table, tr, td, i)
  }

  static filterFood(input, filter, table, tr, td, i){
    for (i = 0; i < tr.length; i++) {
      if (table.className === "diary") {
        td = tr[i].getElementsByTagName("td")[1]
      } else {
        td = tr[i].getElementsByTagName("td")[0]
      }
      FilterTable.returnFilteredRow(td, filter, tr, i)
    }
  }

  static returnFilteredRow(td, filter, tr, i){
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) >= 0) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

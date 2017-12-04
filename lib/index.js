require('./styles.scss')
require('./event_listeners/foodEvents.js')
const $ = require('jquery')
const meal_events = require('./event_listeners/mealEvents')
$(document).ready(() => {
  meal_events;
});

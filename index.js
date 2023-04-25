// Require the date-fns package
const {format, addDays } = require('date-fns'); 


// Testing the package
const today = new Date();
const formattedDate = format(today, 'dd/MM/yyyy');
console.log(`Today's date is: ${formattedDate}`); 
//var myString = document.getElementsByTagName('p');

//myString[0].innerHTML += '<br /> Second string';
'use strict';
const fs = require('fs');
const myText = fs.readFileSync('my.js', 'utf8');
console.log(myText);
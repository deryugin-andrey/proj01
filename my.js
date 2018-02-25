
'use strict';
const fs = require('fs');
const myText = fs.readFileSync('my.js', 'utf8');
console.log(myText);
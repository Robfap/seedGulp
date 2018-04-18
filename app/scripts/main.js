"use strict";
import square from  './t2.js';
var test1 = 0;

var r = function(){
 let t = 454; test1++;
  let c = square(t); test1++;
 console.log(c + c + c);
};

r();

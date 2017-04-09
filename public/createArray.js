'use strict';
var arr, body, tab, tr, td, tn, row, col;
arr = [
  [0,1,2],
  [1,2,3],
  [2,3,4]
];
body = document.getElementsByTagName('body')[0];
var attr = document.createAttribute("border");
attr.value="1px solid black";

var attr2 = document.createAttribute("border-collapse");
attr2.value="collapse";

tab = document.createElement('table');
tab.setAttributeNode(attr);
tab.setAttributeNode(attr2);
for (row = 0; row < arr.length; row++){
  tr = document.createElement('tr');
  for (col = 0; col < arr[row].length; col++){
    td = document.createElement('td');
    tn = document.createTextNode(arr[row][col]);
    td.appendChild(tn);
    tr.appendChild(td);
  }
  tab.appendChild(tr);
}
body.appendChild(tab);

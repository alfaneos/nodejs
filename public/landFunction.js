function pushArray(){

  var oTable = document.getElementById('myTable');

    //gets rows of table
    var rowLength = oTable.rows.length;

    //loops through rows
    for (i = 0; i < rowLength; i++){

      //gets cells of current row
       var oCells = oTable.rows.item(i).cells;

       //gets amount of cells of current row
       var cellLength = oCells.length;

       //loops through each cell in current row
       for(var j = 0; j < cellLength; j++){

              // get your cell info here

              var cellVal = oCells.item(j).innerHTML;
              oCells.item(j).innerHTML="2";
           }
    }
}

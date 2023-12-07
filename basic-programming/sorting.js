const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);

months.sort(compareMonnths);
console.log(months);

//Not a good sort for months, how can we fix it?
function compareMonnths(month1, month2) {
    //Convert Months to numbers
    let month1Value = getMonthFromString(month1);
    let month2Value = getMonthFromString(month2);
    
    if ( month1Value < month2Value) {
        return -1;
    }
    else  if ( month2Value > month1Value) {
        return 1;
    }
    else
    {
        return 0;
    }
  }

  function getMonthFromString(mon){
    return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
 }
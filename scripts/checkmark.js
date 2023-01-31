function checkMark(){
    for (let i = 0; i < (cartCounter-1); i++){
      let itemNumber = getCookie("addedItem" + i.toString);
      console.log(itemNumber);
      console.log(i);
      $("#check" + itemNumber).css("visibility","visible"); 
    }
  }
checkMark();
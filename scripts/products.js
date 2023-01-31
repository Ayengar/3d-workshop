// convert this lists into JSON format to store on server later (for now is more convenient for me to use arrays)
let descriptionList = [ "Asuka Langley from Evangelion", 
                        "Satoru Gojo from Jujutsu Kaisen",
                        "Lucy from Cyberpunk: Edgerunners",
                        "Denji from ChainsawMan",
                        "Ghost from Ghostbusters",
                        "Akuma from Street Fighter",
                        "Harry Potter from Harry Potter (2001)",
                        "Lion-O from ThunderCats",
                        "Anakin Skywalker from Star Wars (2005)",
                        "Spider Man Original",
                        "Teenage Mutant Ninja Turtles(TMNT) Full Squad",
                        "Lilo from Fifth Element",
                        "Sett from League of Legends",
                        "Kindred from League of Legends"];

let priceList = ["$ 45",
                 "$ 50",
                 "$ 55",
                 "$ 65",
                 "$ 30",
                 "$ 65",
                 "$ 50",
                 "$ 45",
                 "$ 55",
                 "$ 55",
                 "$ 180",
                 "$ 55",
                 "$ 50",
                 "$ 45"];

let imageList =[ "./images/asuka.jpg",
                "./images/satoru.jpg",
                "./images/lucy.jpg",
                "./images/chainsaw.jpg",
                "./images/ghost.jpg",
                "./images/akuma.jpg",
                "./images/harry.jpg",
                "./images/CATS.jpg",
                "./images/anakin.jpg",
                "./images/spiderman.jpg",
                "./images/tmnt.jpg",
                "./images/5element.jpg",
                "./images/sett.jpg",
                "./images/kindred.jpg"];               

let addedItem;

let clickCounter;

if (cartCounter == null){
    setCookie("cartCounter",0,7);
}

function addToCart(clickedId){
    //clickedId is "product0", word product has 6 letter so to retrive item number we delete 6 letters
    let numLetter = clickedId.length-6;
    let itemNumber = clickedId.slice(-numLetter);
    clickCounter = getCookie("cartCounter");

    addedItem = "addedItem" + clickCounter.toString();
    setCookie(addedItem, itemNumber, 7);

    clickCounter++;

    setCookie("cartCounter", clickCounter, 7);
    cartCounter = getCookie("cartCounter");

    //changing number of added items in the navbar cart icon
    $("#cart-counter").css("visibility","visible");
    $("#cart-counter").text(cartCounter);

    //adding visual checkmark and fade when item added to cart
    $("#check" + itemNumber).css("visibility","visible");
    $("#photo" + itemNumber).css("opacity", "20%");
}

$(function(){
  let $container = $("#products-container0");

  for (let i = 0; i < (priceList.length - 1); i++){
    // get the last DIV which ID starts with ^= "product"
    let $div = $('div[id^="product"]:last');

    // Read the number from that DIV's ID (0 from "product0")
    // And increment that number by 1
    let num = parseInt( $div.prop("id").match(/\d+/g), 10) +1;

    // Clone it and assign the new ID
    let $product = $div.clone().prop("id", "product" + num);

    // Change ID of inner elements
    $product.find("#photo" + (num - 1)).attr("id", "photo" + num);
    $product.find("#button" + (num - 1)).attr("id", "button" + num);
    $product.find("#description" + (num - 1)).attr("id", "description" + num);
    $product.find("#price" + (num - 1)).attr("id", "price" + num);
    $product.find("#check" + (num - 1)).attr("id", "check" + num);

    // Changing text
    $product.find("#description" + num).text(descriptionList[num]);
    $product.find("#price" + num).text(priceList[num]);

    // Finally insert $product to products-container
    $div.after($product.appendTo($container));

    $("#photo" + num).attr("src", imageList[num]);
  }
});


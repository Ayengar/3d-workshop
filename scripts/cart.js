let totalPrice = 0;
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

// Changing text and images of cloned divs, which i need to wait until main html structure formed
function changeContent(){
    for (let i = 0; i < cartCounter; i++){
   
    let addedItem = getCookie("addedItem" + i.toString());
    
    document.getElementById("content" + i.toString()).src = imageList[addedItem];

    $("#description"+i.toString()).text(descriptionList[addedItem]);
    $("#price"+i.toString()).text(priceList[addedItem]);

    totalPrice += Number(priceList[addedItem].slice(-2));
    $("#total-price").text(totalPrice + " $");
    }
    
    if(totalPrice != 0){
    let deliveryPrice = $("#delivery-option").val();
    let finalPrice = totalPrice + Number(deliveryPrice);
    $("#FINAL-PRICE").text(finalPrice + " $");
    }
}

function deleteItem(clickedId){
    let numLetter = clickedId.length-10;
    let itemNumber = clickedId.slice(-numLetter);

    let cartCounter = getCookie("cartCounter");
    let newCount = cartCounter - 1;
    setCookie("cartCounter", newCount, 7);

    //when item is deleted we want all other items in a card to change their place, starting from deleted item
    //for example when item 3 deleted, item 4 taking it's place, and item 5 taking it's place and so on...
    for (let i = Number(itemNumber); i < (newCount); i++){
        let previousItemPosition = "addedItem" + i.toString();
        let newItem = getCookie("addedItem" + (i+1).toString());
        setCookie(previousItemPosition, newItem, 7);
    }

    window.location.reload();
}

$(function(){
    let $container = $("#products-container");

    for (let i = 0; i < (cartCounter-1); i++){
        // get the last DIV which ID starts with ^= "product"
        let $div = $('div[id^="product"]:last');

        // Read the Number from that DIV"s ID (0 from "product0")
        // And increment that number by 1
        let num = parseInt( $div.prop("id").match(/\d+/g), 10 ) +1;

        // Clone it and assign the new ID
        let $product = $div.clone().prop("id", "product"+num );

        // Change id of inner elements
        $product.find("#content"+(num-1)).attr("id", "content"+num);
        $product.find("#description"+(num-1)).attr("id", "description"+num);
        $product.find("#price"+(num-1)).attr("id", "price"+num);
        $product.find("#deleteItem"+(num-1)).attr("id", "deleteItem"+num);

        // Finally insert $product to products-container
        $div.after( $product.appendTo($container) );
    }

    changeContent();
});

//Changing number of cart icon and displayed in the cart;    
if (cartCounter != null && cartCounter != 0){
    $("#main-item-number").text(cartCounter + " items");
    $("#summary-item-number").text("ITEMS: " + cartCounter);
    $("#product0").css("visibility", "visible")
} else {$("#product0").css("visibility", "hidden")}

module.exports = deleteItem;
//pop up message explaining slides
function pop(){
    if  ($(".popuptext").css("visibility") == "hidden"){
        $(".popuptext").css("visibility", "visible");
    } else {
        $(".popuptext").css("visibility", "hidden");    
    }

    if ($("#dragme").css("visibility") == "hidden"){
        $("#dragme").css("visibility", "visible");
    }
}

let sliderPhotoListBackground = ["./images/witcher-metall.jpg",
                                 "./images/annie-printed.jpg",
                                 "./images/hand-print.jpg",
                                 "./images/cat-print.jpg",
                                 "./images/rebecca-print.jpg"];
let sliderPhotoListForeground = ["./images/witcher-render.jpg",
                                 "./images/annie-render.jpg",
                                 "./images/hand-render.jpg",
                                 "./images/cat-render.jpg",
                                 "./images/rebecca-render.jpg"];

let currentSlideNumber = 0;
let sliderCount = sliderPhotoListForeground.length - 1;

function setNumber(slideNumber){
    if (slideNumber > sliderCount) {
        slideNumber = 0;
    }

    if (slideNumber < 0) {
        slideNumber = sliderCount;
    }

    return(slideNumber);
}

function changeSlide(x){
    currentSlideNumber += x;

    currentSlideNumber = setNumber(currentSlideNumber);

    document.getElementById("backgroundimg").src = sliderPhotoListBackground[setNumber(currentSlideNumber)];
    document.getElementById("foregroundimg").src = sliderPhotoListForeground[setNumber(currentSlideNumber)];

    document.getElementById("leftimg").src = sliderPhotoListForeground[setNumber(currentSlideNumber - 1)];
    document.getElementById("rightimg").src = sliderPhotoListForeground[setNumber(currentSlideNumber + 1)];
}

//update width of foreground img based on slider value
$("#slider").on("input change", (e)=>{
    const sliderPos = e.target.value;
    $(".foreground").css("width", `${sliderPos}%`)
});

//hint "Drag me!" dissapears on click
function hidehint(){
    $("#dragme").css("visibility", "collapse");
}

module.exports = setNumber;
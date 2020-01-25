function randombg() {
  var newImage = [
    //commenting out images that shake
    "url('images/background_1.jpg')",
    "url('images/background_2.jpg')",
    // "url('images/background_3.jpg')",
    "url('images/background_4.jpg')",
    "url('images/background_5.png')",
    // "url('images/background_6.jpg')",
    "url('images/background_7.jpg')",
    "url('images/background_8.jpg')",
    "url('images/background_9.jpg')",
    "url('images/background_10.jpg')",
    "url('images/background_11.jpg')",
    "url('images/background_12.jpg')",
    // "url('images/background_13.jpg')",
    "url('images/background_14.jpg')",
    // "url('images/background_15.jpg')",
    // "url('images/background_16.jpg')",
    "url('images/background_17.jpg')",
    // "url('images/background_18.jpg')",
    // "url('images/background_19.jpg')",
    "url('images/background_20.jpg')",
    // "url('images/background_21.jpg')",
    "url('images/background_22.png')",
  ];
  var random = Math.floor(Math.random() * newImage.length) + 0;
  document.getElementById("splash-container").style.backgroundImage = newImage[random];
}
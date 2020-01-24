function randombg(){
    var random= Math.floor(Math.random() * 22) + 0;
    var newImage = ["url('images/background_22.png')",
                   "url('images/background_1.png')",
                   "url('images/background_2.png')",
                   "url('images/background_3.png')",
                   "url('images/background_4.png')",
                   "url('images/background_5.png')",
                   "url('images/background_6.png')",
                   "url('images/background_7.png')",
                   "url('images/background_8.png')",
                   "url('images/background_9.png')",
                   "url('images/background_10.png')",
                   "url('images/background_11.png')",
                   "url('images/background_12.png')",
                   "url('images/background_13.png')",
                   "url('images/background_14.png')",
                   "url('images/background_15.png')",
                   "url('images/background_16.png')",
                   "url('images/background_17.png')",
                   "url('images/background_18.png')",
                   "url('images/background_19.png')",
                   "url('images/background_20.png')",
                   "url('images/background_21.png')",
                   ];
    document.getElementById("splash-container").style.backgroundImage=newImage[random];
  }
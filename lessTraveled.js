//Object to link state with its abbreviation. NPS api call requires the abbreviation
var stateKeys = {
  Alabama: "AL",
  Alaska: "AK",
  "American Samoa": "AS",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  "District Of Columbia": "DC",
  "Federated States Of Micronesia": "FM",
  Florida: "FL",
  Georgia: "GA",
  Guam: "GU",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  "Marshall Islands": "MH",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Northern Mariana Islands": "MP",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Palau: "PW",
  Pennsylvania: "PA",
  "Puerto Rico": "PR",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  "Virgin Islands": "VI",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY"
};

//Create array of state names from stateKeys object
var stateNames = Object.keys(stateKeys);

//alan's api key for NPS and NPS api base url
var npsApiKey = "&api_key=IhxOqwarmUrf63on2XfYUZpmkMZxKxOBFY6hZ0aW";
var npsApiURL = "https://developer.nps.gov/api/v1/";

//Create array of endpoints
var npsEndpointArray = [
  "alerts?",
  "articles?",
  "campgrounds?",
  "events?",
  "lessonplans?",
  "newsreleases?",
  "parks?",
  "people?",
  "places?",
  "visitorcenters?"
];

//Dropdown menu
var stateSelect = $("#states");

//Function to append all states to dropdown menu
function appendStates() {
  for (let i = 0; i < stateNames.length; i++) {
    const element = stateNames[i];
    var stateOption = $("<option>").val(stateNames[i]).text(stateNames[i]);
    stateOption.click(function (event) {

    });

    stateSelect.append(stateOption);

  }
}

appendStates()

$("#states").on("change", function () {
  console.log($(this).val());

  //Set state variable to user-selected state
  var state = stateKeys[$(this).val()];
  //API query
  var query = "stateCode=";
  //Set seperate spans for static text Loading and animated dots...
  var loadSpan = $("<span>").text("Loading");
  var dotSpan = $("<span>").text(".");

  //Counting variable for the following interval. (Probably could be used in a cleaner way)
  var stupidCount = 0;
  //Interval for animating dots
  var loadingAnimation = setInterval(function () {
    //Once count reaches 11
    if (stupidCount > 10) {
      //Clear the dots and restart stupidCount
      dotSpan.empty();
      stupidCount = 0;
    }
    //Continue adding dots
    dotSpan.text(dotSpan.text() + ".");
    //Incriment stupidCount
    stupidCount++;
  }, 250);

  var responseArray = [];


  // Recursive API call
  // could be dangerous to break this. an infinite loop might
  // cause the api key to exceed its usage limit
  // monitor each recursion through console
  giveEverything();
  function giveEverything() {
    var curEndPoint = npsEndpointArray.shift();
    $.ajax({
      url: npsApiURL + curEndPoint + query + state + npsApiKey,
      method: "GET"
    }).then(function (response) {
      console.log("loop " + stupidCount);
      //store response in responsearray
      responseArray.push({
        endPoint: curEndPoint,
        res: response
      });
      console.log("stored response from endpoint: " + curEndPoint);
      //Stop the animation interval and clear its elements display response
      //if finished
      if (npsEndpointArray.length < 1) {
        clearInterval(loadingAnimation);
        //Logging response
        for (let i = 0; i < responseArray.length; i++) {
          console.log("--------------------------------")
          console.log("endpoint: " + responseArray[i].endPoint);
          console.log("response: ");
          console.log(responseArray[i].res);
        }
        //DISPLAY MODAL
        $("label.btn")[0].click();
      } else {
        giveEverything();
      }
    });
  }
});

// Map JS

function initMap() {
  var Denali = { lat: 63.734353, lng: -148.912016 };

  var map = new google.maps.Map(
    document.getElementById('map'), {
    zoom: 4, center: Denali
  });

  var marker = new google.maps.Marker({
    position: Denali, map: map
  })
}



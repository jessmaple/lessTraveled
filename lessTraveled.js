//Object to link state with its abbreviation. NPS api call requires the abbreviation
var stupidCount = 0;
var npsQuery = "";
var state = "";
var responseArray = [];
var statecoords = {
  Alabama: { lat: 32.806671, long: -86.791130 },
  Alaska: { lat: 61.370716, long: -152.404419 },
  Arizona: { lat: 33.729759, long: -111.431221 },
  Arkansas: { lat: 34.969704, long: -92.373123 },
  California: { lat: 36.116203, long: -119.681564 },
  Colorado: { lat: 39.059811, long: -105.311104 },
  Connecticut: { lat: 41.597782, long: -72.755371 },
  Delaware: { lat: 39.318523, long: -75.507141 },
  "District of Columbia": { lat: 38.897438, long: -77.026817 },
  Florida: { lat: 27.766279, long: -81.686783 },
  Georgia: { lat: 33.040619, long: -83.643074 },
  Hawaii: { lat: 21.094318, long: -157.498337 },
  Idaho: { lat: 44.240459, long: -114.478828 },
  Illinois: { lat: 40.349457, long: -88.986137 },
  Indiana: { lat: 39.849426, long: -86.258278 },
  Iowa: { lat: 42.011539, long: -93.210526 },
  Kansas: { lat: 38.526600, long: -96.726486 },
  Kentucky: { lat: 37.668140, long: -84.670067 },
  Louisiana: { lat: 31.169546, long: -91.867805 },
  Maine: { lat: 44.693947, long: -69.381927 },
  Maryland: { lat: 39.063946, long: -76.802101 },
  Massachusetts: { lat: 42.230171, long: -71.530106 },
  Michigan: { lat: 43.326618, long: -84.536095 },
  Minnesota: { lat: 45.694454, long: -93.900192 },
  Mississippi: { lat: 32.741646, long: -89.678696 },
  Missouri: { lat: 38.456085, long: -92.288368 },
  Montana: { lat: 46.921925, long: -110.454353 },
  Nebraska: { lat: 41.125370, long: -98.268082 },
  Nevada: { lat: 38.313515, long: -117.055374 },
  "New Hampshire": { lat: 43.452492, long: -71.563896 },
  "New Jersey": { lat: 40.298904, long: -74.521011 },
  "New Mexico": { lat: 34.840515, long: -106.248482 },
  "New York": { lat: 42.165726, long: -74.948051 },
  Arizona: { lat: 0, long: 0 },
  Arizona: { lat: 0, long: 0 },
  Arizona: { lat: 0, long: 0 },
  Arizona: { lat: 0, long: 0 },
  Arizona: { lat: 0, long: 0 },
  Arizona: { lat: 0, long: 0 }

};
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

function giveEverything() {
  var curEndPoint = npsEndpointArray.shift();
  $.ajax({
    url: npsApiURL + curEndPoint + npsQuery + state + npsApiKey,
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
      // clearInterval(loadingAnimation);
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

appendStates()

$("#states").on("change", function () {
  console.log($(this).val());

  //Set state variable to user-selected state
  state = stateKeys[$(this).val()];
  //API npsQuery
  npsQuery = "stateCode=";
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


  // Recursive API call
  // could be dangerous to break this. an infinite loop might
  // cause the api key to exceed its usage limit
  // monitor each recursion through console
  giveEverything();
});

// Map JS

function initMap() {
  responseArray
  var statecoords = { lat: 63.734353, lng: -148.912016 };

  var map = new google.maps.Map(
    document.getElementById('map'), {
    zoom: 4, center: Denali
  });

  var marker = new google.maps.Marker({
    position: Denali, map: map
  })
}



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
    stateSelect.append($("<option>").val(stateNames[i]).text(stateNames[i]));
  }
}

appendStates()
$("#states").on("change", function() {
  $("label.btn")[0].click();
});

// Map JS

function initMap() {
  var Denali = {lat:63.734353 , lng:-148.912016 };
  
  var map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 4, center: Denali});

  var marker = new google.maps.Marker ({
    position: Denali, map: map})
  }



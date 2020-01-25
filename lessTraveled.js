var jessMapsApiKey = "AIzaSyAB30200sZiA3TCdbLm4KI7EoHlDWD8ZcY";
var stateCenter = { lat: 0, lng: 0 };
var stupidCount = 0;
var giveEverythingCount = 0;
var npsQuery = "";
var state = "";
var responseArray = [];
var stateName = "";
//Object to link state with its center coordinates
var stateCoords = {
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
  Guam: { lat: 13.4443, long: 144.7937 },
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
  "North Carolina": { lat: 35.630066, long: -79.806419 },
  "North Dakota": { lat: 47.528912, long: -99.784012 },
  Ohio: { lat: 40.388783, long: -82.764915 },
  Oklahoma: { lat: 35.565342, long: -96.928917 },
  Oregon: { lat: 44.572021, long: -122.070938 },
  Pennsylvania: { lat: 40.590752, long: -77.209755 },
  "Rhode Island": { lat: 41.680893, long: -71.511780 },
  "South Carolina": { lat: 33.856892, long: -80.945007 },
  "South Dakota": { lat: 44.299782, long: -99.438828 },
  "Tennessee": { lat: 35.747845, long: -86.692345 },
  "Texas": { lat: 31.054487, long: -97.563461 },
  "Utah": { lat: 40.150032, long: -111.862434 },
  Vermont: { lat: 44.045876, long: -72.710686 },
  Virginia: { lat: 37.769337, long: -78.169968 },
  Washington: { lat: 47.400902, long: -121.490494 },
  "West Virginia": { lat: 38.491226, long: -80.954453 },
  Wisconsin: { lat: 44.268543, long: -89.616508 },
  Wyoming: { lat: 42.755966, long: -107.302490 }
};
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
var fullNpsEndpointArray = [
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

var npsEndpointArray = ["parks?"];

//Dropdown menu
var stateSelect = $("#states");

//Function to append all states to dropdown menu
function appendStates() {
  for (let i = 0; i < stateNames.length; i++) {
    const element = stateNames[i];
    var stateOption = $("<option>").val(stateNames[i]).text(stateNames[i]);
    stateSelect.append(stateOption);
  }
}

function giveEverything() {
  var curEndPoint = npsEndpointArray.shift();
  $.ajax({
    url: npsApiURL + curEndPoint + npsQuery + state + "&fields=images" + npsApiKey,
    method: "GET"
  }).then(function (response) {
    console.log("loop " + ++giveEverythingCount);
    //store response in responsearray
    responseArray.push({
      endPoint: curEndPoint,
      res: response
    });
    console.log("stored response from endpoint: " + curEndPoint);
    //Stop the animation interval and clear its elements display response
    //if finished
    if (npsEndpointArray.length < 1) {

      //Logging response
      for (let i = 0; i < responseArray.length; i++) {
        console.log("--------------------------------")
        console.log("endpoint: " + responseArray[i].endPoint);
        console.log("response: ");
        console.log(responseArray[i].res);
      }
      console.log(responseArray[0].res.data.length);
      if (responseArray[0].res.data.length === 0) {
        alert("no parks in " + stateName);
      } else {
        //Set center of map
        //make map
        var map = new google.maps.Map(document.getElementById('map'));

        var parksArray = responseArray[0].res.data;
        var bounds = new google.maps.LatLngBounds();
        var setMarkersCount = 0;

        function setMarkers() {

          function reiterator() {
            setMarkersCount++;
            console.log("park array length is " + parksArray.length);
            if (setMarkersCount < parksArray.length) {
              setMarkers();
            } else {
              if (parksArray.length <= 1) {
                map.setZoom(8);
                map.setCenter(myLatLng);
              } else {
                map.fitBounds(bounds, 20);
              }

              //**********Load results page now**********
              $(".lds-ripple").remove();
              $(".btn-1").click();
              console.log("clicked btn-1");
              console.log(parksArray);
              for (let i = 0; i < parksArray.length; i++) {
                const ele = parksArray[i];
                resultDiv = $("<div>").addClass("result-div result-div-" + i);
                resultDiv.attr("data-fullname", ele.fullName);
                resultDiv.attr("data-parkcode", ele.parkCode);
                resultDiv.attr("data-description", ele.description);
                resultDiv.attr("data-hours");
                parkPhoto = $("<div>").addClass("result-thumb").css("background-image", `url(${ele.images[0].url})`);
                resultDivTitle = $("<h5>").addClass("result-div-title").text(ele.fullName);
                console.log(ele.fullName);
                resultDiv.append(parkPhoto);
                resultDiv.append(resultDivTitle);
                $("#results-column").append(resultDiv);
                resultDiv.append(parkPhoto);

                resultDiv.click(function (event) {
                  var parkCode = $(this).attr("data-parkcode");
                  var description = $(this).attr("data-description");
                  npsQuery = "parkCode=";
                  $.ajax({
                    url: npsApiURL + curEndPoint + npsQuery + parkCode + "&fields=images,operatingHours,addresses" + npsApiKey,
                    method: "GET"
                  }).then(function (response) {
                    console.log(response);
                    $(".splash-modal").hide();
                    $("#park-page").show();
                    $(".btn-2").click();
                    $("#park-name").text(response.data[0].fullName);
                    $(".park-page-img").attr("src", response.data[0].images[0].url);
                    if (response.data[0].operatingHours[0].description) {
                      $("#park-hours").text(`Hours: ${response.data[0].operatingHours[0].description}`);
                    }
                    $("#park-address").text(`Address: ${response.data[0].addresses[0].line1} ${response.data[0].addresses[0].line2}, ${response.data[0].addresses[0].city}, ${response.data[0].addresses[0].stateCode}, ${response.data[0].addresses[0].postalCode}`);
                    $("#forcast").text(`Weather Information: ${response.data[0].weatherInfo}`)
                    $("#park-site").attr("href", response.data[0].url);
                  });
                });
              }
            }
          }

          //do we even get coords? if coords is not empty, do things
          if (parksArray[setMarkersCount].latLong !== "") {
            const ele = parksArray[setMarkersCount];
            var parkCoords = [];
            var latLongArray = ele.latLong.replace(/lat:/, '').replace(/ long:/, '').split(",");
            var myLat = parseFloat(latLongArray[0]);
            var myLng = parseFloat(latLongArray[1]);
            var myLatLng = new google.maps.LatLng(myLat, myLng);
            $.ajax({
              url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${myLat},${myLng}&key=${jessMapsApiKey}`,
              method: "GET"
            }).then(function (response) {

              // console.log(response.results[response.results.length -2].address_components[0].short_name);
              console.log(response.results);
              if (state !== "AS") {
                var stateOfMarker = response.results[response.results.length - 2].address_components[0].short_name;
              }
              if (
                (stateOfMarker === state) ||
                state === "GU" ||
                state === "AS" ||
                state === "MP" ||
                state === "PR") {
                console.log("here " + setMarkersCount);
                var marker = new google.maps.Marker({
                  position: myLatLng,
                  map: map,
                  title: ele.fullName
                });
                bounds.extend(myLatLng);
                // marker.setMap(map);
                // extend boundry at mark
                reiterator()
              } else {
                reiterator()
              }
            });
          } else {
            reiterator()
          }
        }
        setMarkers();
      }
    } else {
      giveEverything();
    }
  });
}


appendStates()

$("#states").on("change", function () {
  //start loader animation
  $(".splash-head").append('<div class="lds-ripple"><div></div><div></div></div>');
  //Set state variable to user-selected state
  stateName = $(this).val();
  state = stateKeys[stateName];
  //API npsQuery
  npsQuery = "stateCode=";

  // Recursive API call
  // could be dangerous to break this. an infinite loop might
  // cause the api key to exceed its usage limit
  // monitor each recursion through console
  giveEverything();
});





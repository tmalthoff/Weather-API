$(document).ready(function () {
    console.log(moment())


    $("#search-city").on("click", function () {
        var cityName = $("#city-input").val().trim();


        //get name - done
        searchWeather(cityName)
        //make row function for city history
    })
    //b462a7368deee03b077f78e9fa37bc16

    function searchWeather(city) {
        console.log(city)

        $.ajax({
            method: "GET",
            dataType: "json",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b462a7368deee03b077f78e9fa37bc16&units=imperial"
        }).then(function (response) {
            console.log(response)
            var temp = Math.round(response.main.temp)

            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");

            var cityName = $("<h1>").addClass("card-title").text(response.name);
            var tempEl = $("<h5>").addClass("card-text").text("Current Tempature is: " + temp);
            var latAndLon = $("<h5>").addClass("card-text").text("Latitude: " + response.coord.lat + " and Longitude: " + response.coord.lon)
            var humidity = $("<h5>").addClass("card-text").text("Humidity: " + response.main.humidity)
            $("#today").append(card.append(cardBody.append(cityName, tempEl, latAndLon, humidity)));

            getForecast(response.coord.lat, response.coord.lon)
        })
    }

    function getForecast(lat, lon) {
        $.ajax({
            method: "GET",
            dataType: "json",
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=b462a7368deee03b077f78e9fa37bc16&units=imperial`,
            success: function (response) {
                console.log(response)

                for(var i = 1; i < 6; i++) {
                    var day = response.daily[i]


                    var card = $("<div>").addClass("card");
                    var cardBody = $("<div>").addClass("card-body");
                    var date = $("<h1>").addClass("card-title").text(moment.unix(day.dt).format("dddd, MMMM Do"));
                    var tempEl = $("<p>").addClass("card-title").text("Current Temperature is: " + day.temp.day )

                    $("#forecast").append(card.append(cardBody.append(date, tempEl)));
                }
            }
        })
    }




})
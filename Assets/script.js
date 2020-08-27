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
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");

            var cityName = $("<h1>").addClass("card-title").text(response.name);

            $("#today").append(card.append(cardBody.append(cityName)));

            getForecast(response.coord.lat, response.coord.lon)
        })
    }

    function getForecast(lat, lon) {
        $.ajax({
            method: "GET",
            dataType: "json",
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=b462a7368deee03b077f78e9fa37bc16`,
            success: function (response) {
                console.log(response)

                for(var i = 1; i < 6; i++) {
                    console.log(response.daily[i])
                    var card = $("<div>").addClass("card");
                    var cardBody = $("<div>").addClass("card-body");
                    var date = $("<h1>").addClass("card-title").text(moment.unix(response.daily[i].dt).format("dddd, MMMM Do"));

                    $("#forecast").append(card.append(cardBody.append(date)));
                }
            }
        })
    }




})
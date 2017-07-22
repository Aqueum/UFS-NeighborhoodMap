/**
 * Created by martin on 22/07/2017.
 */

// Main google maps interface
var initMap = function() {
    // Create and style the map
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:  55.953252, lng: -3.188267},
        zoom: 13,
        styles: styles,
        // https://developers.google.com/maps/documentation/javascript/controls
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_BOTTOM
        }
    });

    var largeInfowindow = new google.maps.InfoWindow();

    var bounds = new google.maps.LatLngBounds();

    // format markers
    var normMarker = {
        // https://www.tutorialspoint.com/google_maps/google_maps_symbols.htm
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 5,
        strokeWeight: 3,
        strokeColor: "#ea3323"
    };

    var boldMarker = {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 5,
        strokeWeight: 3,
        strokeColor: "#ea3323",
        fillColor: "#ea3323",
        fillOpacity: 0.5
    };

    // pull in location list from viewModel and create markers
    vm.shelterlist().forEach(function (shelter) {
        var marker = new google.maps.Marker({
            position: shelter.location,
            map: map,
            title: shelter.title,
            address: shelter.address,
            phone: shelter.phone,
            email: shelter.email,
            url: shelter.url,
            wiki: shelter.wiki,
            twitter: shelter.twitter,
            icon: normMarker
        });
        shelter.marker = marker;

        bounds.extend(marker.position);

        // Animate the marker on click & generate infowindow
        // https://stackoverflow.com/questions/7339200/bounce-a-pin-in-google-maps-once
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function(){ marker.setAnimation(null); }, 700);
            vm.wikiSearch(shelter.title);
        });

        // fill in markers on mouse-over & empty again on mouse-out
        marker.addListener('mouseover', function() {
            this.setIcon(boldMarker);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(normMarker);
        });
    });
    map.fitBounds(bounds);
};

// define infowindow with name, address phone number & links
function populateInfoWindow(marker, infowindow) {
    // Check infowindow is not already open on this marker.
    if (infowindow.marker !== marker) {
        infowindow.marker = marker;
        infowindow.setContent(
            '<div>' + marker.title + '</div>'
            + '<div>&#9659; ' + marker.address + '</div>'
            + '<div>&#9659; ' + marker.phone + '</div>'
            + '<a href="mailto:' + marker.email
            + '?Subject=HomePointr%20enquiry">Email</a>'
            + ' | <a href="' + marker.url + '" target="_blank">Website</a>'
            + ' | <a href="' + marker.wiki + '" target="_blank">Wikipedia</a>'

        );
        infowindow.open(map, marker);
        // Clear marker if infowindow is closed.
        infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
        });
    }
}

/**
 * Created by Martin Currie (https://github.com/Aqueum) on 07/07/2017.
 */

var Shelter = function(data) {
    this.title = data.title;
    this.location = data.location;
    this.address = data.address;
    this.phone = data.phone;
    this.email = data.email;
    this.wiki = data.wiki;
    this.url = data.url;
    this.twitter = data.twitter;
    this.males = data.males;
    this.females = data.females;
    this.minAge = data.minAge;
    this.maxAge = data.maxAge;
    this.pets = data.pets;
    this.active = data.active;
};

var viewModel = function() {
    var self = this;

    self.shelterlist = ko.observableArray([]);

    shelters.forEach(function(data){
        self.shelterlist.push( new Shelter(data));
    });

    self.maleFilter = ko.observable(); // property to store the filter
    self.femaleFilter = ko.observable(); // property to store the filter
    self.petFilter = ko.observable(); // property to store the filter

    self.takeMales = function (answer) {
        self.maleFilter(answer);
    };

    self.takeFemales = function (answer) {
        self.femaleFilter(answer);
    };

    self.takePets = function (answer) {
        self.petFilter(answer);
    };

    self.age = ko.observable("");

    self.reset = function () {
        self.takeMales();
        self.takeFemales();
        self.takePets();
        self.age(null);
    };

    self.maleShelters = ko.computed(function () {
       if(!self.maleFilter()) {
           return ko.utils.arrayFilter(self.shelterlist(), function(hostel) {
               var filtered = hostel.active === true;
               if (hostel.marker) {
                   hostel.marker.setVisible(filtered);
               }
               return filtered
           });
           // return self.shelterlist();
       } else {
           return ko.utils.arrayFilter(self.shelterlist(), function(hostel) {
                var filtered = hostel.males === self.maleFilter();
                if (hostel.marker) {
                    hostel.marker.setVisible(filtered);
                }
                return filtered
           });
       }
    });

    self.femaleShelters = ko.computed(function () {
        if(!self.femaleFilter()) {
            return ko.utils.arrayFilter(self.maleShelters(), function(hostel) {
                var filtered = hostel.active === true;
                if (hostel.marker) {
                    hostel.marker.setVisible(filtered);
                }
                return filtered
            });
            // return self.maleShelters();
        } else {
            return ko.utils.arrayFilter(self.maleShelters(), function(hostel) {
                var filtered = hostel.females === self.femaleFilter();
                if (hostel.marker) {
                    hostel.marker.setVisible(filtered);
                }
                return filtered
            });
        }
    });

    self.petShelters = ko.computed(function () {
        if(!self.petFilter()) {
            return ko.utils.arrayFilter(self.femaleShelters(), function(hostel) {
                var filtered = hostel.active === true;
                if (hostel.marker) {
                    hostel.marker.setVisible(filtered);
                }
                return filtered
            });
            // return self.femaleShelters();
        } else {
            return ko.utils.arrayFilter(self.femaleShelters(), function(hostel) {
                var filtered = hostel.pets === self.petFilter();
                if (hostel.marker) {
                    hostel.marker.setVisible(filtered);
                }
                return filtered
            });
        }
    });

    self.filteredShelters = ko.computed(function () {
        if(!self.age()) {
            return ko.utils.arrayFilter(self.petShelters(), function(hostel) {
                var filtered = hostel.active === true;
                if (hostel.marker) {
                    hostel.marker.setVisible(filtered);
                }
                return filtered
            });
            // return self.petShelters();
        } else {
            return ko.utils.arrayFilter(self.petShelters(), function(hostel) {
                var filtered = hostel.minAge <= self.age() && hostel.maxAge >= self.age();
                if (hostel.marker) {
                    hostel.marker.setVisible(filtered);
                }
                return filtered
            });
        }
    });

    self.showLabel = function(hostel) {
        google.maps.event.trigger(hostel.marker, "click")
        // wikiData(hostel.title)
    }

    // prior attempt at itterative filtering:
    // var filterSet = ko.observableArray([
    //     self.maleFilter()
    // ]);
    //
    // self.filteredShelters = ko.computed(function() {
    //     var currentList = self.shelterList();
    //     var currentFilters = self.filterSet();
    //
    //     ko.utils.arrayForEach(currentFilters, function () {
    //         currentList = ko.utils.arrayFilter(currentList, function(filter) {
    //             return app.utils.inArray(filter, currentFilters);
    //         });
    //     });
    //
    //     return currentList;
    // });

};

var initMap = function() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:  55.953252, lng: -3.188267},
        zoom: 13,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": "49"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.landcover",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "40"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "25"
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "40"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": "-47"
                    },
                    {
                        "lightness": "37"
                    }
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "40"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "40"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "24"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit.station.airport",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit.station.bus",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit.station.rail",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#ff0000"
                    },
                    {
                        "saturation": "-25"
                    },
                    {
                        "lightness": "40"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#97b9c7"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ], // created with https://snazzymaps.com/editor/edit-my-style/113338
        mapTypeControl: true,   // https://developers.google.com/maps/documentation/javascript/controls
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_BOTTOM
        }
    });

    // this gives a "Cannot read property 'forEach' of undefined" TypeError:
    // viewModel.filteredShelters.forEach(function(shelter){
    //
    // this gives a "Cannot read property 'length' of undefined" TypeError:
    // for (var x=0; x < viewModel.filteredShelters.length; x++) {
    //     var self = viewModel.locations[x];
    //
    // this works as expected, but that means plotting all shelters (unfiltered):

    var largeInfowindow = new google.maps.InfoWindow();

    var bounds = new google.maps.LatLngBounds();

    var normMarker = {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,  // https://www.tutorialspoint.com/google_maps/google_maps_symbols.htm
        scale: 5,
        strokeWeight: 3,
        strokeColor: "#ea3323"
    };

    var boldMarker = {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,  // https://www.tutorialspoint.com/google_maps/google_maps_symbols.htm
        scale: 5,
        strokeWeight: 3,
        strokeColor: "#ea3323",
        fillColor: "#ea3323",
        fillOpacity: 0.5
    };

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

        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function(){ marker.setAnimation(null); }, 400);
        });

        marker.addListener('mouseover', function() {
            this.setIcon(boldMarker);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(normMarker);
        });
    });
    map.fitBounds(bounds);
};

function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
        infowindow.marker = marker;
        infowindow.setContent(
            '<div><strong>' + marker.title + '</strong></div>'
            + '<div>&#9659; ' + marker.address + '</div>'
            + '<div>&#9659; ' + marker.phone + '</div>'
            + '<a href="mailto:' + marker.email + '?Subject=HomePointr%20enquiry">Email</a>'
            + ' | <a href="' + marker.url + '" target="_blank">Website</a>'
            + ' | <a href="' + marker.wiki + '" target="_blank">Wikipedia</a>'
        );
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
        });
    }
}

// NEED TO DE-AJAX THIS
// function wikiData(searchstring) {
//
//     var $wikiElem = $('#wikipedia-links');
//
//     // clear out old data before new request
//     $wikiElem.text("");
//
//     var wikipediaEndPointUrl = "https://en.wikipedia.org/w/api.php";
//     var wikiRequestTimeout = setTimeout(function(){ $wikiElem.text("failed to get wikipedia resources");}, 4000);
//     $.ajax({
//         url: wikipediaEndPointUrl,
//         data: {
//             "action": "opensearch",
//             "search": searchstring,
//             "format": "json",
//         },
//         dataType: "jsonp",
//         success: function (response) {
//             linkDisplays = response[1];
//             links = response[3];
//             var articles = [];
//             for (var index = 0; index < response[1].length; index++) {
//                 articles.push(
//                     "<li><a href=" + '"' + links[index] + '"' + ">" + linkDisplays[index] + "</a></li>");
//             }
//             $wikiElem.append(articles);
//             clearTimeout(wikiRequestTimeout);
//         }
//     });
//
//     return false;
// };

var vm = new viewModel();
ko.applyBindings(vm);

// tried &callback=viewModel.initMap (in js & in google async call, viewModel.initMap - all raised errors
// tried moving instantiation & activation of vm inside initMap
//
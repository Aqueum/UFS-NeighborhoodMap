/**
 * Created by Martin Currie (https://github.com/Aqueum) on 07/07/2017.
 */

var shelters = [
    {
        title: 'Bethany House',
        location: {lat: 55.976019, lng: -3.176873},
        address: '12 Couper Street',
        phone: '0131 561 8911',
        email: 'info@bethanychristiantrust.com',
        wiki: 'https://en.wikipedia.org/wiki/Bethany_Christian_Trust#Emergency_accommodation_-_Bethany_House',
        url: 'http://www.bethanychristiantrust.com/services/emergency-resettlement/',
        twitter: '@_BethanyCT',
        males: true,
        females: true,
        minAge: 16,
        maxAge: 999,
        pets: false,
        active: true
    },{
        title: 'Pleasance Lifehouse',
        location: {lat: 55.949095, lng: -3.183409},
        address: '1 The Pleasance',
        phone: '0131 556 9674',
        email: 'eastscotland@salvationarmy.org.uk',
        wiki: 'https://en.wikipedia.org/wiki/The_Salvation_Army',
        url: 'https://www.salvationarmy.org.uk/pleasance-lifehouse',
        twitter: '@salvationarmyuk',
        males: true,
        females: false,
        minAge: 18,
        maxAge: 70,
        pets: false,
        active: true
    },{
        title: 'Castlecliff',
        location: {lat: 55.948042, lng: -3.197942},
        address: '25 Johnston Terrace',
        phone: '0131 225 1643',
        email: 'castlecliff@edinburgh.gov.uk',
        wiki: 'https://en.wikipedia.org/wiki/Politics_of_Edinburgh#Council_and_committees',
        url: 'https://www.edinburgh.gov.uk/directory_record/20741/castlecliff',
        twitter: '@Edinburgh_CC',
        males: true,
        females: true,
        minAge: 16,
        maxAge: 999,
        pets: true,
        active: true
    },{
        title: 'Keymoves',
        location: {lat: 55.950814, lng: -3.184032},
        address: '2 Cranston Street',
        phone: '0131 556 8939',
        email: 'info@keymoves.org.uk',
        wiki: 'https://en.wikipedia.org/wiki/Keymoves',
        url: 'http://www.keymoves.org.uk/',
        twitter: '',
        males: false,
        females: true,
        minAge: 18,
        maxAge: 999,
        pets: false,
        active: true
    },{
        title: 'Cunningham House',
        location: {lat: 55.948521, lng: -3.188035},
        address: '205 Cowgate',
        phone: '0131 225 4795',
        email: 'info@crossreach.org.uk',
        wiki: 'https://en.wikipedia.org/wiki/Church_of_Scotland#Councils',
        url: 'http://www.crossreach.org.uk/cunningham-house',
        twitter: '@CrossReach',
        males: true,
        females: true,
        minAge: 18,
        maxAge: 65,
        pets: false,
        active: true
    },{
        title: 'Dunedin Harbour',
        location: {lat: 55.974320, lng: -3.172797},
        address: '4 Parliament Street',
        phone: '0131 624 5800',
        email: 'hostel@dunedincanmore.org.uk',
        wiki: 'https://en.wikipedia.org/wiki/Dunedin_Harbour',
        url: 'https://www.dunedincanmore.org.uk/2/dunedin-harbour',
        twitter: '@DunedinCanmore',
        males: true,
        females: true,
        minAge: 16,
        maxAge: 999,
        pets: true,
        active: true
    },{
        title: 'Number Twenty',
        location: {lat: 55.958834, lng: -3.188510},
        address: '20 Broughton Place',
        phone: '0131 557 1739',
        email: 'lindam@foursquare.org.uk',
        wiki: 'https://en.wikipedia.org/wiki/Number_Twenty',
        url: 'http://www.foursquare.org.uk/our-services/accommodation-and-support/number-20/',
        twitter: '@FourSquareEdin',
        males: false,
        females: true,
        minAge: 16,
        maxAge: 21,
        pets: false,
        active: true
    },{
        title: 'Stopover',
        location: {lat: 55.944195, lng: -3.211942},
        address: '40 Grove Street',
        phone: '0131 229 6907',
        email: 'lindam@foursquare.org.uk',
        wiki: 'https://en.wikipedia.org/wiki/Stopover_Edinburgh',
        url: 'http://www.foursquare.org.uk/our-services/accommodation-and-support/stopover/',
        twitter: '@FourSquareEdin',
        males: true,
        females: true,
        minAge: 16,
        maxAge: 21,
        pets: false,
        active: true
    }
];

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

    shelters.forEach(function(thing){
        self.shelterlist.push( new Shelter(thing));
    });

    self.maleFilter = ko.observable(); // property to store the filter
    self.femaleFilter = ko.observable(); // property to store the filter
    self.petFilter = ko.observable(); // property to store the filter
    self.activeFilter = ko.observable(); // property to store the filter

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

    self.reset = function (answer) {
        self.activeFilter(answer);
        self.takeMales();
        self.takeFemales();
        self.takePets();
        self.age(null);
    };

    self.maleShelters = ko.computed(function () {
       if(!self.maleFilter()) {
           // return ko.utils.arrayFilter(self.shelterlist(), function(hostel) {
           //     var filtered = hostel.active === true;
           //     hostel.marker.setVisible(filtered);
           //     return filtered
           // });
           return self.shelterlist();
       } else {
           return ko.utils.arrayFilter(self.shelterlist(), function(hostel) {
                var filtered = hostel.males === self.maleFilter();
                hostel.marker.setVisible(filtered);
                return filtered
           });
       }
    });

    self.femaleShelters = ko.computed(function () {
        if(!self.femaleFilter()) {
            // return ko.utils.arrayFilter(self.maleShelters(), function(hostel) {
            //     var filtered = hostel.active === self.activeFilter();
            //     hostel.marker.setVisible(filtered);
            //     return filtered
            // });
            return self.maleShelters();
        } else {
            return ko.utils.arrayFilter(self.maleShelters(), function(hostel) {
                var filtered = hostel.females === self.femaleFilter();
                hostel.marker.setVisible(filtered);
                return filtered
            });
        }
    });

    self.petShelters = ko.computed(function () {
        if(!self.petFilter()) {
            // return ko.utils.arrayFilter(self.femaleShelters(), function(hostel) {
            //     var filtered = hostel.active === self.activeFilter();
            //     hostel.marker.setVisible(filtered);
            //     return filtered
            // });
            return self.femaleShelters();
        } else {
            return ko.utils.arrayFilter(self.femaleShelters(), function(hostel) {
                var filtered = hostel.pets === self.petFilter();
                hostel.marker.setVisible(filtered);
                return filtered
            });
        }
    });

    self.filteredShelters = ko.computed(function () {
        if(!self.age()) {
            // return ko.utils.arrayFilter(self.petShelters(), function(hostel) {
            //     var filtered = hostel.active === self.activeFilter();
            //     hostel.marker.setVisible(filtered);
            //     return filtered
            // });
            return self.petShelters();
        } else {
            return ko.utils.arrayFilter(self.petShelters(), function(hostel) {
                var filtered = hostel.minAge <= self.age() && hostel.maxAge >= self.age();
                hostel.marker.setVisible(filtered);
                return filtered
            });
        }
    });

    self.showLabel = function(hostel) {
        console.log(hostel);
        initMap.openInfoWindow(hostel);
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

    var bigMarker = {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,  // https://www.tutorialspoint.com/google_maps/google_maps_symbols.htm
        scale: 6,
        strokeWeight: 4,
        strokeColor: "#ea3323"
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
        });

        marker.addListener('mouseover', function() {
            this.setIcon(bigMarker);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(normMarker);
        });
    });
    map.fitBounds(bounds);

    function openInfoWindow(marker) {
        populateInfoWindow(marker, largeInfowindow);
    }
};

function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
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

var vm = new viewModel();
ko.applyBindings(vm);

// tried &callback=viewModel.initMap (in js & in google async call, viewModel.initMap - all raised errors
// tried moving instantiation & activation of vm inside initMap
//
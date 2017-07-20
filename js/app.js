/**
 * Created by Martin Currie (https://github.com/Aqueum) on 07/07/2017.
 */

var shelters = [{
        title: 'Bethany House',
        location: {lat: 55.976019, lng: -3.176873},
        wiki: 'https://en.wikipedia.org/wiki/Bethany_Christian_Trust#Emergency_accommodation_-_Bethany_House',
        url: 'http://www.bethanychristiantrust.com/services/emergency-resettlement/',
        twitter: '@_BethanyCT'
    },{
        title: 'The Pleasance Lifehouse',
        location: {lat: 55.949095, lng: -3.183409},
        wiki: 'https://en.wikipedia.org/wiki/The_Salvation_Army',
        url: 'https://www.salvationarmy.org.uk/pleasance-lifehouse',
        twitter: '@salvationarmyuk'
    },{
        title: 'Access Point',
        location: {lat: 55.95411, lng: -3.187813},
        wiki: 'https://en.wikipedia.org/wiki/Politics_of_Edinburgh#The_City_of_Edinburgh_Council',
        url: 'https://www.edinburgh.gov.uk/site/scripts/home_info.php?homepageID=60&recordID=5290',
        twitter: '@Edinburgh_CC ‏'
    },{
        title: 'Homeless Action Scotland',
        location: {lat: 55.94488, lng: -3.227132},
        wiki: '',
        url: 'https://www.homelessactionscotland.org.uk/',
        twitter: '@1HomelessAction'
    },{
        title: 'Gowrie Care - Tollcross View',
        location: {lat: 55.944497, lng: -3.200479},
        wiki: '',
        url: 'https://hillcrest.org.uk/Gowrie+Care/',
        twitter: '@Hillcrest_Group'
    }
];

var Shelter = function(data) {
    this.title = ko.observable(data.title);
    this.location = ko.observable(data.location);
    this.wiki = ko.observable(data.wiki);
    this.url = ko.observable(data.url);
    this.twitter = ko.observable(data.twitter);
};

var ViewModel = function() {
    var self = this;

    this.shelterlist = ko.observableArray([]);

    shelters.forEach(function(shelter){
        self.shelterlist.push( new Shelter(shelter));
    });
};

function initMap() {
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
    shelters.forEach(function(shelter){
        var marker = new google.maps.Marker({
            position: shelter.location,
            map: map,
            title: shelter.title,
            icon: {
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 5,
                strokeWeight:3,
                strokeColor:"#F07"
            },
        });
    })

}

ko.applyBindings(new ViewModel());
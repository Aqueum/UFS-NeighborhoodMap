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

var wikidatum = function(data) {
    this.wikiTitle = data.wikiTitle;
    this.wikiInfo = data.wikiInfo;
    this.wikiURL = data.wikiURL;
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

    self.showLabel = function(hostel) {
        google.maps.event.trigger(hostel.marker, "click");
    };

    self.verbose = ko.observable(false);

    self.more = function(answer) {
        self.verbose(answer);
    };

    self.wikidata = ko.observableArray([]);

    self.wikiSearch = function (searchstring) {

        var wikipediaEndPointUrl = "https://en.wikipedia.org/w/api.php";
        var wikiRequestTimeout = setTimeout(function(){
            self.wikidata.push(new wikidatum({
                wikiTitle: 'Wikipedia timed out with no results',
                wikiInfo: '',
                wikiURL: ''
            }));
        }, 4000);
        $.ajax({
            url: wikipediaEndPointUrl,
            data: {
                "action": "opensearch",
                "search": searchstring,
                "format": "json"
            },
            dataType: "jsonp",
            success: function (response) {
                self.wikidata([]); // reset wikidata at start of search
                for (var article=0; article < response[1].length; article++) {
                    self.wikidata.push(new wikidatum({
                        wikiTitle: response[1][article],
                        wikiInfo: response[2][article],
                        wikiURL: response[3][article]
                    }));
                }
                clearTimeout(wikiRequestTimeout);
            }
        });
    };

    self.wikio = ko.observable(this.wiki);
};

var initMap = function() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:  55.953252, lng: -3.188267},
        zoom: 13,
        styles: styles,
        mapTypeControl: true,   // https://developers.google.com/maps/documentation/javascript/controls
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_BOTTOM
        }
    });

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

var vm = new viewModel();
ko.applyBindings(vm);
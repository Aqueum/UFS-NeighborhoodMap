/**
 * Created by Martin Currie (https://github.com/Aqueum) on 07/07/2017.
 */

// data import
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

// Knockout JS' (MVVM) ViewModel
var ViewModel = function() {
    var self = this;

    // initialise & populate list of hostels
    self.shelterlist = ko.observableArray([]);

    shelters.forEach(function(data){
        self.shelterlist.push( new Shelter(data));
    });

    // initialise properties to store the filters
    self.maleFilter = ko.observable();
    self.femaleFilter = ko.observable();
    self.petFilter = ko.observable();
    self.age = ko.observable("");

    // filter function calls
    self.takeMales = function (answer) {
        self.maleFilter(answer);
    };

    self.takeFemales = function (answer) {
        self.femaleFilter(answer);
    };

    self.takePets = function (answer) {
        self.petFilter(answer);
    };

    self.reset = function () {
        self.takeMales();
        self.takeFemales();
        self.takePets();
        self.age(null);
    };

    // filter application cascade
    self.maleShelters = ko.computed(function () {
       if(!self.maleFilter()) {
           return ko.utils.arrayFilter(self.shelterlist(),
               function(hostel) {
               var filtered = hostel.active === true;
               if (hostel.marker) {
                   hostel.marker.setVisible(filtered);
               }
               return filtered;
           });
       } else {
           return ko.utils.arrayFilter(self.shelterlist(),
               function(hostel) {
                var filtered = hostel.males === self.maleFilter();
                if (hostel.marker) {
                    hostel.marker.setVisible(filtered);
                }
                return filtered;
           });
       }
    });

    self.femaleShelters = ko.computed(function () {
        if(!self.femaleFilter()) {
            return ko.utils.arrayFilter(self.maleShelters(),
                function(hostel) {
                var filtered = hostel.active === true;
                if (hostel.marker) {
                    hostel.marker.setVisible(filtered);
                }
                return filtered;
            });
        } else {
            return ko.utils.arrayFilter(self.maleShelters(),
                function(hostel) {
                var filtered = hostel.females === self.femaleFilter();
                if (hostel.marker) {
                    hostel.marker.setVisible(filtered);
                }
                return filtered;
            });
        }
    });

    self.petShelters = ko.computed(function () {
        if(!self.petFilter()) {
            return ko.utils.arrayFilter(self.femaleShelters(),
                function(hostel) {
                var filtered = hostel.active === true;
                if (hostel.marker) {
                    hostel.marker.setVisible(filtered);
                }
                return filtered;
            });
        } else {
            return ko.utils.arrayFilter(self.femaleShelters(),
                function(hostel) {
                var filtered = hostel.pets === self.petFilter();
                if (hostel.marker) {
                    hostel.marker.setVisible(filtered);
                }
                return filtered;
            });
        }
    });

    self.filteredShelters = ko.computed(function () {
        if(!self.age()) {
            return ko.utils.arrayFilter(self.petShelters(),
                function(hostel) {
                var filtered = hostel.active === true;
                if (hostel.marker) {
                    hostel.marker.setVisible(filtered);
                }
                return filtered;
            });
        } else {
            return ko.utils.arrayFilter(self.petShelters(),
                function(hostel) {
                var filtered = hostel.minAge <= self.age() && hostel.maxAge >= self.age();
                if (hostel.marker) {
                    hostel.marker.setVisible(filtered);
                }
                return filtered;
            });
        }
    });

    // event listener to trigger marker clicks when list clicked
    self.showLabel = function(hostel) {
        google.maps.event.trigger(hostel.marker, "click");
    };
};

var vm = new ViewModel();
ko.applyBindings(vm);
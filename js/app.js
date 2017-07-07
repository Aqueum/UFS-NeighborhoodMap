/**
 * Created by Martin Currie (https://github.com/Aqueum) on 07/07/2017.
 */

var shelters = [{
        title: 'Bethany House',
        location: {lat: 55.976019, lng: -3.176873}
    },{
        title: 'The Pleasance Lifehouse',
        location: {lat: 55.949095, lng: -3.183409}
    },{
        title: 'Access Point',
        location: {lat: 55.95411, lng: -3.187813}
    },{
        title: 'Homeless Action Scotland',
        location: {lat: 55.94488, lng: -3.227132}
    },{
        title: 'Gowrie Care - Tollcross View',
        location: {lat: 55.944497, lng: -3.200479}
    }
];

var Shelter = function(data) {
    this.title = ko.observable(data.title);
    this.location = ko.observable(data.location);
};

var ViewModel = function() {
    var self = this;

    this.shelterlist = ko.observableArray([]);

    shelters.forEach(function(shelter){
        self.shelterlist.push( new Shelter(shelter));
    });

};

ko.applyBindings(new ViewModel());
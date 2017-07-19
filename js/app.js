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

ko.applyBindings(new ViewModel());
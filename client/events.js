//For Events
Template.events.helpers({
    events: function() {
        return Events.find({}, {sort:{date:1}});
    },
    date: function() {
        return this.date.toDateString().substring(0,3);
    },
    day: function() {
        return this.date.getDate();
    },
    year: function() {
        return this.date.getFullYear();
    },
    month: function() {
        return this.date.toDateString().substring(4,7);
    }
});

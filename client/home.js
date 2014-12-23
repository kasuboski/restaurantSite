//For home page
Template.hours.helpers({
    hours: function() {
        return Hours.find();
    }
});

Template.nextEvent.helpers({
    event: function() {
        return Events.findOne({},{sort: {date: 1}});
    },
    haveEvent: function() {
        return Events.find().count() > 0;
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

Template.specials.helpers({
    haveSpecial: function() {
        return Specials.find().count() > 0;
    },
    specials: function() {
        return Specials.find({});
    }
});

Template.special.helpers({
    priceDollars: function () {
        return Math.floor(this.price);
    },
    priceCents: function () {
        return (this.price-Math.floor(this.price)).toFixed(2).toString().substring(2);
    }
});

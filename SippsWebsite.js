Events = new Mongo.Collection("events");
Specials = new Mongo.Collection("specials");
Menu = new Mongo.Collection("menu");
Categories = new Mongo.Collection("categories");
Hours = new Mongo.Collection("hours");

Router.configure({
    layoutTemplate: 'layout'
});

Router.onAfterAction(function() {
    document.title = "Sipp's Bar N Grill";
});

Router.route('/', function() {
    this.render('home');
}, {
    name: "home"
});

Router.route('/menu', function() {
    this.render('menu');
}, {
    name: "menu"
});

Router.route('/events', function() {
    this.render('events');
}, {
    name: "events"
});

Router.route('/contact', function() {
    this.render('contact');
}, {
    name: "contact"
});

Router.route('/admin', function() {
    if(Meteor.userId()){
        this.layout('');
        this.render('dashboard');
    }
    else {
        this.layout('');
        this.render('signin');
    }
}, {
    name: "admin"
});

if (Meteor.isClient) {

    //for layout
    Template.layout.helpers({
        activeIfTemplateIs: function (template) {
            var currentRoute = Router.current();
            return template === currentRoute.lookupTemplate() ? 'active' : '';
        }
    });

}

//methods
Meteor.methods({
    addSpecial: function(name, price, desc) {
        if( ! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Specials.insert({
                name: name,
                price: price,
                description: desc
        });
    },
    removeSpecial: function(specialId) {
        if( ! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Specials.remove(specialId);
    },
    addEvent: function(name, date, times, desc, link) {
        if(! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Events.insert({
            name: name,
            date: date,
            times: times,
            description: desc,
            link: link
        });
    },
    removeEvent: function(eventId) {
        if( ! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Events.remove(eventId);
    },
    addCategory: function(name,desc,order) {
        if(! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Categories.insert({
            name: name,
            description: desc,
            order: order
        });
    },
    removeCategory: function(categoryId) {
        if( ! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Categories.remove(categoryId);
    },
    addMenuItem: function(name, price, desc, category) {
        if( ! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Menu.insert({
            name: name,
            price: price,
            description: desc,
            category: category
        });
    },
    removeMenuItems: function(selector) {
        if( ! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Menu.remove(selector);
    },
    addHour: function(days,times) {
        if( ! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Hours.insert({
            days: days,
            times: times
        });
    },
    removeHour: function(hourId) {
        if( ! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Hours.remove(hourId);
    }
});

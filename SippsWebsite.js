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

if (Meteor.isClient) {

    //for layout
    Template.layout.helpers({
        activeIfTemplateIs: function (template) {
            var currentRoute = Router.current();
            return template === currentRoute.lookupTemplate() ? 'active' : '';
        }
    });

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

    //For Menu
    Template.menu.helpers({
        categories: function() {
            return Categories.find({},{sort: {order: 1}});
        },
        items: function() {
            return Menu.find({category: this});
        }
    });

    Template.item.helpers({
        priceDollars: function () {
            return Math.floor(this.price);
        },
        priceCents: function () {
            return (this.price-Math.floor(this.price)).toFixed(2).toString().substring(2);
        }
    });

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

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Events.find().count() === 0) {
        Events.insert({
            name: "Test Event 2",
            date: new Date("1/23/15"),
            times: "11am - 12pm",
            description: "So much fun",
            link: "http://joshcorp.co"
        })

        Events.insert({
            name: "Test Event",
            date: new Date("12/25/14"),
            times: "6pm - 12pm",
            description: "A really good time",
            link: "http://joshcorp.co"
        });
    }

    if(Specials.find().count() === 0) {
        Specials.insert({
            name: "Chicken",
            price: 5.50,
            description: "It's delicious"
        });

        Specials.insert({
            name: "Steak",
            price: 4.50,
            description: "STEAK"
        })
    }

    if(Hours.find().count() === 0) {
        Hours.insert({
            days: "Sunday - Thursday",
            times: "11am-2am"
        });

        Hours.insert({
            days: "Friday / Saturday",
            times: "11am-2:30am"
        });
    }

    if(Categories.find().count() === 0) {
        Categories.insert({
            name: "Steaks and Dinners",
            description: "Steaky",
            order: 6
        });

        Categories.insert({
            name: "Appetizers",
            description: "Share or don't",
            order: 1
        })
    }

    if(Menu.find().count() === 0) {
        Menu.insert({
            name: "Pork Chops",
            price: 14.50,
            description: "Choppy",
            category: Categories.findOne({name: "Steaks and Dinners"})
        });

        Menu.insert({
            name: "Ribs and Chicken Combo",
            price: 14.00,
            description: "Two Things!",
            category: Categories.findOne({name: "Steaks and Dinners"})
        });

        Menu.insert({
            name: "Cheese Nuggets",
            price: 3.29,
            description: "",
            category: Categories.findOne({name: "Appetizers"})
        });

        Menu.insert({
            name: "Onion Rings",
            price: 3.50,
            description: "So Many Onions",
            category: Categories.findOne({name: "Appetizers"})
        })
    }

  });
}

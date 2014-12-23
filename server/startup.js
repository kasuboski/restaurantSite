Meteor.startup(function () {
    if(Meteor.users.find().count() === 0) {
        Accounts.createUser({
            username: "SippsAdmin",
            password: "SippsBarCascade507"
        });
    }

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

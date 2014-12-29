Meteor.publish('events', function() {
    return Events.find();
});

Meteor.publish('specials', function() {
    return Specials.find();
});

Meteor.publish('menu', function() {
    return Menu.find();
});

Meteor.publish('categories', function() {
    return Categories.find();
});

Meteor.publish('hours', function() {
    return Hours.find();
});

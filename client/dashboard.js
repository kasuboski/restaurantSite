Template.dashboard.helpers({
    specials: function() {
        return Specials.find({});
    },
    events: function() {
        return Events.find({}, {sort:{date:1}});
    }
});

Template.specialRemove.helpers({
    priceDollars: function () {
        return Math.floor(this.price);
    },
    priceCents: function () {
        return (this.price-Math.floor(this.price)).toFixed(2).toString().substring(2);
    }
});

Template.addSpecial.events({
    'submit #add-special': function(e,t) {
        e.preventDefault();

        var name = t.find("#inputName").value;
        var price = t.find("#inputPrice").value;
        var desc = t.find("#inputDesc").value;

        t.find("#inputName").value = "";
        t.find("#inputPrice").value = "";
        t.find("#inputDesc").value = "";

        //validate: need to verify price is a valid number
        if($.isNumeric(price)) {
            price = parseFloat(price);
            if(price > 0) {
                //round to 2 decimals
                price = price.toFixed(2);
                if(name != "") {
                    //add to database
                    $("#add-special .error").hide();
                    Meteor.call("addSpecial",name,price,desc);
                }
                else {
                    $("#add-special .error").text("Error: Special must have a name");
                    $("#add-special .error").show();
                }
            }
            else {
                $("#add-special .error").text("Error: Price must be greater than 0.");
                $("#add-special .error").show();
            }
        }else {
            //notify it wasn't a number
            $("#add-special .error").text("Error: Price must be a number.");
            $("#add-special .error").show();
        }

        return false;
    }
});

Template.specialRemove.events({
    'click .delete' : function() {
        Meteor.call("removeSpecial", this._id);
    }
});

Template.addEvent.events({
    'submit #add-event': function(e,t) {
        e.preventDefault();

        var name = t.find("#inputName").value;
        var date = t.find("#inputDate").value;
        var time = t.find("#inputTime").value;
        var link = t.find("#inputLink").value;
        var desc = t.find("#inputDesc").value;

        t.find("#inputName").value = "";
        t.find("#inputDate").value = "";
        t.find("#inputTime").value = "";
        t.find("#inputLink").value = "";
        t.find("#inputDesc").value = "";

        //validate
        if(name != "" && date != "" && time != "") {
            Meteor.call("addEvent",name,new Date(date),time,desc,link);
            $("#add-event .error").hide();
        }
        else {
            $("#add-event .error").text("Error: Name, Date, and Time all need values");
            $("#add-event .error").show();
        }
    }
});

Template.datepicker.rendered = function() {
    $('.datepicker').datepicker({
        keyboardNavigation: false,
        autoclose: true,
        todayHighlight: true
    });
};

Template.eventRemove.events({
        'click .delete': function() {
            Meteor.call("removeEvent", this._id);
        }
});

Template.editMenu.helpers({
    categories: function() {
        return Categories.find({},{sort: {order: 1}});
    },
    items: function() {
        return Menu.find({category: this});
    }
});

Template.editMenu.events({
    'click #removeCategory': function() {
        // console.log("remove: " +this._id);
        // console.log("remove: " + Menu.find({category: this}).fetch());
        Meteor.call("removeCategory", this._id);
        Meteor.call("removeMenuItems",{category: this._id});
    }
});

Template.itemRemove.helpers({
    priceDollars: function () {
        return Math.floor(this.price);
    },
    priceCents: function () {
        return (this.price-Math.floor(this.price)).toFixed(2).toString().substring(2);
    }
});

Template.addMenuItem.helpers({
    categories: function() {
        return Categories.find({},{sort: {order: 1}});
    }
});

Template.addMenuItem.events({
        'submit #add-menu-item': function(e,t) {
            e.preventDefault();

            var name = t.find("#inputName").value;
            var price = t.find("#inputPrice").value;
            var category = $(" #add-menu-item #inputCategory").val();
            var desc = t.find("#inputDesc").value;

            t.find("#inputName").value = "";
            t.find("#inputPrice").value = "";
            t.find("#inputDesc").value = "";

            //validate: need to verify price is a valid number
            if($.isNumeric(price)) {
                price = parseFloat(price);
                if(price > 0) {
                    //round to 2 decimals
                    price = price.toFixed(2);
                    if(name != "") {
                        //add to database
                        $("#add-menu-item .error").hide();
                        Meteor.call("addMenuItem",name,price,desc,category);
                    }
                    else {
                        $("#add-menu-item .error").text("Error: Item must have a name");
                        $("#add-menu-item .error").show();
                    }
                }
                else {
                    $("#add-menu-item .error").text("Error: Price must be greater than 0.");
                    $("#add-menu-item .error").show();
                }
            }else {
                //notify it wasn't a number
                $("#add-menu-item .error").text("Error: Price must be a number.");
                $("#add-menu-item .error").show();
            }

            return false;
        }
});

Template.categories.events({
    'submit #add-category': function(e,t) {
        e.preventDefault();

        var name = t.find("#inputName").value;
        var desc = t.find("#inputDesc").value;
        var order = t.find("#inputOrder").value;

        t.find("#inputName").value = "";
        t.find("#inputDesc").value = "";
        t.find("#inputOrder").value = "";

        //validate
        if(name != "" && $.isNumeric(order) && parseInt(order) > 0) {
            Meteor.call("addCategory",name,desc,parseInt(order));
            $("#add-category .error").hide();
        }
        else {
            $("#add-category .error").text("Error: Name needs a value and order must be a positive integer");
            $("#add-category .error").show();
        }

        return false;
    }
});

Template.hoursChange.helpers({
    hours: function() {
        return Hours.find();
    }
});

Template.hoursChange.events({
    'click #removeHours': function() {
        Meteor.call("removeHour", this._id);
    }
});

Template.addHours.events({
    'submit #add-hours': function(e,t) {
        e.preventDefault();

        var days = t.find("#inputDays").value;
        var times = t.find("#inputTimes").value;

        t.find("#inputDays").value = "";
        t.find("#inputTimes").value = "";

        //validate
        if(days != "" && times != "") {
            Meteor.call("addHour",days,times);
            $("#add-hours .error").hide();
        }
        else {
            $("#add-hours .error").text("Error: Days and Times need a value");
            $("#add-hours .error").show();
        }

        return false;
    }
})

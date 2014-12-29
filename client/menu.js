//For Menu
Template.menu.helpers({
    categories: function() {
        return Categories.find({},{sort: {order: 1}});
    }
});

Template.menuItems.helpers({
    items: function() {
        return Menu.find({category: this._id});
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

exports.none = Object.create({
    value: function() {
        throw new Error('Called value on none');
    },
    map: function() {
        return exports.none;
    },
    toArray: function() {
        return [];
    },
    orElse: callOrReturn,
    valueOrElse: callOrReturn
});

function callOrReturn(value) {
    if (typeof(value) == "function") {
        return value();
    } else {
        return value;
    }
}

exports.some = function(value) {
    return new Some(value);
};

var Some = function(value) {
    this._value = value;
};

Some.prototype.value = function() {
    return this._value;
};

Some.prototype.map = function(func) {
    return new Some(func(this._value));
};

Some.prototype.toArray = function() {
    return [this._value];
};

Some.prototype.orElse = function(value) {
    return this;
};

Some.prototype.valueOrElse = function(value) {
    return this._value;
};

exports.isOption = function(value) {
    return value === exports.none || value instanceof Some;
};

exports.fromNullable = function(value) {
    if (value == null) {
        return exports.none;
    }
    return new Some(value);
}

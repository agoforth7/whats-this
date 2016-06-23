/**
 * Set-up
 */

if (typeof window === 'undefined') {
    global.whatsThis = whatsThis;
} else {
    global = window;
}

var obj = {
    id: 'object',
    whatsThis: whatsThis,
    inner: {
        id: 'inner-object',
        whatsThis: whatsThis
    }
};

var tricky = {
    id: 'tricky'
};

var location = {
    state: 'Alaska',
    city: 'Anchorage'
};

function whatsThis() {
    console.log('This is...', this);
    return this;
}

function Ctor() {
    this.id = 'constructor';
    whatsThis.call(this);
}

Ctor.whatsThis = whatsThis;

Ctor.prototype.whatsThis = whatsThis;



/**
 * Exercises
 */

var ex;

// Exercise 1

ex = whatsThis();
// 'this' will evaluate to the global or window object, because it is not in the context of an object.
console.assert(ex === global);


// Exercise 2

ex = global.whatsThis();
// 'this' will evaluate to the global object, because it is being used in the context of the global object.
console.assert(ex === global);


// Exercise 3

ex = obj.whatsThis();
// 'this' evaluates to 'undefined', because it is being referenced in the scope of the object 'obj' but has not had a value assigned to it.
// console.assert(ex === undefined);
// OK, maybe not. 'this' is the object 'obj' itself because it is being referenced from within the scope of 'obj'.
console.assert(ex.id === 'object');


// Exercise 4

ex = obj.inner.whatsThis();
// 'this' will evaluate to the object 'inner' because it is being referenced from within the object 'inner'.
console.assert(ex.id === 'inner-object');


// Exercise 5

ex = obj.inner.whatsThis();
// 'this' will evaluate to the object 'inner' because it is being referenced from within the object 'inner'.
console.assert(ex.whatsThis === whatsThis);


// Exercise 6

ex = whatsThis.call(null);
// 'this' will evaluate to the global object, because 'null' is replaced with the global object.
console.assert(ex === global);


// Exercise 7

ex = whatsThis.call(location);
// 'this' will evaluate to the object 'location', because 'location' is being passed into the function as thisArg.
console.assert(ex.state === 'Alaska');


// Exercise 8

ex = whatsThis.apply(tricky);
// 'this' will evaluate to undefined, because .apply takes an array as a second argument, which is set to null or undefined if none is provided.
// console.assert(ex === undefined);
// OK, so that's wrong. 'this' will evaluate to the object 'tricky', because 'tricky' is the argumaent passed into the function.
console.assert(ex.id === 'tricky');


// Exercise 9

ex = Ctor();
// 'this' will evaluate to the global object, because it is not being referenced in the context of a specific object.
// console.assert(ex === global);
// Wrong again! 'this' evaluates to undefined, because nothing has been passed into the function.
// Never mind. Calling the ctor constructor function by itself doesn't return anything, so the value of 'this' can't be tested.


// Exercise 10

ex = Ctor.prototype.whatsThis();
// 'this' will evaluate to the prototype object of Ctor, which contains only the property whatsThis: whatsThis.
console.assert(ex.whatsThis === whatsThis);


// Exercise 11

var newObject = ex = new Ctor();
// 'this' will evaluate to the prototype object of Ctor, because a new instance of Ctor is being created.
console.assert(newObject.id === 'constructor');


// Exercise 12

ex = newObject.whatsThis();
// 'this' evaluates to the 'newObject' object, which only has the properties of the Ctor constructor function.
console.assert(ex.id === 'constructor');


// Exercise 13

ex = obj.whatsThis.call(tricky);
// 'this' will evaluate to the 'obj' object, because that's the context from which it's being referenced.
// console.assert(ex.id === 'object');
// Nope! 'this' evaluates to the object 'tricky', because 'tricky' is the argument being passed to the call function as thisArg.
console.assert(ex.id === 'tricky');


// Exercise 14

ex = whatsThis.bind(obj.inner).call(location);
// 'this' evaluates to the object 'location', because 'location' is the thisArg argument being passed to the call function.
// console.assert(ex.state === 'Alaska');
// Oh crap, that's not it. Since the inner object is passed into the whatsThis function, that becomes the context, so 'this' will evaluate to that obj.inner object.
console.assert(ex.id === 'inner-object');



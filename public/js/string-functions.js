
String.prototype.titleCase = function() { 
    return this.replace(/(\b(?=(^[a-z]+|(?!\s)([a-z]{4,})|[a-z]+$))[a-z])/g, str => str.toUpperCase()) 
};
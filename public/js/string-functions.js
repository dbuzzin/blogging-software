String.prototype.titleCase = function() { 
    return this.replace(/(\b(?=(^[a-z]+|(?!\s)([a-z]{4,})|[a-z]+$))[a-z])/g, str => str.toUpperCase());
};

Date.prototype.formatDate = function() {

    let d = new Intl.DateTimeFormat("default", {
        weekday: "long", 
        day: "numeric", 
        month: "long", 
        year: "numeric"
    }).format(this),
    
        t = new Intl.DateTimeFormat("default", {
        hour: "2-digit",
  		minute: "2-digit"
    }).format(this),

    newDate = d.replace(/(?<=\d+)[,]/, ""),
    newTime = t.replace(/(AM|PM)/, "");

    return `${newDate} at ${newTime}`;
};


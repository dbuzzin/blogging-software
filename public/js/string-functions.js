String.prototype.titleCase = function() { 
    return this.replace(/^\b\w|\b\w(?=\w{3,})|\b\w(?=\w+$)/g, function(match) {
        return match.toUpperCase();
       });
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

    newDate = d;
    // newDate = newDate.replace();
    newTime = t.replace(/(AM|PM)/, "");

    return `${newDate} at ${newTime}`;
};


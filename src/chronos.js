var Chronos = function(){
    this.units = {
            hours: {
                factor: 3600000000,
                label: 'h'
            },
            minutes: {
                factor: 60000,
                label: 'min',
                include: true
            },
            seconds: {
                factor: 1000,
                label: 's',
                include: true
            }
        };
};

Chronos.prototype.init = function(options){
    this.initDate = new Date(),
    this.label = options.label || 'Chronos new instance';
    this.units.hours.include = options.showHours || false;

    console.log(this.label + ' initialized');
};

Chronos.prototype.calculateCheckpoint = function(diff){
    var t = {};

    for(var key in this.units){
        if(this.units[key].include){
            var coefficient = Math.floor(diff/this.units[key].factor)
            t[key] = coefficient;
            diff -= coefficient*this.units[key].factor;
        }
    };

    t.milliseconds = diff;

    return t;
}

Chronos.prototype.checkpoint = function(){
    var now = new Date(),
        diff = now.getTime() - this.initDate.getTime(),
        msg = this.label + ' checkpoint: +',
        t;

    t = this.calculateCheckpoint(diff);

    for(var key in this.units){
        if(this.units[key].include){
            msg += t[key] + this.units[key].label + ' ';
        }
    };

    msg += t.milliseconds + 'ms';

    console.log(msg);
}


// test
var timer = new Chronos();
timer.init({ label: 'timer' });
timer.checkpoint();
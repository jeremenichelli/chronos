(function(root){
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

    Chronos.prototype.init = function(opt){
        var options = opt || {};
        this.initDate = new Date(),
        this.label = options.label || 'Chronos new instance';
        this.units.hours.include = options.showHours || false;

        console.log(this.label + ' initialized');
    };

    Chronos.prototype._calculateCheckpoint = function(diff){
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

    Chronos.prototype.checkpoint = function(checkpointLabel){
        var now = new Date(),
            diff = now.getTime() - this.initDate.getTime(),
            checkpointLabel = checkpointLabel || 'checkpoint',
            msg = this.label + ' ' + checkpointLabel + ': ',
            t;

        t = this._calculateCheckpoint(diff);

        for(var key in this.units){
            if(this.units[key].include){
                msg += t[key] + this.units[key].label + ' ';
            }
        };

        msg += t.milliseconds + 'ms';

        console.log(msg);
    };
    
    root.Chronos = Chronos;

})(this, undefined);


// test
var timer = new Chronos();
timer.init({ label: 'timer', showHours: true });
timer.checkpoint('quick check');

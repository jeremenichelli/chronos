(function(root){
    'use strict';

    var Chronos = function(){};

    Chronos.prototype.units = {
        hours: {
            factor: 3600000000,
            label: 'h'
        },
        minutes: {
            factor: 60000,
            label: 'min'
        },
        seconds: {
            factor: 1000,
            label: 's',
            include: true
        },
        milliseconds: {
            factor: 1,
            label: 'ms',
            include: true
        }
    };

    Chronos.prototype.init = function(opt){
        var options = opt || {};
        // set initial properties
        this.initDate = new Date();
        this.label = options.label || 'Chronos new instance';
        this.units.hours.include = options.showHours || false;
        this.units.minutes.include = options.showMinutes || false;
        this.checkpoints = [];

        // sets initial time as first checkpoint
        this.checkpoints[0] = {
            label: 'initialized',
            time: {
                date: this.initDate,
                obj: this._timeToObject(this.initDate)
            },
            lapse: this._timeToObject(this.initDate)
        };

        // print init message
        console.info(this._print());
    };

    Chronos.prototype._timeToObject = function(date){
        return {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            milliseconds: date.getMilliseconds()
        };
    };

    Chronos.prototype._objectToString = function(obj){
        var str = '';

        for(var key in obj){
            if(this.units[key].include){
                str += obj[key] + this.units[key].label;
                if (key !== 'milliseconds'){
                    str += ' ';
                }
            }
        }

        return str;
    };

    Chronos.prototype._calculateDiff = function(diff){
        var t = {};

        for(var key in this.units){
            if(this.units[key].include){
                var coefficient = Math.floor(diff/this.units[key].factor);
                t[key] = coefficient;
                diff -= coefficient*this.units[key].factor;
            }
        }

        return t;
    };

    Chronos.prototype._print = function(checkpoint){
        var instance = this,
            data = checkpoint || instance.checkpoints[instance.checkpoints.length - 1],
            mainLabel = instance.label,
            label = data.label,
            lapseObj = data.lapse,
            intvObj = data.interval,
            timeMessage;

        if(intvObj){
            timeMessage = ' // lapse: ' + instance._objectToString(lapseObj) + 
                ' // interval: ' + instance._objectToString(intvObj);
        } else {
            timeMessage = '';
        }

        return mainLabel + ' ' +
            label +
            timeMessage;
    };

    Chronos.prototype.checkpoint = function(label){
        var now = new Date(),
            diff = now.getTime() - this.initDate.getTime(),
            checkpointLabel = label || 'checkpoint',
            prevCheckpoint = this.checkpoints[this.checkpoints.length - 1],
            t,
            intv;

        t = this._calculateDiff(diff);
        intv = this._calculateDiff(now.getTime() - prevCheckpoint.time.date.getTime());

        this.checkpoints.push({
            label: checkpointLabel,
            time: {
                date: now,
                obj: this._timeToObject(now)
            },
            lapse: t,
            interval: intv
        });

        // print last checkpoint
        console.log(this._print());
    };

    Chronos.prototype.report = function(reportLabel){
        var checkpoints = this.checkpoints,
            reportHeader = '',
            reportMessage = '';

        if(reportLabel){
            reportHeader = this.label + ' ' + reportLabel + ' report:';
        } else {
            reportHeader = this.label + ' report:';
        }

        reportMessage = reportHeader + '\n';

        for(var i = 1, len = checkpoints.length; i < len; i++){
            reportMessage += ' - ' + this._print(checkpoints[i]) + '\n';
        }

        // print report
        console.info(reportMessage);
    };
    
    root.Chronos = Chronos;

})(this, undefined);

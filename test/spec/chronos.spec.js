// chronos.js tests
describe('Chronos', function(){
    describe('Constructor', function(){
        it('available in window global object', function(){
            expect(!!window.Chronos).toBe(true);
        });
    });
    describe('_calculateDiff', function(){
        var timer, t_one, t_two, t_three, t_four, t_five;
        timer = new Chronos();
        timer.init({ label: 'dummy timer', showHours: true, showMinutes: true });
        beforeEach(function(){
            t_one = new Date(2014, 5, 25, 23, 54, 20, 900);
            t_two = new Date(2014, 5, 25, 23, 54, 21, 100);
            t_three = new Date(2014, 5, 25, 23, 54, 25, 900);
            t_four = new Date(2014, 5, 25, 23, 56, 25, 900);
            t_five = new Date(2014, 5, 26, 0, 56, 25, 900);
        });
        it('calculate milliseconds only difference', function(){
            var obj = timer._calculateDiff(t_two.getTime() - t_one.getTime());
            expect(obj.hours === 0 &&
                obj.minutes === 0 &&
                obj.seconds === 0 &&
                obj.milliseconds == 200).toBe(true);
        });
        it('calculate seconds only difference', function(){
            var obj = timer._calculateDiff(t_three.getTime() - t_one.getTime());
            expect(obj.hours === 0 &&
                obj.minutes === 0 &&
                obj.seconds === 5 &&
                obj.milliseconds == 0).toBe(true);
        });
        it('calculate minutes only difference', function(){
            var obj = timer._calculateDiff(t_four.getTime() - t_three.getTime());
            expect(obj.hours === 0 &&
                obj.minutes === 2 &&
                obj.seconds === 0 &&
                obj.milliseconds == 0).toBe(true);
        });
        it('calculate hours only difference', function(){
            var obj = timer._calculateDiff(t_five.getTime() - t_four.getTime());
            expect(obj.hours === 1 &&
                obj.minutes === 0 &&
                obj.seconds === 0 &&
                obj.milliseconds == 0).toBe(true);
        });
        it('calculate with differences in all units', function(){
            var obj = timer._calculateDiff(t_five.getTime() - t_two.getTime());
            expect(obj.hours === 1 &&
                obj.minutes === 2 &&
                obj.seconds === 4 &&
                obj.milliseconds == 800).toBe(true);
        })
    });
    describe('_timeToObject', function(){
        var timer, t_one;
        timer = new Chronos();
        timer.init({ label: 'dummy timer', showHours: true, showMinutes: true });
        beforeEach(function(){
            t_one = new Date(2014, 5, 25, 23, 54, 20, 900);
        });
        it('converting Date object to Chronos time object', function(){
            var obj = timer._timeToObject(t_one);
            expect(obj.hours === 23 &&
                obj.minutes === 54 &&
                obj.seconds === 20 &&
                obj.milliseconds === 900).toBe(true);
        });
    });
    describe('_objectToString', function(){
        var timer_one, timer_two, timer_three, t_one;
            timer_one = new Chronos();
            timer_two = new Chronos();
            timer_three = new Chronos();
            timer_one.init({ label: 'dummy timer_one', showHours: true, showMinutes: true });
            timer_two.init({ label: 'dummy timer_two', showMinutes: true });
            timer_three.init({ label: 'dummy timer_three' });
        beforeEach(function(){
            t_one = {
                hours: 23,
                minutes: 54,
                seconds: 20,
                milliseconds: 900
            };
        });
        it('converting object to string with all units', function(){
            var str = timer_one._objectToString(t_one);
            expect(str === '23h 54min 20s 900ms').toBe(true);
        });
        it('converting object to string without hours', function(){
            var str = timer_two._objectToString(t_one);
            expect(str === '54min 20s 900ms').toBe(true);
        });
        it('converting object to string without hours and minutes', function(){
            var str = timer_three._objectToString(t_one);
            expect(str === '20s 900ms').toBe(true);
        });
    });
});
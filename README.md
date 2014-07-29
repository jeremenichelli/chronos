Chronos
=======

Script that lets you initialize timers to keep track of when your code is executed. It's good to have reports that indicate to you how much time has passed since your code or maybe a part of it started running.

You can create as much instances as you need just doing this:

```js
var timer = new Chronos();
```

When you want to start counting time call the `init` function like this:

```js
timer.init({ label: 'timer'});
```

You pass the name of the instance as a string in the init function so you can label them. That's really helpful if you have a lot of thins you want to track.

When you call this function a message will appear on your console saying *timer initialized* indicating that time started running for this instance.


Another options
---------------

Passing options to a **Chronos** instance, like **label** for example, is not an obligation but it's a good practice to be sure what you are measuring. It's weird to count execution time in minutes or hours, but if it is your case (I hope not) you can do this...

```js
timer.init({ 
    label: 'timer',
    showMinutes: true,
    showHours: true
});
```


Checkpoints
-----------

Everytime you want to know how much time has passed since you started counting just call this:

```js
timer.checkpoint('measuring something here');
```

If you want you can pass a label to that checkpoint to help you understand what's the reason you need it there, and you'll get a message saying *timer measuring something here // lapse: 1min 20s 974ms // interval: 0min 10s 389ms*. As you see, **Chronos** informs you how many time has passed between the timer has been initialized or _lapse_ and how many time has passed since the last checkpoint or _interval_.

_Of course on the first checkpoint lapse and time will be equal_


Reports
-------

Another feature that I just added is that you can ask for an entire report of checkpoints whenever you want, just call:

```js
timer.report('test');
```

And you'll get something like this in your console...

```
timer test report:
 - timer initialized
 - timer quick check // lapse: 0min 0s 3ms // interval: 0min 0s 3ms
 - timer testing one more label // lapse: 0min 0s 108ms // interval: 0min 0s 105ms
 - timer another label more // lapse: 0min 0s 508ms // interval: 0min 0s 400ms
 - timer last checkpoint // lapse: 4min 2s 581ms // interval: 4min 2s 73ms
```

I know I sound crazy but that's beautiful for me. Another pretty nice thing about **Chronos** is that it doesn't get in your code performance. **Chronos** _is not actually running_ on the background counting time, it just store date objects and do some pretty good maths to calculate how much time has passed. *That's beautiful too!*

I hope I can write a post about how this works pretty soon. In the meantime you can dig it, prove it and let me know if there's some feature I should be adding or something that could be better.

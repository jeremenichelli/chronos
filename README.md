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


Checkpoints
-----------

Everytime you want to know how much time has passed since you started counting just call this:

```js
timer.checkpoint('measuring something here');
```

If you want you can pass a label to that checkpoint to help you understand what's the reason you need it there, and you'll get a message saying *timer measuring something here: 1min 20s 974ms*.


Developing
----------

That's it for now, but stay tune because this is just a start.

If you find bugs or maybe just want to suggest something levae some comment here on the repository.
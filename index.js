var Timer = function(obj){
  this.time = obj.time;
  this.interval = obj.interval || 1000;
  this.onEnd = obj.onEnd || this.stop;
  this.onStart = obj.onStart || null;
  this.onTick = obj.onTick || null;
  this.intervalID = null;

  this.start = () => {
    this.intervalID = setInterval(this.update, this.interval);
  };
  this.stop = () => {
    clearInterval(this.intervalID);
  };
  this.update = () => {
    this.time > 0 ? this.time -= 1 : this.onEnd();
    this.onTick ? this.onTick() : void 0;
    return this.get();
  }
  this.get = () => {
    return this.time;
  }
}
var hour = new Timer({
  time: 1,
  onTick: () => {
    id('hour').innerText = hour.get()
  }
});

var min = new Timer({
  time: 60,
  onTick: () => {
    id('min').innerText = min.get()
  },
  onEnd: () => {
    hour.update();
    min.time = 60;
  }
});

var sec = new Timer({
  time: 60,
  interval: 1000,
  onTick: () => {
    id('sec').innerText = sec.get()
  },
  onEnd: () => {
    min.update();
    sec.stop();
    sec.time = 60;
    sec.start();
  }
});

id('start').addEventListener('click', sec.start);
id('stop').addEventListener('click', sec.stop);

requestAnimationFrame(hour.onTick)
requestAnimationFrame(min.onTick)
requestAnimationFrame(sec.onTick)

function id(id){
  return document.getElementById(id)
}
var Timer = function(obj){
  this.time = obj.startTime || 0;
  this.toTime = obj.toTime || 99;
  this.interval = obj.interval || 1000;
  this.onTick = obj.onTick || null;
  this.intervalID = null;

  this.start = () => {
    if (this.intervalID) return
    this.intervalID = setInterval(this.update, this.interval);
  };
  this.stop = () => {
    clearInterval(this.intervalID);
    this.intervalID = null;
  };
  this.update = () => {
    this.time < this.toTime ? this.time += 1 : this.onEnd();
    this.onTick ? this.onTick() : void 0;
    return this.get();
  };
  this.reset = () => {
    this.stop();
    this.time = obj.startTime || 0;
  };
  this.get = () => {
    var tt = '' + this.time;
    if (tt.length === 1) return '0' + tt;
    return tt;
  };

  this.onEnd = obj.onEnd || this.stop;
}

var hour = new Timer({
  onTick: () => {
    id('hour').innerText = hour.get()
  }
});

var min = new Timer({
  toTime: 59,
  onTick: () => {
    id('min').innerText = min.get()
  },
  onEnd: () => {
    hour.update();
    min.reset();
  }
});

var sec = new Timer({
  toTime: 59,
  interval: 1000,
  onTick: () => {
    id('sec').innerText = sec.get()
  },
  onEnd: () => {
    min.update();
    sec.reset();
  }
});
var ms = new Timer({
  toTime: 99,
  interval: 10,
  onTick: () => {
    id('ms').innerText = ms.get()
  },
  onEnd: () => {
    sec.update();
    ms.reset();
    ms.start();
  }
});

id('start').addEventListener('click', ms.start);
id('stop').addEventListener('click', ms.stop);

requestAnimationFrame(hour.onTick)
requestAnimationFrame(min.onTick)
requestAnimationFrame(sec.onTick)
requestAnimationFrame(ms.onTick)

function id(id){
  return document.getElementById(id)
}
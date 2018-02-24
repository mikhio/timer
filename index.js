var Timer = function(obj){
  this.time = obj.time;
  this.onEnd = obj.onEnd || null;
  this.onStart = obj.onStart || null;
  this.onTick = obj.onTick || null;
  this.intervalID = null;

  this.start = () => {
    this.intervalID = setInterval(this.update, 1000);
  };
  this.stop = () => {
    clearInterval(this.intervalID);
  };
  this.update = () => {
    this.time > 0 ? this.time -= 1 : this.stop();
    this.onTick ? this.onTick() : void 0;
    return this.get();
  }
  this.get = () => {
    return this.time;
  }
}

var timer1 = new Timer({
  time: 60,
  onTick: tick
});

id('start').addEventListener('click', timer1.start);
id('stop').addEventListener('click', timer1.stop);

requestAnimationFrame(tick);

function tick(){
  id('output').innerText = timer1.get();
}

function id(id){
  return document.getElementById(id);
}
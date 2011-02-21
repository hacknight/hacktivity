// hacker 'class'
var Hacker = function(id, room, options){
  this.id = id;
  this.room = room;
  // options
  if(!options) options = {};
  this.x = options.x || 50;
  this.y = options.y || 50;
  
  // attrs
  this.avatar = false;
  this.living = true;
  
  this.draw_avatar();
  this.wire_events();
}

Hacker.radius = 10;
Hacker.opacity = 0.5;

Hacker.prototype.draw_avatar = function(){
  var self = this;
  var av = self.avatar = self.room.circle(self.x, self.y, Hacker.radius);
  av.attr({fill: "#eee", "fill-opacity": 0, stroke: "#fff", "stroke-width": 2, "stroke-opacity": 0});
};

Hacker.prototype.wire_events = function(){
  var self = this;
  self.avatar.click(function(e){
    self.poke();
  });
};

Hacker.prototype.arrive = function(){
  console.log('> new hacker arriving! (' + this.id + ')');
  var self = this;
  var av = self.avatar;
  av.animate({"fill-opacity": Hacker.opacity, "stroke-opacity": Hacker.opacity}, 1500);
  self.live();
  return self.avatar;
};

Hacker.prototype.poke = function(){
  console.log('> poked hacker ' + this.id + ' ...');
  var self = this;
  var av = self.avatar;
  av.toFront();
  self.living = false;
  av.animate({r: 30, "fill-opacity": 1}, 300, function(){ av.animate({r: Hacker.radius, "fill-opacity": Hacker.opacity}, 1500, "backOut"); self.living = true;});
};

Hacker.prototype.live = function(){
  var self = this;
  setTimeout(function(){
    randx = Math.random()*4;
    randy = Math.random()*4;
    if (self.living){
      self.avatar.animate({cy: randy + self.y, cx: randx + self.x, easing: '<>'}, 1000);
    };
    self.live();
  }, 1000);
};
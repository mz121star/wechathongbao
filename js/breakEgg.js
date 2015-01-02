var breakEgg = {
  ctx: null,
  item: null,
  imageReady: false,
  start: false,
  end: false,
  x: 0,
  y: -240,
  y1: 240,
  width: 0,
  height: 0,
  frame: 0,
  alpha: 1,
  endFrame: 7,
  redrawTime: 1000 / 7,
  config: function( opts ){
    var self = this;

    self.egg = opts.egg;
    self.hammer = opts.hammer;
    self.imgSrc = opts.imgSrc;
    self.click = opts.click;
    self.x = opts.x && opts.x;

    return self;
  },
  init: function() {
    var self = this;
    var egg = document.getElementById( self.egg || "breakEgg");
    var c = document.getElementById( "hammer");
    var b = document.getElementById( self.hammer || "egg" );
    var line = document.getElementById( "line" );

    self.width = egg.width = egg.parentNode.clientWidth;
    self.height = egg.height = egg.parentNode.clientHeight;

    self.imageReady = false;
//  self.x = 0;

    self.ctx = egg.getContext("2d");
    self.ctx.clearRect( 0, 0, 636, 478 );

    self.img = document.createElement("img");
    self.img.src = self.imgSrc || "images/d.png";
    self.img.onload = self.loaded();

    b.onclick = function(){
      if( self.imageReady && self.end ) {

        var clickResult = self.click && self.click( self );

        if( clickResult === false ) return;
        c.className += " active";

        setTimeout(function(){
          c.className = "hammer";
          line.className += "active";

          setTimeout(function(){
           line.className = "";
             setTimeout(function(){
                self.start = true;
                self.update();
            }, 300);
          }, 100);
        }, 400);
      };
    }
  },
  loaded: function() {
    var self = breakEgg;
     if( ( /chrome/.test( window.navigator.userAgent.toLowerCase() ) || /version\/([\d.]+).*safari/.test( window.navigator.userAgent.toLowerCase() ) ) && ! self.img.complete )
    {
      setTimeout( self.loaded, 1 );
    }
    else{
      self.img.onload = null;
      self.update();
    }
  },
  redraw: function( opts ) {
    var self = this;
    self.ctx.clearRect( 0, 0, 1000, 1000 );

    var height = self.img.naturalHeight/2;  
     var width = self.img.naturalWidth/4;  
     var row = Math.floor(self.frame / 4);  
     // var col = self.frame == 8 ? 3 : self.frame - row * 4;
     var col = self.frame - row * 4;
     var offw = col * width;  
     // var offh = row * height <= 478 ? row * height : 478; 
     var offh = row * height;

     self.ctx.globalAlpha = self.alpha;

     self.ctx.drawImage(self.img, offw, offh, width, height, self.x, self.y, width, height);
     if( ! opts) self.frame++;
  },
  imgIn: function(){
    var self = breakEgg;
    self.y += self.y1 / 15;

    if( self.y >= 0 ) self.imageReady = true;

    self.ctx.clearRect( 0, 0, 1000, 1000 );
    self.redraw(1);
  },
  fade: function(){
    var self = breakEgg;
    self.alpha -= 1 / 15;
    // self.alpha -= 1;

    self.ctx.clearRect( 0, 0, 1000, 1000 );
     self.redraw(1);

    if( self.alpha <= 0 ) {
      self.end = false;
      self.y = -self.y1;
      self.frame = 0;
      self.alpha = 1;
    }
  },
  update: function() {
    var self = breakEgg;
    if ( self.frame < self.endFrame && self.start ) {
      self.redraw();
      setTimeout( self.update, self.redrawTime );
    }
    else if( ( self.frame == 0 || self.frame == self.endFrame ) && ! self.imageReady ){
      if( self.end ) {
        self.fade();
        setTimeout( self.update, 500/15 );
      }
      else
      {
        self.imgIn();
        setTimeout( self.update, 500/15 );
      }
    }
    else{
      self.start = false;
      self.end = true;
    }
  }
}
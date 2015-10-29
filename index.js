function createSlims(){
  var slimJesus = [];

  var curr, currHeight;
  for (var i=0; i < 10; i++) {
    curr = VR.image('assets/slim-jesus.png');
    currHeight = 2 + Math.random() * 2;
    curr.color = 'transparent';
    //curr._sound = curr.sound([]);
    curr.setScale(Math.random() + 1, currHeight, Math.random() + 1);
    curr.moveTo(6 * Math.cos(i / 10 * 2 * Math.PI), currHeight / 2, 8 * Math.sin(i / 10 * 2 * Math.PI));
    curr.rotateY(0);
    slimJesus.push(curr);
  }

  return slimJesus;
}

// do the shit
VR.panorama('assets/room.jpg');

var activeSound;
var slimJesus = createSlims();
var video = VR.video(['assets/sj.mp4'])
  .moveTo(0, -1, 0)
  .setScale(2)
  .rotateY(1)
  .rotateX(-2)
  .play();

VR.animate(function(delta, time){
  slimJesus.forEach(function(o, i){
    if (!o._origZ) {
      o._origZ = o.position.z;
      o._origY = o.position.y;
    }
    o.moveTo(o.position.x, o.position.y, Math.sin(time) + o._origZ);
    o.rotateY(Math.sin(time) / 20);
  });
});

VR.body.moveTo(0, 1, 0);

VR.on('lookat', function (target) {
  if (target._sound !== activeSound) {
    if (activeSound) {
      activeSound.volume(0, 2);
    }
    activeSound = target._sound;
    activeSound.volume(1);
    activeSound.start();
  }
});

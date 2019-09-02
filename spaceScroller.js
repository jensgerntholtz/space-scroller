console.log("spaceScroller.js");
var count = 20;

var path = new Path.Rectangle({
  size: [5, 30],
  fillColor: "white"
});

var symbol = new Symbol(path);
var max = 2;
var min = 1;

// Place the instances of the symbol:
for (var i = 0; i < count; i++) {
  // The center position is a random point in the view:
  var center = Point.random() * view.size;
  var placedSymbol = symbol.place(center);
  placedSymbol.scale((i / count) * (max - min) + min);
}

var detectionPath = new Path.Rectangle({
  point: view.center,
  size: [80, 100],
  // fillColor: 'white'
});

console.log("svg?", detectionPath);
var player = new Group([detectionPath]);
player.importSVG(
  "./src/cleanHornet.svg",
  {
    onLoad: function(item) {
      item.center = view.center;
      item.scale(0.1, 0.1);
      item.position = detectionPath.position;
      svgItem = item;
    }
  }
);
console.log("player", player);

var tempo = 10;

function onFrame(event) {
  for (var i = 0; i < count; i++) {
    var item = project.activeLayer.children[i];

    item.position.y += item.bounds.height / tempo;

    if (item.bounds.top > view.size.width) {
      item.position.y = -item.bounds.height;
    }

    if (detectionPath.intersects(item)) {
      var detectionPathDistance = detectionPath.position.getDistance(
        item.position
      );

      player.position.x +=
        detectionPathDistance / (detectionPath.position.x - item.position.x);
    }
  }
}

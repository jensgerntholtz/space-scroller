var count = 20;

var path = new Path.Rectangle({
  size: [5, 30],
  fillColor: 'black'
});

var symbol = new Symbol(path);
var max = 2;
var min = 1;

// Place the instances of the symbol:
for (var i = 0; i < count; i++) {
  // The center position is a random point in the view:
  var center = Point.random() * view.size;
  var placedSymbol = symbol.place(center);
  placedSymbol.scale((i / count * (max - min)) + min);
}

var player = new Path.Rectangle({
  point: view.center,
  size: [80, 100],
  fillColor: 'black'
});

var tempo = 10;

function onFrame(event) {
  for (var i = 0; i < count; i++) {
    var item = project.activeLayer.children[i];

    item.position.y += item.bounds.height / tempo;

    if (item.bounds.top > view.size.width) {
      item.position.y = -item.bounds.height;
    }

    if (player.intersects(item)) {
      var playerDistance = player.position.getDistance(item.position)

      player.position.x += playerDistance / (player.position.x - item.position.x);
    }

  }
}

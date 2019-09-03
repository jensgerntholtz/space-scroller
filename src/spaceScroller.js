import Paper from "paper";
Paper.install(window);

window.onload = () => {
  Paper.setup("myCanvas");
  console.log("spaceScroller.js");
  var count = 20;

  var trailPath = new Paper.Path.Rectangle({
    size: [5, 30],
    fillColor: {
      gradient: {
        stops: [new Paper.Color(1, 1, 1, 0), new Paper.Color(1, 1, 1)]
      },
      origin: [0, 0],
      destination: [0, 30]
    }
  });

  var boulderPath = new Paper.Shape.Circle(new Paper.Point(0, 0), 3);
  boulderPath.fillColor = new Paper.Color(1, 1, 1);

  var trail = new Paper.Symbol(trailPath);
  var boulder = new Paper.Symbol(boulderPath);

  // var asteroid = new Group([boulderPath,trailPath]);

  var max = 2;
  var min = 1;

  // Place the instances of the symbol:
  for (var i = 0; i < count; i++) {
    // The center position is a random point in the view:
    var center = Paper.Point.random() * Paper.view.size;

    console.log(Paper.view.size);

    var placedBoulder = boulder.place([0, 0]);
    var placedTrail = trail.place([0, -15]);
    var asteroidGroup = new Paper.Group([placedBoulder, placedTrail]);
    asteroidGroup.scale((i / count) * (max - min) + min);
    asteroidGroup.position = center;
    // console.log(placedBoulder.addChild(trailPath));
  }

  var detectionPath = new Paper.Path.Rectangle({
    point: Paper.view.center,
    size: [80, 100]
  });

  var player = new Paper.Group([detectionPath]);
  player.importSVG("./src/cleanHornet.svg", {
    onLoad: function(item) {
      item.center = Paper.view.center;
      item.scale(0.1, 0.1);
      item.position = detectionPath.position;
      Paper.svgItem = item;
    }
  });

  var tempo = 10;

  console.log(Paper.project.activeLayer.children);

  Paper.view.onFrame = (event) => {
    for (var i = 0; i < count; i++) {
      var item = Paper.project.activeLayer.children[i];


      item.position.y += item.bounds.height / tempo;

      if (item.bounds.top > Paper.view.size.width) {
        item.position.y = -item.bounds.height;
      }

      if (detectionPath.intersects(item)) {
        // console.log('HIT!!!');
        // view.pause();
        var detectionPathDistance = detectionPath.position.getDistance(
          item.position
        );

        player.position.x +=
          detectionPathDistance / (detectionPath.position.x - item.position.x);
      }
    }
  };
  Paper.view.draw();
};

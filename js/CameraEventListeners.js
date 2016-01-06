/*
define(['./Camera','./Viewer'], function (Camera,Viewer) {

    var exported = {};

    exported.cameraEvents = function() {

        var moveKeyActions = {
            37: [1, 0],
            38: [0, 1],
            39: [-1, 0],
            40: [0, -1]
        };

        var zoomKeyActions = {
            189: -1,
            187: 1
        };



        document.body.addEventListener('keydown', function (e) {  // event dla camery/obrazków

            var viewer = this.viewer;
            viewer = this;

            //debugger;

            if (e.keyCode in moveKeyActions) {
                Camera.move.apply(Camera, moveKeyActions[e.keyCode])
            }

            if (e.keyCode in zoomKeyActions) {
                Camera.zoom(zoomKeyActions[e.keyCode])
            }
console.log(Camera.scale);

            this.updateAllPositionables();

        });
    }

    return exported;

});*/

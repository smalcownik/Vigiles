/*wywolany w Viewer.showMapData*/

define(["./Patch","./CameraEventListeners"], function (Patch,CameraEventListeners) {

            var exported = {
                selected:null

            };

            window.edit = function(){

            };

            exported.build = function(data){

              if(window.location.hash.search('edit')==-1){  // w oknie adresu "#edit" wtedy sie aktywuje
                  return
              }

                this.viewer.positionable.forEach(function(p){
                    p.enableEditMode(this);
                },this);

                var that =this;

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

                document.body.removeEventListener('keydown', CameraEventListeners.keyEvents);
                document.body.addEventListener('keydown', function(e){

                    if(!e.altKey ){

                        CameraEventListeners.keyEvents(e);
                    }else{


                        e.preventDefault();

                        if(that.selected){


                            if (e.keyCode in moveKeyActions) {
                                that.selected.move.apply(that.selected,moveKeyActions[e.keyCode])
                            }

                            if (e.keyCode in zoomKeyActions) {
                                that.selected.zoom(zoomKeyActions[e.keyCode])
                            }


                            that.viewer.updateAllPositionables(); //

                        }

                    }

                });


            };


            return exported;
        }

);
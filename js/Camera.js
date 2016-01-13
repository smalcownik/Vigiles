define([], function () {

        var exported = {
            scale:1,
            scaleDelta:0.2,
            delta:{
                x:100,
                y:100
            },
            position:{
                x:0,
                y:0
            }


        };

        exported.move = function(dx,dy){

            this.position.x +=dx*this.delta.x/this.scale;
            this.position.y +=dy*this.delta.y/this.scale;

        }

        exported.zoom = function(zoom){

            this.scale *=Math.pow(1+this.scaleDelta,zoom);

        }

        return exported;

        }
    );
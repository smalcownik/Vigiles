define(["./Patch"], function (Patch) {

            var exported = {


            };


            exported.build = function(data){

                var viewer = this.viewer;

                data.traverse( //TODO: a to traverse to z kąd - z MapData?? w jaki sposób tu jest odniesienie do map data - ahaaaa data:MapData
                    function(image,parent){

                        viewer.positionable.push(new Patch(image,parent,data))

                    }
                );
            };


            return exported;
        }
    );
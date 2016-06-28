define(["./Patch"], function (Patch) {

            var exported = {


            };


            exported.build = function(data){ // data to new MapData(response//jsonString//)

                var viewer = this.viewer;

                //debugger;

                data.traverse(  // traverse z new MapData(response//jsonString),
                                // trawersowanie zawsze na początku ma argument jako image: MapData.images[0]


                    function(image,i,parent){

                        console.log(data);


                        viewer.positionable.push(new Patch(image,parent,data,i))

                    }
                );
            };


            return exported;
        }
    );
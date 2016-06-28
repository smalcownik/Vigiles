define(["./Patch"], function (Patch) {

            var exported = {


            };


            exported.build = function(data){ // data to new MapData(response//jsonString//) czyli objekt MapData, ale z data jest potrzebny tylko data.url przy budowaniu patcha,
                                            // wiec do innych potrzeb można w data dawać jakikolwiek "objekt", którego "objekt.url" zwraca url do folderu, w którym jest
                                            // plik img, czyli wystarczy jeśli data to będzie "http://52.30.81.203/" czyli ?requestheaders.host

                var viewer = this.viewer;

                //debugger;

                data.traverse(  // traverse z new MapData(response//jsonString),
                                // trawersowanie zawsze na początku ma argument jako image: MapData.images[0]


                    function(image,i,parent){

                        //console.log(data);


                        viewer.positionable.push(new Patch(image,parent,data,i))

                    }
                );
            };


            return exported;
        }
    );
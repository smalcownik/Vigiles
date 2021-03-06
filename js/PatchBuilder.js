/*wywolany w Viewer.showMapData*/

define(["./Patch"], function (Patch) {

            var exported = {


            };


            exported.build = function(data){ // data to new MapData(response//jsonString//) czyli objekt MapData, ale z data jest potrzebny tylko data.url przy budowaniu patcha,
                                            // wiec do innych potrzeb można w data dawać jakikolwiek "objekt", którego "objekt.url" zwraca url do folderu, w którym jest
                                            // plik img, czyli wystarczy jeśli data to będzie "http://52.30.81.203/" czyli ?requestheaders.host

                var viewer = this.viewer;

                //console.log(data); // pokazuje caly MapData czyli objekt (juz gotowy, jakby po wykonaniu ponizszej funkcji data.traverse)

                data.traverse(  // traverse z new MapData(response//jsonString),
                              // trawersowanie zawsze na początku ma argument jako image: MapData.images[0]


                    function(image,i,parent){

                        //console.log(image); // object IMG, z np. "image.id" - (nr wlasny z pliku json)
                        //console.log(i); // nr odpowiadajacy ilosci patchow - matek, w tej wersji 0,1,2
                        
                        //debugger; // wazny debuger - wylapuje jak poszczegolne patche dostaja url'a (w klasie Patch) i wtedy sa automatycznie
                        // pobierane request-get z servera node
                        
                        viewer.positionable.push(new Patch(image,parent,data,i))

                    }
                    
                );
                
            };

    exported.buildSinglePatch = function(image,parent,data,i){ // wywolany w ImageDataAdding

                viewer.positionable.push(new Patch(image,parent,data,i))

    };


            return exported;
        }

);
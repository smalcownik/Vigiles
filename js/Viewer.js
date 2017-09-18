define(["./MapDataProviderREQUEST","./PatchBuilder","./PatchEditor","./PointsBuilder","./Camera","./CameraEventListeners","./PointEventListeners",'./PointEventFunctions','./JsonBuilder','./ImageDataAdding','./UpdateJsonOnServerREQUEST', './AddDataForImageToServerREQUEST','./AddImageToServerREQUEST'], function (
        MapDataProviderREQUEST,PatchBuilder,PatchEditor,PointsBuilder,Camera,CameraEventListeners,PointEventListeners,PointEventFunctions,JsonBuilder,ImageDataAdding,UpdateJsonOnServerREQUEST,AddDataForImageToServerREQUEST,AddImageToServerREQUEST
    ) { //wyswietla strone i poczatkowe dane

        var exported = {
            positionable:[

            ],
            camera:Camera,
            

            // TODO: ZAWSZE tutaj zmieniać na p00.pl:4246 jak się jest poza domem

            //serverURL:'http://192.168.55.102:4246' , // W DOMU (sieć wewnętrzna z serwerem)
            serverURL:'' , // W DOMU (sieć wewnętrzna z serwerem)
            DataPath:"/Vigiles/data/test_arch",
            //DataPath:"/data/chemik_1",
            JsonFile:"/data.json"

            //serverURL:'http://p00.pl:4246'  // POZA DOMEM
        };


        exported.initializeViewer = function(){

            //exported.buildDOM();                // na razie nic tu nie ma - to ma być stworzenie interfejsu

            PatchBuilder.viewer = this;
            PatchEditor.viewer = this;
            PointsBuilder.viewer = this;
            CameraEventListeners.viewer = this; // TRZEBA TO WSTRZYKNĄĆ PRZED F_KCJĄ registerEventListeners(), bo inaczej ona nie widzi viewera



            //PointEventListeners.viewer = this;
            PointEventFunctions.viewer = this;
            JsonBuilder.viewer = this;
            ImageDataAdding.viewer =this;
            UpdateJsonOnServerREQUEST.viewer =this;
            AddDataForImageToServerREQUEST.viewer = this;
            AddImageToServerREQUEST.viewer = this;

            exported.registerEventListeners();  // reakcja na przyciski MUSIAŁEM NAJPIERW


        };

        exported.buildDOM = function(){
            // TU MA BYC INTERFEJS
        };

        exported.updateAllPositionables = function(){ // ta funckja zachodzi przy: 1. Viewer.showMapData (czyli budowanie widoku przez PatchBuilder)

                                                      // 2. po kazdym Viewer.registerEventListeners

            this.positionable.forEach(function(p){
                p.updateMyPosition(this.camera);
            },this);
        };



        exported.registerEventListeners = function(){

           /* var moveKeyActions = {
                37:[1,0],
                38:[0,1],
                39:[-1,0],
                40:[0,-1]
            };

            var zoomKeyActions = {
                189:-1,
                187: 1
            };

            var viewer = this;

            document.body.addEventListener('keydown',function(e) {  // event dla camery/obrazków

                if(e.keyCode in moveKeyActions){
                    viewer.camera.move.apply(viewer.camera,moveKeyActions[e.keyCode])
                }

                if(e.keyCode in zoomKeyActions){
                    viewer.camera.zoom(zoomKeyActions[e.keyCode])
                }

                viewer.updateAllPositionables();

            });*/

            CameraEventListeners.cameraEvents();
            PointEventListeners.addPoint();
            PointEventListeners.showPointContent();
            JsonBuilder.buildJSON(); // ponowne budowanie jsona z dodawanymi punktami i wysyłanie 
            ImageDataAdding.addNewPatch(); //umozliwia dodawanie zdjęć z zewnątrz
            

        };
//

        exported.loadURL = function(url, fileName){ // ta f-kcja jest odpalana na początku z app.js z argumentem ('Viewer.serverURL'+ Viewer.serverURL+Viewer.DataPath)

            {
                if (typeof(url) !== 'string') {
                    throw Error('invalid url');
                }

                /*if (url.match(/\.json/)) {
                    throw Error('invalid url');
                    // url powinine byc adresem katalogu w ktorym jest archiwum mapy
                }*/
                //debugger;
            } // tu mają byc testy poprawności url ale jeszcze nie ma nic


            MapDataProviderREQUEST.loadData(url+fileName,
                function(data){ // cb w MDP.loadData

                    exported.currentDataStringified = JSON.stringify(data); // UWAGA! użyte poźniej w klasie "ImageDataAdding.js" zeby miec zachowana oryginalna tresc aktualnego JSONA
                    exported.currentData = data; // jako data wchodzi new MapData(response) czyli cały obiekt z jSON'a
                    exported.currentData.url = url; // znajduje się potem w Patch w sciezce do zdjec (przez Viewer.ShowMapData)
                    console.log(url+fileName); // wyswietla http://192.168.55.102:4246 // po zmianie http://192.168.55.102:4246/data/test_arch/data1.json
                    exported.showMapData(exported.currentData); // w tej f-kcji będzie dopiero wołany PatchBuilder czyli cały widok, a currentData to obiekt new MapData(response)
                }
            );


        };

        exported.showMapData = function(data){ // jako data wchodzi new MapData(response) czyli cały obiekt z jSON'a

            //console.log(data);

            PatchBuilder.build(data); //// jako data wchodzi new MapData(response) czyli cały obiekt z jSON'a;  PatchBuilder traversuje całego JSON'a;
            PatchEditor.build(data); //// jako data wchodzi new MapData(response) czyli cały obiekt z jSON'a;  PatchBuilder traversuje całego JSON'a;
            // ma też poprzez data.url dostęp do plików serwera

            PointsBuilder.build(data);


            this.updateAllPositionables();

           // console.log(exported.positionable);



        };


            return exported;
        }
    );
define(["./MapDataProvider","./PatchBuilder","./PointsBuilder","./Camera","./CameraEventListeners","./PointEventListeners",'./PointEventFunctions'/*,'./JsonBuilder'*/], function (
        MapDataProvider,PatchBuilder,PointsBuilder,Camera,CameraEventListeners,PointEventListeners,PointEventFunctions/*,JsonBuilder*/
    ) { //wyswietla strone i poczatkowe dane

        var exported = {
            positionable:[

            ],
            camera:Camera
        };


        exported.initializeViewer = function(){

            //exported.buildDOM();                // na razie nic tu nie ma - to ma być stworzenie interfejsu

            PatchBuilder.viewer = this;
            PointsBuilder.viewer = this;
            CameraEventListeners.viewer = this; // TRZEBA TO WSTRZYKNĄĆ PRZED F_KCJĄ registerEventListeners(), bo inaczej ona nie widzi viewera
            //PointEventListeners.viewer = this;
            PointEventFunctions.viewer = this;
            /*JsonBuilder.viewer = this;*/

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





        };


        exported.loadURL = function(url){ // ta fkcja jest odpalmana na początku z app.js z argumentem ('data/arch1')

            {
                if (typeof(url) !== 'string') {
                    throw Error('invalid url');
                }

                if (url.match(/\.json/)) {
                    throw Error('invalid url');
                    // url powinine byc adresem katalogu w ktorym jest archiwum mapy
                }
                //debugger;
            }

            MapDataProvider.loadData(url,
                function(data){ // cb w MDP.loadData
                    exported.currentData = data; // jako data wchodzi new MapData(response) czyli cały obiekt z jSON'a
                    exported.currentData.url = url;
                    exported.showMapData(exported.currentData); // w tej f-kcji będzie dopiero wołany PatchBuilder czyli cały widok, a currentData to obiekt new MapData(response)
                }
            );


        };

        exported.showMapData = function(data){ // jako data wchodzi new MapData(response) czyli cały obiekt z jSON'a

            //debugger;

            PatchBuilder.build(data); //// jako data wchodzi new MapData(response) czyli cały obiekt z jSON'a;  PatchBuilder traversuje całego JSON'a

            PointsBuilder.build(data);

            this.updateAllPositionables();




        };


            return exported;
        }
    );
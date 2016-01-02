define(["./MapDataProvider","./PatchBuilder","./PointsBuilder","./Camera"], function (
        MapDataProvider,PatchBuilder,PointsBuilder,Camera
    ) { //wyswietla strone i poczatkowe dane

        var exported = {
            positionable:[

            ],
            camera:Camera
        };


        exported.initializeViewer = function(){
            exported.buildDOM();
            exported.registerEventListeners();

            PatchBuilder.viewer = this;

        };

        exported.buildDOM = function(){
            //TODO: stworzyc prosty interfejs
        };

        exported.updateAllPositionables = function(){

            this.positionable.forEach(function(p){
                p.updateMyPosition(this.camera);
            },this);
        };

        exported.registerEventListeners = function(){


            var moveKeyActions = {
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

                document.body.addEventListener('keydown',function(e) {

                    if(e.keyCode in moveKeyActions){
                        viewer.camera.move.apply(viewer.camera,moveKeyActions[e.keyCode])
                    }

                    if(e.keyCode in zoomKeyActions){
                        viewer.camera.zoom(zoomKeyActions[e.keyCode])
                    }

                    viewer.updateAllPositionables();

                });



        };

        exported.loadURL = function(url,afterLoad){

            //TODO: dopisać analogiczne testy argumentów w innych funkcjach
            if(typeof(url)!=='string'){
                throw Error('invalid url');
            }

            if(url.match(/\.json/)){
                throw Error('invalid url');
                // url powinine byc adresem katalogu w ktorym jest archiwum mapy
            }
            //debugger;

            MapDataProvider.loadData(url,
                function(data){
                    exported.currentData = data;
                    exported.currentData.url = url;
                    exported.showMapData(exported.currentData); // w tej f-kcji będzie dopiero wołany PatchBuilder czyli cały widok
                }
            );
        };

        exported.showMapData = function(data){ // tutaj jest określone, że data to dane, które wchodzą do PatchBuidera ( a to jest exported.currentData,  to prowadzi do MapDataProvider ->
        //gdzie argumentem drugiego argumentu jest new MapData(response) - czyli objekt- no właśnie jaki??? )

            //debugger;

            PatchBuilder.build(data);

            this.updateAllPositionables();




           // PointsBuilder.build(data);
        };
        //exported.showMapData = function(){};


            return exported;
        }
    );
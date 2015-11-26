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

            PatchBuilder.viewer = this;

            //console.log(PatchBuilder); - to wyświetla
        };

        exported.buildDOM = function(){
            //TODO: stworzyc prosty interfejs
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
                    exported.showMapData(exported.currentData);
                }
            );
        };

        exported.showMapData = function(data){

            //debugger;

            PatchBuilder.build(data);

            PatchBuilder.images.forEach(function(img){
                exported.positionable.push(img);
                //console.log(img); // wyświtla imgsy -
            });

            PointsBuilder.build(data);
        };
        //exported.showMapData = function(){};


            return exported;
        }
    );
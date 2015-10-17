define(["./MapDataProvider","./PatchBuilder","./PointsBuilder"], function (
        MapDataProvider,PatchBuilder,PointsBuilder
    ) { //wyswietla strone i poczatkowe dane

        var exported = {

        };

        exported.initializeViewer = function(){
            exported.buildDOM();
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


            MapDataProvider.loadData(url,
                function(data){
                    exported.currentData = data;
                    exported.currentData.url = url;
                    exported.showMapData(exported.currentData);
                }
            );
        };

        exported.showMapData = function(data){
            PatchBuilder.build(data);
            PointsBuilder.build(data);
        };
        //exported.showMapData = function(){};


            return exported;
        }
    );
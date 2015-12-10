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
                    exported.currentData = data; //TODO: tu by trzeba aktualizować żeby zoom działał na pliki ?? lub w showMapData - żeby zmieniał positionable
                    exported.currentData.url = url;
                    exported.showMapData(exported.currentData); // tu będzie dopiero wołany PatchBuilder czyli cały widok (patzr 'to do' 2 linijki wyżej)
                }
            );
        };

        exported.showMapData = function(data){

            //debugger;

            PatchBuilder.build(data);

            PatchBuilder.images.forEach(function(img){
                exported.positionable.push(img); // tu do budowania positionable korzysta z patchBuidera.build - to może w ramach tej f-kcji by też mówił, czy i kto jest parent, bo to jest potrzebne do pozycjonowania
                console.log(exported.positionable); // wyświtla imgsy -
            });

            PointsBuilder.build(data);
        };
        //exported.showMapData = function(){};


            return exported;
        }
    );
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
                    exported.showMapData(exported.currentData); // w tej f-kcji będzie dopiero wołany PatchBuilder czyli cały widok
                }
            );
        };

        exported.showMapData = function(data){ // tutaj jest określone, że data to dane, które wchodzą do PatchBuidera ( a to jest exported.currentData,  to prowadzi do MapDataProvider ->
        //gdzie argumentem drugiego argumentu jest new MapData(response) - czyli objekt- no właśnie jaki??? )

            //debugger;

            PatchBuilder.build(data);

            PatchBuilder.images.forEach(function(img){
                exported.positionable.push(img); // tu do budowania positionable korzysta z patchBuidera.build - to może w ramach tej f-kcji by też mówił, czy i kto jest parent, bo to jest potrzebne do pozycjonowania

            }
            );

            //exported.positionable[0].absolutePos.x = 400;// - to działa na positionable i images - więc one są powiazane referencją
            // (czy nie stanowią dwóch osobnych obiektów, wystarczy zmienic jeden i drugi notuje zmiany), żeby przenieść jakiś obiekt bez referencji trzeba ?? no właśnie co trzeba ??
            console.log(exported.positionable);// wyświtla imgsy -
            console.log(PatchBuilder.images);
            console.log(PatchBuilder.images[0].dig);


            PointsBuilder.build(data);
        };
        //exported.showMapData = function(){};


            return exported;
        }
    );
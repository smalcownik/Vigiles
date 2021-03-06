define(["./MapDataProviderREQUEST","./PatchBuilder","./PatchEditor","./PointsBuilder","./Camera","./CameraEventListeners","./PointEventListeners",'./PointEventFunctions','./JsonBuilder','./ImageDataAdding','./UpdateJsonOnServerREQUEST', './AddDataForImageToServerREQUEST','./AddImageToServerREQUEST'], function (
        MapDataProviderREQUEST,PatchBuilder,PatchEditor,PointsBuilder,Camera,CameraEventListeners,PointEventListeners,PointEventFunctions,JsonBuilder,ImageDataAdding,UpdateJsonOnServerREQUEST,AddDataForImageToServerREQUEST,AddImageToServerREQUEST
    ) { //wyswietla strone i poczatkowe dane

        var exported = {
            positionable:[

            ],
            camera:Camera,


            serverURL:'http://localhost:4246' , // W DOMU (sieć wewnętrzna z serwerem)
            //TODO: tylko info: pobiera dane z serverURL (moze robic requesta gdzie indziej) z pliku node na tym kompie, node ma sie odnosic do plikow z kompa
            // który bedzie pracowal na plikach, dolozyc zmienna z nazwa url serwera do pliku app.js, nastepnie w funkcji load url rozroznic zmienne serwer node do obrobki
            //DataPath:"/data/chemik_1",
            //  ZAWSZE tutaj zmieniać na p00.pl:4246 jak się jest poza domem
            //serverURL:'http://192.168.55.102:4246' , // W DOMU (sieć wewnętrzna z serwerem)
            //DataPath:"/Vigiles/data/test_arch",
            DataPath:"/data/test_arch",
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

        exported.buildDOM = function(){// TU MA BYC INTERFEJS
        };

        exported.updateAllPositionables = function(){ // ta funckja zachodzi przy: 1. Viewer.showMapData (czyli budowanie widoku przez PatchBuilder)
                                                      // 2. po kazdym Viewer.registerEventListeners
            this.positionable.forEach(function(p){
                p.updateMyPosition(this.camera);
            },this);
        };

        exported.findPatchById = function(IdNumber){
            // uprościć szukanie wg powyższych schematów
            //1* filtered
            //2* sprawdzić czy tablica ma dlugosc 1, jesli nie to jest blad
            //3* zwrocić wynik

            function imageIdPass(element){
            return (element.image.id == IdNumber.toString() && element.constructor.name == "Patch" )
            };

            var filteredPatch = this.positionable.filter(imageIdPass);

            if (filteredPatch.length == 1) {
                console.log(filteredPatch[0]);
                return filteredPatch[0];
            }else{
                console.log("dwa Patche z tym samym id: " + filteredPatch );
                return;
            }

        }; // zwraca patcha po nr id - analogicznie mozna znajdowac pointy lekko przerabiajac ta funkcje
    
        exported.registerEventListeners = function(){
            
            // TODO: z funkcjami poniżej zrobić porządek bo (jak w komentarzach przy nich) przy dowolnym kliknieciu odpala się kilka z nich - trzeba to uporządkowac zeby w zaleznosci
            // w co sie kliknie odpalala sie tylko jedna z funkcji : pozamieniać 'document.body' przy AddEventListener na poszczególne elementy body np. document.getElementbyID ...
            CameraEventListeners.cameraEvents();
            PointEventListeners.addPoint();// przy dblclick
            PointEventListeners.showPointContent(); // przy click
            JsonBuilder.buildJSON(); // przy click powoduje updateJson// ponowne budowanie jsona z dodawanymi punktami i wysyłanie
            ImageDataAdding.addNewPatch(); // przy click // umozliwia dodawanie zdjęć z zewnątrz
            

        };

        exported.loadURL = function(url, dataPath, fileName/*, fileName*/){ // ta f-kcja jest odpalana na początku z app.js z argumentem ('Viewer.serverURL'+ Viewer.serverURL+Viewer.DataPath)
                                //(Viewer.serverURL,Viewer.DataPath, Viewer.JsonFile)
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


            MapDataProviderREQUEST.loadData(url+dataPath+fileName,
                function(data){ // cb w MDP.loadData

                    exported.currentDataStringified = JSON.stringify(data); // UWAGA! użyte poźniej w klasie "ImageDataAdding.js" do fillNodeList, zeby miec zachowana oryginalna tresc aktualnego JSONA

                    exported.currentData = data; // jako data wchodzi new MapData(response) czyli cały OBIEKT z jSON'a,
                                        // wstosunku do  exported.currentDataStringified jest znaczaco rozbudowany, poniewaz jest to obiekt, który pozniej byl dobudowywany
                   // console.log(exported.currentData); pełny obiekt MapData - z Patchami itp
                    
                    exported.currentData.url = url + exported.DataPath; //sztucznie wstrzynieta droga do folderu zdjec(dla Patch) znajduje się potem w Patch w sciezce do zdjec (przez Viewer.ShowMapData)
                    //console.log(url/*+fileName*/); // wyswietla http://localhost:4246/data/test_arch/data.json
                    
                    exported.showMapData(exported.currentData); // w tej f-kcji będzie dopiero wołany PatchBuilder czyli cały widok, a currentData to obiekt new MapData(response)
                }
                
            );

        };

        exported.showMapData = function(data){ // jako data wchodzi new MapData(response) czyli cały OBIEKT z jSON'a
            
            PatchBuilder.build(data); //// jako data wchodzi new MapData(response) czyli cały OBIEKT jSON'a;  PatchBuilder traversuje całego JSON'a;
            
            PatchEditor.build(data); //// jako data wchodzi new MapData(response) czyli cały OBIEKT z jSON'a;  PatchBuilder traversuje całego JSON'a;
            // ma też poprzez data.url dostęp do plików serwera

            PointsBuilder.build(data);
            
            this.updateAllPositionables();

            //console.log(exported.positionable);
            //console.log(exported.positionable[0]);
            //console.log(exported.positionable[0].__proto__); // constructor
            //console.log(exported.positionable[0].__proto__.constructor.name); //"Patch"
            //console.log(exported.positionable[0].constructor.name); // "Patch"
            //console.log(exported.positionable[0].constructor); // to wyświetla całą treść funkcji Patch
            //if (exported.positionable[0].__proto__.constructor.name ===exported.positionable[0].constructor.name){console.log("to samo")}; // działa
        };
    

            return exported;
        }
    );
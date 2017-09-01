/**
 * Created by marek on 16.06.16.
 */

//TODO: 01.09-2017 zobaczyc ile z tego pliku mozna teraz obciac i zgrac z node

define(["./Camera","./AddImageToServerREQUEST","./AddDataForImageToServerREQUEST","./JsonBuilder"], function (Camera, AddImageToServerREQUEST, AddDataForImageToServerREQUEST,JsonBuilder) {

    var exported = {};

    exported.addNewPatch = function () {
        // f-kcja wywoływana w Viewer.registerEventListeners
        //var viewer = this.viewer;
        // console.log(viewer.positionable);

        this.saveNewPatchButton();

        //debugger;
        this.addNewPatchEventListener();

    };

    
    exported.saveNewPatchButton = function () {


            var saveNewPatchButton = document.createElement('div');
            // document.body.appendChild(saveJsonButton);

            this.DOM = saveNewPatchButton;
            saveNewPatchButton.classList.add("saveNewPatchButton"); // użyte później w index2.html


        saveNewPatchButton.style.top = Camera.position.x + 20 + 'px';
        saveNewPatchButton.style.right = Camera.position.y + 20 + 'px';

        saveNewPatchButton.style.position = 'absolute';

        saveNewPatchButton.style.zIndex = '1000';
        saveNewPatchButton.style.height = '70px';// to ręcznie dodałem do PointEventListener.countPointCoordinate żeby póxniej przy dodawaniu ładnie wyglądało
        saveNewPatchButton.style.width = '140px';// to ręcznie dodałem do PointEventListener.countPointCoordinate żeby póxniej przy dodawaniu ładnie wyglądało
        saveNewPatchButton.style.backgroundColor = '#000000';
        saveNewPatchButton.style.borderColor = '#ffffff';
            //divPoint.style.borderRadius = '50%';
            //divPoint.style.borderWidth = '3px';
        saveNewPatchButton.style.borderStyle = 'solid';
        saveNewPatchButton.style.textAlign = 'center';

            // var saveButtonParagraph = document.createElement('p');
            // debugger;
            var txt = "ADD PATCH";
        saveNewPatchButton.style.color = 'white';
        saveNewPatchButton.style.fontSize = '22px';
        saveNewPatchButton.style.textAlign = 'center';
        saveNewPatchButton.innerHTML = txt;

            document.body.appendChild(saveNewPatchButton);


    }; // dodaje przycisk i nadaje mu klasę, że jak wciśniesz to wywołujesz exported.addNewPatchEventListener


    //TODO: odtad dalej analizuj
    
    exported.addNewPatchEventListener = function () { // wciśnięciu przycisku (wyskakuje cały prompt)

        document.body.addEventListener('click', this.newPatchDataReceiverBuilder);
    };


    exported.dig = function(image,i, visitFunction, parent) {

        visitFunction(image,i,parent); // i to numer folderu imgs - czyli folder imgs[0],imgs[1]... maja "i" w swojej nazwie

        image.children.forEach(
            function (childrenImage) {

                exported.dig(childrenImage,i, visitFunction, image);
            });
    };

    exported.traverse = function(parentObject, visitFunction) { //to ma być cały objekt


        for (var i = 0; i < parentObject.images.length; i++) {
            exported.dig(parentObject.images[i],i, visitFunction, null);
        }
    };


    exported.fillNodeList = function(wholeObject){ // to bedzie visitFunction w exported.dig (wywolanej z traverse)

        exported.nodeList = []; // ma być tablica, ktora umozliwi znalezienie referencji do objektu Patch po ID
        
        function fill(image,originalParent,parent){ // originalParent odnosi sie do "i" a wiec do folderu imgs z numerem

            if(parent){

            exported.nodeList.push([image.id, image, originalParent, parent.id]);

            }

            else{

                exported.nodeList.push([image.id, image, originalParent]);
            }

        };

        this.traverse(wholeObject, fill);

    };

    //exported.nodeList = [];


    exported.getNodeById = function (idNumber){ // ma znalexc noda w nodeList na podstawie ID

        var idNumber = idNumber.toString(); // przekształca idNumber do formy stringa

        console.log(idNumber);

        var node;

        function findById(nodeListElement){ //nodeListElement to array: [image.id, image, originalParent, parent.id ?(jesli istnieje)]

            if( nodeListElement[0] === idNumber) // node list element odnosi sie do nodeList
                node = nodeListElement;
            //}

        };

        exported.nodeList.forEach(findById);

        console.log(node);

        return node;

    };


    exported.prepareNextId = function () {

        var occupiedIds = exported.nodeList.map(function (element) {
            return element[0]
        }).sort(function (a, b) {
            return a - b;
        });
        //console.log(occupiedIds);

        return Number(occupiedIds[occupiedIds.length - 1]) + 1;

    };


    exported.prepareInitialData = function(){ // tutaj ma byc opcja znalezienia objektu po Id i pobranie aktualnego JSONA

        exported.originalJSONparsed = JSON.parse(exported.viewer.currentDataStringified) ; // żeby zbudować całą listę NODE'ow używa pliku z Viewera:objekt MapData (JSOn - string)

        // console.log(exported.originalJSONparsed);
        //to dziala - obiekt!

        exported.fillNodeList(exported.originalJSONparsed); // z obec

        console.log(exported.nodeList);//[image.id, image, originalParent(numer folderu), parent.id] // parent.id nie wystepuje jezeli image jest na dnie mapy/stosu
                                        //originalParent nie odnosi się do numeru Patcha tylko do numeru folderu imgs
        // trzeba rozróżnić originalParent (folder) od zdjęcia, ktore jest na dnie stosu w danym folderze
        // nie bylo potem zadnych watpliwosci czy chdzi o folder czy o patch (np. patrz linie 280 i 303(5): wniosek: odnosi się do folderu!

        var nextId = exported.prepareNextId(); // jest kolejny wolny Id
        // czy może ta tabela tworzy się za kazdym razem od nowa wiec automatycznie kolejne będą dodawane

        console.log(nextId);
        return nextId;

    };//tutaj buduje listę już obecnych patchow zeby potem
    // 1.uzupelnic nodeList 2.przygotowac nextId



    exported.buildPath = function(newId,parentId,nextOriginalParent){ // parent id jest trzecim elementem wyniku f-kcji exported.getNodeById, czyli numer folderu imgs


        if (parentId === "newParent") { //wartosc "newParent" jest domyslnie dodawana w prompcie (w funckji newPatchDataReceiverBuilder)
                                        // jezeli nie określimy numeru parenta dla dodawanego patcha

                                        //trzeba sprawdzić, który originalParentIndex jest największy i zwiększyc tę wartość o 1




            var folderPath =('/data/test_arch/imgs/imgs['+nextOriginalParent+']');

            var path = [folderPath +'/'+ newId +'.jpg' , folderPath ];


            console.log(path);

            console.log("dodaje nowego parenta wiec trzeba dodac nowy folder na imgsy i sciezke do niego");

            return path;

        }

        else

        {

            var originalParentIndex = exported.getNodeById(parentId)[2]; //[image.id, image, originalParent, parent.id]
            console.log(originalParentIndex);
            var folderPath = ('/data/test_arch/imgs/imgs['+originalParentIndex+']');

            var path = [folderPath+'/'+ newId +'.jpg',folderPath];

            console.log(path);

            console.log("dodaje sciezke path nowego patcha, dla ktorego istnieje parent");

            return path;
        }


    };





    exported.executeAddingNewImage = function(newId,promptedData) { // tutaj maja byc czynnosci po prompcie


        var nextOriginalParent; // to jest numer koljenego folderu imgs[nr] a nie pliku w nim
        if (promptedData[2]==="newParent") { //wartosc "newParent" jest domyslnie dodawana w prompcie (w funckji newPatchDataReceiverBuilder)
            // jezeli nie określimy numeru parenta dla dodawanego patcha


            nextOriginalParent = exported.originalJSONparsed.images.length;// tu wskakuje liczba (nie string);
            // tu widac ze originalParent to numer folderu ims[nr] a nie numer pliku w tych folderach
        }

        else{
            nextOriginalParent = null;
        }

        var path = exported.buildPath(newId,promptedData[2],nextOriginalParent);// promptedData[2] to nr Id rodzica -!UWAGA nie Id tylko numer folderu imgs[nr]
                                                            //  promptedData: [ścieżka, dane jsona, parent.id] - parent.id !UWAGA - to numer folderu imgs[nr] a nie zdjecia



        var dataToServer = [path, promptedData, nextOriginalParent]; // dane na serwer

        console.log(dataToServer);

        var pathJSON = JSON.stringify(dataToServer);

        AddDataForImageToServerREQUEST.makeRequest(pathJSON); // przesyłanie danych do pliku - NAJPIERW DANE, POTEM ZDJĘCIE -->

        // ... i teraz zdjecie
        var sentPictureUrl = promptedData[0].toString();
        console.log(sentPictureUrl);

        AddImageToServerREQUEST.makeRequest(sentPictureUrl); // przesyłanie pliku, po zapisaniu pliku usuń dane z servera - bo to będą już śmieci


    };

    exported.newPatchDataReceiverBuilder = function() {

        var clickedElement = event.target;

        if (clickedElement.className === "saveNewPatchButton") {

            console.log("odpalono newPatchDataReceiverbuilder czyli..prompt");

            //debugger; (bo z prepare initial data zniknął viewer.currentDataStringified, ale się odnalazl)


            var newId = exported.prepareInitialData(); // tutaj przygotuje m.in. nowy ID oraz opcje znajdowania object po id


            var newImgPath = prompt("Podaj ścieżkę zdjęcia","/home/marek/WebstormProjects/Vigiles/data/add_new_patch_test_data/jol.jpg"); // sciezka do pliku na dysku - uri zdjęcia ??
            //home/marek/Downloads/jol.jpg


            console.log(newImgPath);

            var newImgDataParentId = prompt("PARENT_ID - jak nie podasz to doda nowy originalParent","0"); // ?? czy to jest numer nie patcha tylko folderu imgs -original parent ?

            //var newImgJsonData = prompt("Podaj dane do zdjęcia - JSONData");
            // to na razie puszczam z automatu f-kcją "setSampleJsonData" - te dane mają zostać podane z aplikacji

            if (newImgDataParentId === "") {


                newImgDataParentId = "newParent";
            }

            function setSampleJsonData(imageId) {
                return ({
                    "id": imageId,
                    "size": {"w": 500, "h": 900},
                    "pos": {"x": 0, "y": -0.5, "w": 0.6},
                    "points": [{"x": 0, "y": 0.5}],
                    "children": []
                });
            }

            var newImgJsonData = setSampleJsonData(newId.toString());

            console.log(newImgJsonData);

            var promptedData = [newImgPath, newImgJsonData, newImgDataParentId];// pD: [ścieżka, dane jsona, parent.id lub "newParent" ]


            promptedData.forEach(function (element, index) {
                    if (element === "") {

                        //element = 0; - to nie działa , na zewnątrz funkcji wartość element w proptedData pozostała niezmieniona
                        promptedData[index] = null;
                        //console.log(element);
                    }
                }
            );

            console.log(promptedData);

            exported.executeAddingNewImage(newId, promptedData);


        }

    }

    return exported;

});


// 4.odpalamy Viewer.loadURL


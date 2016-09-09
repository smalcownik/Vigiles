/**
 * Created by marek on 16.06.16.
 */

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


    exported.addNewPatchEventListener = function () { // co po wciśnięciu przycisku (wyskakuje cały prompt)

        document.body.addEventListener('click', this.newPatchDataReceiverBuilder);
    };


    exported.dig = function(image,i, visitFunction, parent) {

        visitFunction(image,i,parent);

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
        
        function fill(image,originalParent,parent){

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

            if( nodeListElement[0] === idNumber){
                node = nodeListElement;
            }

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

       //to dziala - objekt!

        exported.fillNodeList(exported.originalJSONparsed); // z obec

        console.log(exported.nodeList);//[image.id, image, originalParent, parent.id]

        var nextId = exported.prepareNextId(); // jest kolejny wolny Id
        // czy może ta tabela tworzy się za kazdym razem od nowa wiec automatycznie kolejne będą dodawane

        console.log(nextId);
        return nextId;

    };//tutaj buduje listę już obecnych patchow zeby potem
    // 1.uzupelnic nodeList 2.przygotowac nextId



    exported.buildPath = function(newId,parentId,nextOriginalParent){ // parent id jest trzecim elementem wyniku f-kcji exported.getNodeById
        

        if (parentId === "newParent") {
            //trzeba sprawdzić, który originalParentIndex jest największy i zwiększyc tę wartość o 1




            var path = '/data/test_arch/imgs/imgs['+nextOriginalParent+']/'+newId+'.jpg';

            console.log(path);

            console.log("skonczylem bez parenta wiec trzeba dodac nowy folder na imgsy");

            return path;

        }

        else

        {
            var originalParentIndex = exported.getNodeById(parentId)[2]; //[image.id, image, originalParent, parent.id]
            console.log(originalParentIndex);

            var path = '/data/test_arch/imgs/imgs['+originalParentIndex+']/'+newId+'.jpg';

            console.log(path);

            return path;
        }


    };





    exported.executeAddingNewImage = function(newId,promptedData) { // tutaj maja byc czynnosci po prompcie


        var nextOriginalParent;
        if (promptedData[2]==="newParent"){


            nextOriginalParent = exported.originalJSONparsed.images.length; // tu wskakuje liczba (nie string);

        }
        else{
            nextOriginalParent = null;
        }

        var path = exported.buildPath(newId,promptedData[2],nextOriginalParent);// promptedData[2] to nr Id rodzica
                                                            //  pD: [ścieżka, dane jsona, parent.id]



        var dataToServer = [path, promptedData, nextOriginalParent]; // dane na serwer

        console.log(dataToServer);

        var pathJSON = JSON.stringify(dataToServer);

        AddDataForImageToServerREQUEST.makeRequest(pathJSON); // przesyłanie danych do pliku - NAJPIERW DANE, POTEM ZDJĘCIE -->

        console.log(promptedData[0]);

        //AddImageToServerREQUEST.makeRequest(promptedData[0]); // przesyłanie pliku, po zapisaniu pliku usuń dane z servera - bo to będą już śmieci


    };

    exported.newPatchDataReceiverBuilder = function() {

        var clickedElement = event.target;

        if (clickedElement.className === "saveNewPatchButton") {

            console.log("odpalono newPatchDataReceiverbuilder czyli..prompt");


            var newId = exported.prepareInitialData(); // tutaj przygotuje m.in. nowy ID oraz opcje znajdowania object po id


            var newImgPath = prompt("Podaj ścieżkę zdjęcia"); // sciezka do pliku na dysku - uri zdjęcia ??
            // /home/marek/Downloads/jol.jpg

            var newImgDataParentId = prompt("PARENT_ID - jak nie podasz to doda nowy originalParent");

            //var newImgJsonData = prompt("Podaj dane do zdjęcia - JSONData");
            // to na razie puszczam z automatu f-kcją "setSampleJsonData"

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


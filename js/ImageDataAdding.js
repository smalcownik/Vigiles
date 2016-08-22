/**
 * Created by marek on 16.06.16.
 */

define(["./Camera","./AddImageToServer","./AddDataForImageToServer"], function (Camera,AddImageToServer,AddDataForImageToServer) {

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

        var stringNumber = idNumber.toString();

        console.log(stringNumber);
        var node;

        function findById(array){

            if( array[0] === stringNumber){
                node = array;
            }

        };
       // debugger;

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

        //console.log(exported.viewer.currentDataStringified); // currentData to obecny objekt MapData (JSOn - string)

        exported.originalJSONparsed = JSON.parse(exported.viewer.currentDataStringified) ;

       //console.log(exported.originalJSONparsed); // to dziala - objekt!

        exported.fillNodeList(exported.originalJSONparsed);

        console.log(exported.nodeList);

        nextId = exported.prepareNextId(); // jest kolejny wolny Id //TODO: pamietac że on musi być dodany do tabeli Id'sow (exp.nodeList) zeby mozna tworzyc kolejny Id
        // czy może ta tabela tworzy się za kazdym razem od nowa wiec automatycznie kolejne będą dodawane

        console.log(nextId);

    };




    exported.buildPath = function(newId,parentId){ // parent id jest trzecim elementem wyniku f-kcji exported.getNodeById


        if (parentId) {
            
            var originalParentIndex = exported.getNodeById(parentId)[2];
            console.log(originalParentIndex);
            
            var path = '/data/test_arch/imgs/imgs['+originalParentIndex+']/'+newId+'.jpg';
            
            console.log(path);
            
            return path;
            
        }
        else {
            //trzeba sprawdzić, który originalParentIndex jest największy i zwiększyc tę wartość o 1
            //TODO: jak nie ma to trzeba dodać nowy folder imgs[nowaWartoscIndex] i na serwerze też w tej sytuacji utworzyć nowy folder

            alert("skonczylem bez parenta wiec trzeba dodac nowy folder na imgsy")

        }



    };




    exported.executeAddingNewImage = function(promptedData) { // tutaj maja byc czynnosci po prompcie

        var path = exported.buildPath(nextId,promptedData[2]);// promptedData[2] to nr Id rodzica

        //exported.AddDataForImageToServer.makeRequest(path) - przesyłanie danych do pliku - NAJPIERW DANE, POTEM ZDJĘCIE
        //exported.AddImageToServer.makeRequest(promptedData[0]) - przesyłanie pliku, po zapisaniu pliku usuń dane z servera - bo to będą już śmieci

        //TODO: przygotować jakie dane mają pójść z funkcją powyżej (f-kcja w komentarzu, górna z dwóch), żeby potem były one informacją na temat zdjęcia
        
    };

    exported.newPatchDataReceiverBuilder = function(){

        var clickedElement = event.target;

        if (clickedElement.className !== "saveNewPatchButton") {
        } else {

            console.log("odpalono newPatchDataReceiverbuilder czyli..prompt");

            var nextId;
            
            exported.prepareInitialData(); // tutaj przygotuje m.in. nowy ID oraz opcje znajdowania object po id
            

            var newImgPath = prompt("Podaj ścieżkę zdjęcia"); // sciezka do pliku na dysku - uri zdjęcia ??
            var newImgData = prompt("Podaj dane do zdjęcia - JSONData");
            var newImgDataParentId = prompt("PARENT_ID - jak nie podasz to doda nowy originalParent");

            var promptedData = [newImgPath, newImgData, newImgDataParentId];

            //console.log(promptedData);

            promptedData.forEach(function (element,index) {
                    if (element === "") {

                        //element = 0; - to nie działa , na zewnątrz funkcji wartość element w proptedData pozostała niezmieniona
                        promptedData[index] = null;
                        //console.log(element);
                    }
                }
            );

            console.log(promptedData);
            // console.log(typeof promptedData[0]);console.log(typeof null);


            //TODO: ustalić formę JSON'a - jaki ma być dokładny schemat (musi być Id rodzica)

            var sampleDataJson = {
                "size": {"w": 512, "h": 384},
                //"id":"2",
                "pos": {"x": 0, "y": -0.5, "w": 0.8},

                "points": [{"x": 0, "y": 0}, {"x": 0.5, "y": 0.5}, {"x": 0, "y": 0.5}],

                "children": []

            };

            exported.executeAddingNewImage(promptedData);


        }


    };


    
    
    return exported;

});
//TODO: OTO mój zajebisty plan, wciąż aktualny!:

// I. jpg/img data

//budujemy ściezke na nowy plik img (f-kcja "buildPath") //ok

// 1. no i dodać obrazek - musi się wysłać node/POST i dopisać // TU JESTEM !

//TODO: teraz pracować nad zgraniem pliku servera z f-kcją "execute adding new image" tak żeby serwer przyjął zdjęcie oraz ścieżkę do zdjęcia,
// i zapisał zdjęcie gdzie trzeba, jeśli zajdzie potrzeba - budując nowy folder, pozostałe dane do zdjęcia maja zostać



// I. JSON data

// 1. w międzyczasie ustalamy Id nowego img - żeby był unikatowy i nowy, proponuję  -//ok
// przy okazji zrobić listę i f-kcje ktora bedzie wykonywala ta czynnosc            //ok

// 2. znajdujemy rodzica po ID itd

// 3. dodajemy do jego children dodawany promptem objekt JSON ( podobna f-kcja budujaca objekt: JsonBuilder.cleanPatchBeforeAddingToObject)

// zarezerwowanych Id na bazie nodeList, i dodając img sprawdzić jaki jest największy i kolejna wolna liczba naturalna

// zeby wyslac jsona na serwer skorzystaj z f-kcji UpdateJsonOnServer.js tylko popatrz jak ten json ma wygladać
// (sprawdz czy maja podobna budowe)

// 4.odpalamy Viewer.loadURL


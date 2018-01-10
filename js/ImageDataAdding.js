/**
 * Created by marek on 16.06.16.
 */


define(["./Camera","./AddDataForImageToServerREQUEST", "./UpdateJsonOnServerREQUEST"], function (Camera, AddDataForImageToServerREQUEST, UpdateJsonOnServerREQUEST) {

    var exported = {};

    exported.addNewPatch = function () {
        // f-kcja wywoływana w Viewer.registerEventListeners //var viewer = this.viewer; // console.log(viewer.positionable);

        this.saveNewPatchButton();
        //this.formidableButton();
        //debugger;
        this.addNewPatchEventListener();

    };

    exported.saveNewPatchButton = function () {

        var saveNewPatchButton = document.createElement('div');
        // document.body.appendChild(saveJsonButton);

        //debugger;

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


    }; // dodaje przycisk i nadaje mu klasę, że jak wciśniesz to wywołujesz exported.addNewPatchEventListener (funkcja ponizej)

    exported.formidableButton = function () {

        var formidableButton = document.createElement('form');
        // document.body.appendChild(saveJsonButton);

        //debugger;

        this.DOM = formidableButton;
        formidableButton.classList.add("formidableButton"); // użyte później w index2.html


        formidableButton.style.top = Camera.position.x + 100 + 'px';
        formidableButton.style.right = Camera.position.y + 20 + 'px';

        formidableButton.style.position = 'absolute';

        formidableButton.style.zIndex = '1001';
        formidableButton.style.height = '30px';
        formidableButton.style.width = '140px';
        formidableButton.style.backgroundColor = '#000000';
        formidableButton.style.borderColor = '#ffffff';
        //divPoint.style.borderRadius = '50%';
        //divPoint.style.borderWidth = '3px';
        formidableButton.style.borderStyle = 'solid';
        formidableButton.style.textAlign = 'center';
        formidableButton.style.color = 'white';
        formidableButton.style.fontSize = '22px';
        formidableButton.style.textAlign = 'center';
        var txt = "FORM";
        formidableButton.innerHTML = txt;

        //formidableButton.target="_blank";
        //formidableButton.target=null;
        formidableButton.action = exported.viewer.serverURL+ "/image.jpg"; // to jest url requesta (a response z servera node jest HEad:204 wiec nie wyskakuje okno, ale robote robi)
        //formidableButton.target = exported.viewer.serverURL+ "/image.jpg";
        //formidableButton.action = "#";
        formidableButton.method = "post";
        formidableButton.enctype = "multipart/form-data";

        var input = document.createElement('input');
        this.DOM = input;
        input.type = "file";
        input.name = "upload";
        input.style.position = 'absolute';
        input.style.zIndex = '1002';
        input.style.top = Camera.position.x + 40 + 'px';
        input.style.right = Camera.position.y - 110 + 'px';
        input.multiple = "multiple";
        var input2 = document.createElement('input');
        this.DOM = input2;
        input2.classList.add("potwierdz");
        input2.style.position = 'absolute';
        input2.style.zIndex = '1003';
        input2.style.top = Camera.position.x + 70 + 'px';
        input2.style.right = Camera.position.y + 65 + 'px'; // w poziomie
        input2.type = "submit";
        input2.value = "Potwierdz";

        formidableButton.appendChild(input);
        formidableButton.appendChild(input2);
        document.body.appendChild(formidableButton);




    }; // dodaje przycisk i nadaje mu klasę, że jak wciśniesz to wywołujesz exported.addNewPatchEventListener (funkcja ponizej)

    exported.addNewPatchEventListener = function () { // wciśnięciu przycisku (wyskakuje cały prompt)

        document.body.addEventListener('click', this.newPatchDataReceiverBuilder);
    };
    
    {
     exported.dig = function(image,i, visitFunction, parent) {

        visitFunction(image,i,parent); // "i" to numer folderu imgs - czyli folder imgs[0],imgs[1]... maja "i" w swojej nazwie

        image.children.forEach(
            function (childrenImage) {

                exported.dig(childrenImage,i, visitFunction, image);
            });
    };

    exported.traverse = function(parentObject, visitFunction) { //to ma być cały objekt


        for (var i = 0; i < parentObject.images.length; i++) {
            exported.dig(parentObject.images[i],i, visitFunction, null); //na koncu jest null ale funkcja dig odwoluje sie sama do siebie i tam juz daje zmienną
        }
    };

    } // f-kcje dig i trwverse do trawersowania mapy imgs'ów

    exported.fillNodeList = function(wholeObject){ // to bedzie visitFunction w exported.dig (wywolanej z traverse)

        exported.nodeList = []; // ma być tablica, ktora umozliwi znalezienie referencji do objektu Patch po ID
        
        function fill(image,originalParentImgsNumber,parent){ // originalParentImgsNumber odnosi sie do "i" a wiec do folderu imgs z numerem

            if(parent){

            exported.nodeList.push([image.id, image, originalParentImgsNumber, parent.id]);

            }

            else{

                exported.nodeList.push([image.id, image, originalParentImgsNumber]);
            }

        };

        this.traverse(wholeObject, fill);

    }; // funckja uzupełnia listę nodów:  exp.nodeList = [image.id, image, originalParent, parent.id]
    // wykorzystuje cały obiekt mapy i używa funkcji traverse


    exported.getNodeById = function (idNumber){ // ma znalexc noda w nodeList na podstawie ID

        var idNumber = idNumber.toString(); // przekształca idNumber do formy stringa

        console.log("searched node number: "+ idNumber);

        var node;

        function findById(nodeListElement){ //nodeListElement to array: [image.id, image, originalParent, parent.id ?(jesli istnieje)]

            if( nodeListElement[0] === idNumber) // node list element odnosi sie do nodeList
                node = nodeListElement; // czyli node to cały element tablicy nodeList czyli jest on taka tabela: [image.id, image, originalParent, parent.id]
            //}

        };

        exported.nodeList.forEach(findById);

        console.log(node);

        return node; // node to cała tablica [image.id, image, originalParent, parent.id]

    }; // funkcja zwraca (z listy nodeList) node'a o wybranym numerze id


    exported.prepareNextId = function () {

        var occupiedIds = exported.nodeList.map(function (element) {
            return element[0]
        }).sort(function (a, b) {
            return a - b;
        });
        //console.log(occupiedIds);

        return Number(occupiedIds[occupiedIds.length - 1]) + 1;

    }; // funkcja zwraca kolejny niezajęty numer Id


    exported.prepareInitialData = function(){ //  pobranie aktualnego JSONA

        exported.originalJSONparsed = JSON.parse(exported.viewer.currentDataStringified) ; // używa pliku z Viewera:objekt MapData (JSOn - string)
        // console.log(exported.originalJSONparsed);//to dziala - obiekt!

        exported.fillNodeList(exported.originalJSONparsed);

        console.log(exported.nodeList);//[image.id, image, originalParent(numer folderu), parent.id] // parent.id nie wystepuje jezeli image jest na dnie mapy/stosu
                                        //originalParent nie odnosi się do numeru Patcha tylko do numeru folderu imgs
        // trzeba rozróżnić originalParent (folder) od zdjęcia, ktore jest na dnie stosu w danym folderze
        //czy chdzi o folder czy o patch (np. patrz linie .......: wniosek: odnosi się do folderu!

        var nextId = exported.prepareNextId(); // jest kolejny wolny Id
        // czy może ta tabela tworzy się za kazdym razem od nowa wiec automatycznie kolejne będą dodawane

        console.log(nextId);
        return nextId;

    };// 1.uzupelnia exported.nodeList 2.zwraca nextId

    
    exported.buildPath = function(newId,parentImgsNumber,nextOriginalParent,parentId){ // parent id jest trzecim elementem wyniku f-kcji exported.getNodeById, czyli numer folderu imgs


        if (parentImgsNumber === "newParent") { //wartosc "newParent" jest domyslnie dodawana w prompcie (w funckji newPatchDataReceiverBuilder)
                                        // jezeli nie określimy numeru parenta dla dodawanego patcha
                                        //tedy trza sprawdzić, który originalParentIndex jest największy i zwiększyc tę wartość o 1


            var folderPath =(exported.viewer.DataPath +"/imgs/imgs[" + nextOriginalParent + ']');

            var path = [folderPath +'/'+ newId +'.jpg' , folderPath ];

            console.log(path);
            console.log("dodaje nowego parenta wiec trzeba dodac nowy folder na imgsy i sciezke do niego");

            return path;

        } // zwraca ścieżkę do nowego parenta (czyli nowy folder i ścieżka do pliku - jest to pierwszy plik w tym parencie

        else

        {

            var originalParentIndex = exported.getNodeById(parentId)[2]; // originalParent bo getNodeyId zwraca cały node:[image.id, image, originalParent, parent.id]

            console.log(originalParentIndex);

            var folderPath = (exported.viewer.DataPath +"/imgs/imgs[" +originalParentIndex+']');

            var path = [folderPath+'/'+ newId +'.jpg',folderPath];

            console.log(path);

            console.log("dodaje sciezke path nowego patcha, dla ktorego istnieje parent");

            return path;
        }


    }; // zwraca tablice z ścieżką do zapisania [file path, folder path]


    exported.executeAddingNewImage = function(newId,promptedData) { // tutaj maja byc czynnosci po prompcie // wywołane na końcu exp.newPatchDataReceiverBuilder

        var nextOriginalParent; // to jest numer koljenego folderu imgs[nr] a nie pliku w nim
        if (promptedData[2]==="newParent") { //wartosc "newParent" jest domyslnie dodawana w prompcie (w funckji newPatchDataReceiverBuilder)
            // jezeli nie określimy numeru parenta dla dodawanego patcha

            nextOriginalParent = exported.originalJSONparsed.images.length;// tu wskakuje liczba (nie string);
            // tu widac ze originalParent to numer folderu ims[nr] a nie numer pliku w tych folderach
        }

        else{
            nextOriginalParent = null;
        }

        console.log("test przy budowaniu path, promptedData[2]: "+ promptedData[2]);

        var path = exported.buildPath(newId,promptedData[2],nextOriginalParent,promptedData[3]);// promptedData[2] to nr folderu ims["nr"] rodzica -!UWAGA nie Id tylko numer folderu imgs[nr]
                                                            //  promptedData: [ścieżka, dane jsona, parentImgsNumber,parentId] UWAGA - parent imgs number to numer folderu imgs[nr] a nie zdjecia

        var dataToServer = [path, promptedData, nextOriginalParent]; // dane na serwer

        console.log(dataToServer);

        var dataToServerJSON = JSON.stringify(dataToServer);

        console.log("wysylam dane do zdjecia na serwer!");

        AddDataForImageToServerREQUEST.makeRequest(dataToServerJSON); // tu wysyla dane do patcha na serwer

        //TODO: nie pilne: opcjonalnie,tutaj dorzucić nowego jsona zamiast UpdateJsonOnServerREQUEST:


        //to sa wszystkie dane potrzebne do zapisania zdjęcia
        
        //tu już nie ma requesta - tym się zajmuje formidable z osobnego requesta (z przegladarki wgranie zdjecia - patrz niżej )

    }; // dane z prompta - wysyla dane do zdjecia na serwer (samo zdjecie wysyla pozniej: w exported.newPatchDataReceiverBuilder)

    exported.newPatchDataReceiverBuilder = function() {

        var clickedElement = event.target;

        if (clickedElement.className === "saveNewPatchButton") {

            console.log("odpalono newPatchDataReceiverbuilder czyli..prompt");


            exported.newId = null;

            exported.newId = exported.prepareInitialData(); // tutaj przygotuje m.in. nowy ID oraz opcje znajdowania object po id

            console.log("1. new id przy prompcie: "+exported.newId);

            exported.formidableButton(); //pojawia się przycisk formidable //TODO: formidable button tutaj
            //wybór zdjęcia - teraz tym zajmie się formidable:
            
            //var oldImgPath = prompt("Podaj ścieżkę zdjęcia","/home/marek/WebstormProjects/Vigiles/data/add_new_patch_test_data/jol.jpg"); // sciezka do pliku na dysku - uri zdjęcia ??
            //home/marek/Downloads/jol.jpg
            //artefakt: wystarczy sciezka docelowa do zapisu na serwer, a nie pierwotna lokalizacja pliku pobieranego
            //zatem:
            var oldImgPath = null;


            var newImgParentImgsNumber = prompt("PARENT_NR - jak nie podasz to doda nowy originalParent, wpisujac puste pole doda nowego parenta","0"); // ?? czy to jest numer nie patcha tylko folderu imgs -original parent ?

            if (newImgParentImgsNumber === "") {
                newImgParentImgsNumber = "newParent";
            }


            exported.newDataParentIdNumber = null;
            exported.newDataParentIdNumber = prompt("PARENT_Id - jak nie podasz to da 2","2"); // ?? to nie numer folderu tylko "ID" a wiec konkretnego zdjecia w folderze

            //var newImgJsonData = prompt("Podaj dane do zdjęcia - JSONData");  // dane lokalizacji zdjęcia - teraz tym zajmie się formidable
            
            // to na razie puszczam z automatu f-kcją "setSampleJsonData" - te dane mają zostać podane z aplikacji lub zdjęcie może być osadzane ręcznie przez tryb #edit
            exported.setSampleJsonData = function(imageId) {
                return ({
                    "id": imageId,
                    "size": {"w": 300, "h": 500},
                    "pos": {"x": 0, "y": -0.5, "w": 0.6},
                    "points": [{"x": 0, "y": 0.5}],
                    "children": []
                });
            };

            var newImgJsonData = exported.setSampleJsonData(exported.newId.toString()); // tutaj mozna dodać cudzysłowy ("\"" + exported.newId.toString()+ "\"") - tak ?
                                                                                        // w razie potrzeby, zeby w json był z cudzysłowiem

            console.log(newImgJsonData);
            
            //TODO: pozniej kosmetyka : w linijce ponizej oldImgPath jest artefaktem - usunac go wraz z odwolaniami (uwaga to zmieni tez w pliku node)
            var promptedData = [oldImgPath, newImgJsonData, newImgParentImgsNumber,exported.newDataParentIdNumber];// pD: [ścieżka pliku na dysku nadawcy, dane jsona, parentImgsNumber lub "newParent", parentId]


            promptedData.forEach(function (element, index) {
                    if (element === "") {

                        //element = 0; - tak nie działa , na zewnątrz funkcji wartość element w proptedData pozostała niezmieniona
                        promptedData[index] = null; // w zwiazku z powyższym wprowadzono "index" i teraz działa
                        //console.log(element);
                    }
             }); // f-kcja czyszcząca promptedData, nadaje pustym elementom wartość "null", logicznie bez znaczenia dla programu
            
            console.log(promptedData);


            exported.executeAddingNewImage(exported.newId, promptedData);
        }

        else if (clickedElement.className === "potwierdz") { //czyli po kliknięciu "Potwierdź" - to jest drugi etap wysylania nowego zdjecia w saveNewPatchButton daje dane a tutaj wysyla jsona

            console.log("jestem w JsonBuider czas dodać Patcha do jSona");

            // 1. znaleźć obiekt :)
            console.log(exported.originalJSONparsed);// używa pliku z Viewera:objekt MapData (JSOn - string)


            //2. znaleźć w tym obiekcie parent na podstawie wyboru Id parenta (ImageDataAdding.fillNodeList - analogicznie tylko wyłapać parenta zamiasta budować coś)

            console.log("2. new id przy potwierdzeniu: "+ exported.newId);
            //zamiast fill dać {if object.id == "id",
            // return object}

            console.log("3. Parent id przy potwierdzeniu: "+ exported.newDataParentIdNumber);


            //3. do tego parenta dodać nowy szkielet (setSampleJsonData)

            exported.pushNewChildrenJsonDataToObject = function(wholeObject, idNumber, parentNumber){ // to bedzie visitFunction w exported.dig (wywolanej z traverse)

                function find(image) {

                    if (image.id == parentNumber) { // znajduje rodzica naszego parenta - rodzic jest podany w prompcie w exported.newDataParentIdNumber

                        image.children.push(exported.setSampleJsonData(idNumber)); // temu rodzicowi dodaje childrena (szkielet z nowym Id)

                        return;

                    }
                }

                this.traverse(wholeObject, find);

            }; // f-kcja dodaje nowy setSampleJsonData do objektu

            exported.pushNewChildrenJsonDataToObject(exported.originalJSONparsed,exported.newId,exported.newDataParentIdNumber);

            //4. sprawdzic czy w obieckie po zmianie jest nowy children

            console.log(exported.originalJSONparsed); // to zadzialalo - pokazuje w oiekcie nowy id :14

            //4.zrobić z tego obiektu  var exported.json = JSON.stringify(obiekt);

            exported.JsonWithNewPatch = JSON.stringify(exported.originalJSONparsed); // objScheme zbudowany w buildPatchesTree

            console.log(exported.JsonWithNewPatch);
            

            //5. UpdateJsonOnServerREQUEST.makeRequest(exported.json); // tym zakończyć, teraz trzeba przygotować paczkę danych do zdjęcia zeby przy jego wysłaniu
            // serwer miał dane

            UpdateJsonOnServerREQUEST.makeRequest(exported.JsonWithNewPatch);


            //
            // wysyłaną z jsonem paczke danych albo przerobic w nodzie, zeby odroznil ta operacje i zapisal ten plik jak trzeba bo potem sciaga zdjecie i mu w node brakuje tych danych

            // po tym odświeżyć ładnie:
            exported.viewer.loadURL(exported.viewer.serverURL,exported.viewer.DataPath, exported.viewer.JsonFile);

        }
    };

    return exported;

});


// 4.odpalamy Viewer.loadURL


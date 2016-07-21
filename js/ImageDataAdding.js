/**
 * Created by marek on 16.06.16.
 */

define(["./Camera"], function (Camera) {

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
        
        function fill(image,i,parent){

            if(parent){

            exported.nodeList.push([image.id, image, parent.id ]);

            }

            else{

                exported.nodeList.push([image.id, image ]);
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


    exported.newPatchDataReceiverBuilder = function(){
        
        var clickedElement = event.target;

        if (clickedElement.className === "saveNewPatchButton"){
            console.log("odpalono newPatchDataReceiverbuilder");

            //console.log(exported.viewer.currentDataStringified); // currentData to obecny objekt MapData (JSOn - string)

            exported.originalJSONparsed = JSON.parse(exported.viewer.currentDataStringified) ;

            console.log(exported.originalJSONparsed); // to dziala - objekt!

            exported.fillNodeList(exported.originalJSONparsed);

            console.log(exported.nodeList);

           // exported.getNodeById(5); //TODO: tutaj zamiast 5 dać wartość rodzica dodawanego node'a, później:


            // II. jpg/img data

            //budujemy ściezke na  (f-kcja "buildPath")
            // 1. no i dodać obrazek - musi się wysłać node/POST i dopisać
            //imgHTML.src=data.url+'/data/test_arch/imgs/imgs['+i+']/'+image.id+'.jpg'; - tak jest wyświetlany więc tak go trzeba zapisywać

            // I. JSON data

            // 1. w międzyczasie ustalamy Id nowego img - żeby był unikatowy i nowy, proponuję
            // przy okazji zrobić listę i f-kcje ktora bedzie wykonywala ta czynnosc

            // 2. znajdujemy rodzica po ID itd

            // 3. dodajemy do jego children dodawany promptem objekt JSON

            // zarezerwowanych Id na bazie nodeList, i dodając img sprawdzić jaki jest największy i kolejna wolna liczba naturalna

            // zeby wyslac jsona na serwer skorzystaj z f-kcji UpdateJsonOnServer.js tylko popatrz jak ten json ma wygladać
            // (sprawdz czy maja podobna budowe)

            // 4.odpalamy Viewer.loadURL

        }
        
        
    };



    // ma dodawać od razu zdjęcie do folderu imgs tylko opcja save(savePatch) ma wykonać aktualizację
    
    
    return exported;

});


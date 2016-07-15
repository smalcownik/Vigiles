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


    exported.traverse = function(parentObject, visitFunction) {


        for (var i = 0; i < parentObject.images.length; i++) {
            exported.dig(parentObject.images[i],i, visitFunction, null);
        }
    };



    exported.fillNodeList = function(){

        exported.nodeList = [];
        
        function fill(image,i,parent){
            
            //TODO: tutaj dzialać zeby budowało nodeList
            
            
        }
        
        



    };

    exported.nodeList = [];

    exported.getNodeById = function (idNumber){ // ma znalexc noda w nodeList na podstawie ID



        return node;
    };


    exported.newPatchDataReceiverBuilder = function(){
        
        var clickedElement = event.target;

        if (clickedElement.className === "saveNewPatchButton"){
            console.log("odpalono newPatchDataReceiverbuilder");

            console.log(exported.viewer.currentDataStringified); // currentData to obecny objekt MapData

            exported.originalJSONparsed = JSON.parse(exported.viewer.currentDataStringified) ;

            console.log(exported.originalJSONparsed); // to dziala

        }
        
        
    };

    
    //w tego prompta bym wklejał dane w postaci JSON'a i zrobić z niego objekt i z niego już korzystać hehe :)
    //TODO: dodać nowe dane jednak do jsona budowanego z viewera żeby map data brał z nowego jsona
    // ma dodawać od razu zdjęcie do folderu imgs tylko opcja save( nie save point tylko savePatch) ma wykonać aktualizację
    
    
    return exported;

});


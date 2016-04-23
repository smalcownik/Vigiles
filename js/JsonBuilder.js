/**
 * Created by marek on 01.02.16.
 */
define(["./Camera"], function (Camera) {

        var exported = {};


        exported.buildJSON = function () { // f-kcja wywoływana w Viewer.registerEventListeners

            var viewer = this.viewer;
            console.log(viewer.positionable);

            console.log("test");


            this.addSaveButton();
            this.updateJsonEventListener();

        };

        exported.addSaveButton = function () {
            var saveJsonButton = document.createElement('div');
            // document.body.appendChild(saveJsonButton);
            this.DOM = saveJsonButton;
            saveJsonButton.classList.add("saveJsonButton"); // użyte później w index2.html

            /*this.point = point;

             this.image = image;

             this.absolutePos = {
             x: image.absolutePos.x + 0.5 * image.absolutePos.w * point.x,
             y: image.absolutePos.y + 0.5 * image.absolutePos.h * point.y
             };

             this.textInit = point.textInit;*/

            saveJsonButton.style.top = Camera.position.x + 20 + 'px';
            saveJsonButton.style.left = Camera.position.y + 20 + 'px';


            saveJsonButton.style.position = 'absolute';

            saveJsonButton.style.zIndex = '1000';
            saveJsonButton.style.height = '70px';// to ręcznie dodałem do PointEventListener.countPointCoordinate żeby póxniej przy dodawaniu ładnie wyglądało
            saveJsonButton.style.width = '140px';// to ręcznie dodałem do PointEventListener.countPointCoordinate żeby póxniej przy dodawaniu ładnie wyglądało
            saveJsonButton.style.backgroundColor = '#000000';
            saveJsonButton.style.borderColor = '#ffffff';
            //divPoint.style.borderRadius = '50%';
            //divPoint.style.borderWidth = '3px';
            saveJsonButton.style.borderStyle = 'solid';
            saveJsonButton.style.textAlign = 'center';

            // var saveButtonParagraph = document.createElement('p');
            // debugger;
            var txt = "SAVE";
            saveJsonButton.style.color = 'white';
            saveJsonButton.style.fontSize = '22px';
            saveJsonButton.style.textAlign = 'center';
            saveJsonButton.innerHTML = txt;

            document.body.appendChild(saveJsonButton);

            //saveButtonParagraph.style.zIndex = '1001';
            //saveJsonButton.appendChild(saveButtonParagraph);

        };

        exported.updateJsonEventListener = function () {

            //debugger;

            document.body.addEventListener('click', this.updateJson);
        }; // te f-kcje są wywołane wyżej (w buildJSON)

        exported.addNewPointsToPatches = function(){

        // wywołanie w updateJson
        // funkcja bierze każdego nowego pointa (z positionables) i dodaje je do należytych patchów

            exported.viewer.positionable.forEach(function(element){
                if(element.DOM.tagName === "DIV"){
                    //console.log(element);
                    if(element.point.isNew === true){
                        console.log(element);

            //TODO: od tego miejsca trzeba kontynuować, czyli te nowe elementy żeby się dodawały do 'swoich starych'






                    }
                }
            })


        };

        exported.cleanPatchBeforeAddingToObject = function(patch){ //ogołocenie patcha przed dodanie do objektu

            var result = {};

            result.id = patch.image.id;
            result.size = patch.image.size;
            result.points = patch.image.points;

            result.children = patch.image.children.forEach(makeObject);

            return result;

        };

        exported.updateJson = function (event) {

            var viewer = exported.viewer; // tu nie mogłem dać "this.viewer" bo this tutaj to "body"
            var clickedElement = event.target; // to jest tylko element - zaraz znajdziemy dla niego Patch'a/Pointa

            if (clickedElement.className === "saveJsonButton") {


                //console.log("this: ", this);
                exported.addNewPointsToPatches();


                //TODO: tutaj przepis co po addNewPointsToPatch robić przy updateJson
                // a. napisać f-kcję addNewPointsToPatch - dodająca nowe punkty do patchów i edytująca stare
                // b. napisać  fkcję, która zbuduje drzewo genealogiczne z patchów
                // c. przed upchaniem w drzewo każdy patch zostanie ogołocany f-kcją z pkt. d
                // d. napisać f-kcję, która ogołoci wszystkie imagesy do tego co niezbędne (zmienną będzie patch a returnem ogolocony patch)




            };
        };


        return exported;
    }
);


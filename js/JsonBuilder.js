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

        exported.addNewPointsToPatches = function(){ // f-kcja działa poprawnie - po kliknięcu save patche mają dodane nowe(lub edytowne) punkty

        // wywołanie w updateJson
        // funkcja bierze każdego nowego pointa (z positionables) i dodaje je do należytych patchów

            exported.viewer.positionable.forEach(function(element){
                if(element.DOM.tagName === "DIV"){
                    //console.log(element);
                    if(element.point.isNew === true){
                        console.log(element);

                        element.image.points.push(element.point);

                    }
                }
            });

            exported.viewer.updateAllPositionables();

        };

        exported.buildPatchesTree = function(){
            // 0.stworzyć szblon objektu, z którego ma być jSON
            // 1. znaleźć te patche, których parent === null
            // 2. na każdym z nich zastosować funkcję kopiącą, taką, że:
            //      a. samego patcha ogołoci fkcją cleanPatch i każde z jego children gołoci i doda do jego array'a children



           // visitFunction poniżej to ma być "cleanPatchBeforeAddingToObject"
            console.log(this);

            //TODO: tutaj trzeba tak zrobić, żeby traverse,dig i cleanPatches przebudować tak, zeby się razem zgrały z patchami (najpierw zrobić pkty 0 i 1)
             this.traverse(this.cleanPatchBeforeAddingToObject);


        };

        /*exported.dig = function(image, visitFunction, parent) {  //czy f-kcja dig i traverse są potrzebne OBIE czy nie wystarczy delikatnie przerobiona jedna
            //debugger;
            visitFunction(image,parent); // ta funckja może robić co chce używając image i parent (to jej argumenty)
            // i w ten sposób robi coś na wsystkich imgs'ach - patrz PatchBuilder.build
            image.children.forEach(
                function (childrenImage) {

                    this.dig(childrenImage, visitFunction, image);
                }
                , this);
        };


        exported.traverse = function(visitFunction) {// ta funckja może robić co chce używając image i parent (to jej argumenty)
            // i w ten sposób robi coś na wsystkich imgs'ach - patrz PatchBuilder.build

            //debugger;
            //console.log(this.images);
            for (var i = 0; i < this.images.length; i++) {
                this.dig(this.images[i],i, visitFunction, null); //argumenty f-kcji dig
                // jak trawersuje (gdziekowliek by nie było wywołane) to zawsze zaczyna od this.images[0]
                // gdzie this to objekt z jSON'a
            }
        };*/

        exported.cleanPatchBeforeAddingToObject = function(patch){ //ogołocenie patcha przed dodanie do objektu

            var result = {};

            result.id = patch.image.id;
            result.size = patch.image.size;
            result.points = patch.image.points;

            result.children = [];
            return result;

        };//gotowa funkcja tylko w miejsce children nic nie daje

        exported.updateJson = function (event) {

            var viewer = exported.viewer; // tu nie mogłem dać "this.viewer" bo this tutaj to "body"
            var clickedElement = event.target; // to jest tylko element - zaraz znajdziemy dla niego Patch'a/Pointa

            if (clickedElement.className === "saveJsonButton") {

                exported.addNewPointsToPatches();
                exported.buildPatchesTree();


                //TODO: tutaj przepis co po addNewPointsToPatch robić przy updateJson
                // a. napisać f-kcję addNewPointsToPatch - dodająca nowe punkty do patchów i edytująca stare
                // b. napisać  fkcję, która zbuduje drzewo genealogiczne z patchów
                // c. przed upchaniem w drzewo każdy patch zostanie ogołocany f-kcją (cleanPatchBeforeAddingToObject)
                // d. napisać f-kcję, która ogołoci wszystkie imagesy do tego co niezbędne (zmienną będzie patch a returnem ogolocony patch)




            };
        };


        return exported;
    }
);


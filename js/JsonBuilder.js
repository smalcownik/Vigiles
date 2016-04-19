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
            this.updateJsonContent();


            //TODO: tu teraz rozkminić jakies budowanie JSONA z positionables,


            //każdy patch image ma swój parent, kazdy point ma swój image, na podstawie tych dwóch danych zrobić drzewo

            // potrzebne dane: patch: originalParent:"", id:"", size:{}, points:[], points.textInit, children:[], pos(tylko jeśli jest childrenem):{}, parent:{}

            // a może wymazać tylko te dane, które powodują "circle" tj(w patch.image): parent, patch,
            //  w point usunąć .DOM i .image, (zostawić point.point i point.absolutePos)
            //przy usuwaniu pointa trzeba też usuwac jego dane z image

            //  budować drzewo tylko na podstawie positionables
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

             this.originalTextValue = point.textInit;*/

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

        exported.updateJsonContent = function () {

            //debugger;

            document.body.addEventListener('click', this.updateJson);
        };

        exported.updateJson = function (event) {


            var viewer = exported.viewer; // tu nie mogłem dać "this.viewer" bo this tutaj to "body"

            var clickedElement = event.target; // to jest tylko element - zaraz znajdziemy dla niego Patch'a/Pointa
            var clickedElementPoint; // tu będzie Patch, który zawiera clickedPicture(img)


            if (clickedElement.className === "saveJsonButton") {

//TODO: tutaj  1. stworzyć z positionables objekt na wzór Jsona
                // 2. zrobić z niego Jsona
                // 3. zapisać tego Jsona do pliku w miejsce starego Jsona

                var patchParentArr = [];
                var pointArr = [];
                var resultObject = {
                    meta: {},
                    images: []
                };


                viewer.positionable.forEach(
                    function (element) {

                        if (element.DOM.tagName === "IMG") {

                            //if(element.image.parent === null)

                            patchParentArr.push(element);

                        }
                        else {

                            pointArr.push(element)
                        }


                    }
                );

                console.log(patchParentArr, pointArr);


                function makeObject(patch) {

                    var result = {};

                    result.id = patch.image.id;
                    result.size = patch.image.size;
                    result.points = patch.image.points;

                    result.children = patch.image.children.forEach(makeObject);

                    return result;

                }

                function BuildImagesArray(parent) {

                    var result = makeObject(parent);

                    parent.image.children.forEach(BuildImagesArray);


                }

                /*exported.prototype.dig = function dig(image,i, visitFunction, parent) {  //czy f-kcja dig i traverse są potrzebne OBIE czy nie wystarczy delikatnie przerobiona jedna
                 //debugger;
                 visitFunction(image,i,parent); // ta funckja może robić co chce używając image i parent (to jej argumenty)
                 // i w ten sposób robi coś na wsystkich imgs'ach - patrz PatchBuilder.build
                 image.children.forEach(
                 function (childrenImage) {

                 this.dig(childrenImage,i, visitFunction, image);
                 }
                 , this);
                 };


                 exported.prototype.traverse = function (visitFunction) {// ta funckja może robić co chce używając image i parent (to jej argumenty)
                 // i w ten sposób robi coś na wsystkich imgs'ach - patrz PatchBuilder.build

                 //debugger;
                 //console.log(this.images);
                 for (var i = 0; i < this.images.length; i++) {
                 this.dig(this.images[i],i, visitFunction, null); //argumenty f-kcji dig
                 // jak trawersuje (gdziekowliek by nie było wywołane) to zawsze zaczyna od this.images[0]
                 // gdzie this to objekt z jSON'a
                 }
                 };*/


            }
            ;


        };


        return exported;
    }
);


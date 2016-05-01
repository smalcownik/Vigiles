/**
 * Created by marek on 22.01.16.
 */
define(['./Camera', './Point'], function (Camera, Point) { //tworzy objekty dodawanych punktów razem z właściowściami DOM

        var exported = {};



        exported.toAddPoint = function (event) {// event dla camery/obrazków // wywoływana w PointEventListeners.js

            var viewer = exported.viewer;

            var x = event.clientX;     // Get the horizontal coordinate
            var y = event.clientY;

            //console.log(viewer);

            // console.log(event.target);

            //var clickedPicture = document.elementFromPoint(x, y); // to jest tylko img - zaraz znajdziemy dla niego Patch'a
            var clickedPicture = event.target; // to jest tylko img - zaraz znajdziemy dla niego Patch'a

            //console.log(clickedPicture);

            var clickedImagePatch; // tu będzie Patch, który zawiera clickedPicture(img)

            //console.log(clickedPicture.tagName);

            if (clickedPicture.tagName === "IMG") {

//debugger;
                viewer.positionable.forEach(
                    function (element) {

                        if (element.DOM === clickedPicture) {

                            clickedImagePatch = element;

                            //console.log(clickedImagePatch);
                        }

                    }
                );

                //console.log(clickedImagePatch); // pokazuje który patch jest najwyżej w warstwie patch'ów w które kliknięliśmy - teraz znaleźć jego parnetsów

                var clickedAndItsParents = []; // objekty w kolejności child -> parent -> grandma

                function dig(image, arr) { // przeszukuje image i dodaje jego parenty do arraya dodawanie zachodzi
                    // w kierunku dna, tj. dalsze elementy leżą głębiej, ostatni jest zawsze imgID =0

                    if (image.parent !== null) {

                        arr.push(image.parent);

                        dig(image.parent, arr);
                    }

                    //else {console.log(arr)};
                }

                function parentsDigger(patch, arr) { // patrzy czy

                    var image = patch.image;

                    arr.push(image);

                    dig(image, arr);

                }

                parentsDigger(clickedImagePatch, clickedAndItsParents);

                //console.log(clickedAndItsParents);


                function selectPointedImage(array, position) { // wywołana przez pointAllocate

                    var result;

                    if (position > 0) {

                        if (array[position].absolutePos.w * Camera.scale /*imgHTML.style.width ale BEZ PIKSELI*/ > window.innerWidth) {


                            if (array[position - 1].absolutePos.w * Camera.scale /*imgHTML.style.width ale BEZ PIKSELI*/ < window.innerWidth) {

                                result = array[position - 1];

                            } else {

                                if (position - 1 > 0) {

                                    result = selectPointedImage(array, position - 1);
                                    //alert('ss');
                                } else {
                                    result = array[0];
                                }
                            }
                        } else {

                            result = array[position];
                        }

                    } else {
                        result = array[position];
                    }

                    return result;
                }

                function pointAllocate(array) { //  tu jako zmienna wejdzie array patchów, na których nastapiło dblclick,
                    // zwraca image, na którym ma być osadzony dodawany punkt

                    var initPosition = array.length - 1;
                    return selectPointedImage(array, initPosition);

                }

                var selectedImage = pointAllocate(clickedAndItsParents); // z rodziców wybiera ten, na którym ma osadzić punkt

                //console.log(selectedImage);

                function countPointCoordinates(image, clickX, clickY) {
                    var point = {x: null, y: null, textInit:null, isNew:true};



                    point.y = (((clickY - 6/*:to jest: 0.5 *style.width + 2* border.width */ - window.innerHeight / 2) / viewer.camera.scale) + (window.innerHeight / 2) - image.absolutePos.y - viewer.camera.position.y ) / (image.absolutePos.h / 2);



                    point.x = (((clickX - 6/*:to jest: 0.5 *style.width + 2* border.width */ - window.innerWidth / 2) / viewer.camera.scale) + window.innerWidth / 2 - image.absolutePos.x - viewer.camera.position.x) / (image.absolutePos.w / 2);


                    return point;
                };

                //console.log(countPointCoordinates(selectedImage,x,y));

                var pointXY = countPointCoordinates(selectedImage, x, y);              // WERSJA Z POINTEM NA patchu, który jest odsłonięty
                //var pointXY =countPointCoordinates(clickedImagePatch.image,x,y);  // WERSJA Z POINTEM NA POWIERZCHNI wszystkich patchów

                console.log(selectedImage);


                viewer.positionable.push(new Point(selectedImage, pointXY));             // WERSJA Z POINTEM NA patchu, który jest odsłonięty
                //viewer.positionable.push(new Point(clickedImagePatch.image,pointXY)); // WERSJA Z POINTEM NA POWIERZCHNI wszystkich patchów
                //console.log(viewer.positionable);


               exported.makePointDefaultOptions(viewer.positionable[viewer.positionable.length-1].DOM, viewer.positionable[viewer.positionable.length-1]);


            }

        };

        exported.makePointDefaultOptions = function(ElementDOM,ObjectElement){

            //console.log(ObjectElement);

            //ObjectElement.isNew = true; //  tu jakoś zasrywało patch'e

            var viewer = exported.viewer;


            var inDiv = document.createElement('div');
            ElementDOM.appendChild(inDiv);


            inDiv.className = "pointContent";
            inDiv.style.position = 'relative';
            inDiv.style.background = '#0000A0';//'#6960EC';//#737CA1 ,
            inDiv.style.left = '10px';
            inDiv.style.top = '10px';
            inDiv.style.color = "red";
            inDiv.style.textAlign = 'center';
            inDiv.style.color = 'white';
            // inDiv.style.background = "";

            inDiv.style.height = '102px';// to ręcznie dodałem do PointEventListener.countPointCoordinate żeby póxniej przy dodawaniu ładnie wyglądało
            inDiv.style.width = '150px';
            inDiv.style.border = '3px solid rgba(255, 255, 255, .8)';
            inDiv.style.borderRadius = '5px';
            inDiv.style.zIndex = '1001';


            var divPar1 = document.createElement('p');
            inDiv.appendChild(divPar1);
            divPar1.className = "pointContentTextValue";


            //TODO: w fkcji poniżej ten text value dodać

            if (!ObjectElement.textInit) { // jesli nie ma początkowej wartości pole "textInit"
                // to pisze żeby je wprowadzić, w innym razie wyswietla zawartość pola
                var initialTextValue = "To insert point value, click &quot;EditPoint&quot; just below";

                divPar1.innerHTML = initialTextValue;
            }
            else {
                divPar1.innerHTML = ObjectElement.textInit
            }

            divPar1.style.wordWrap = 'break-word';
            divPar1.style.position = 'relative';
            divPar1.style.left = '0px';
            divPar1.style.top = '-18px';
            divPar1.style.border = '1px solid rgba(255, 255, 255, .8)';
            divPar1.style.height = '53px';




            var divPar2 = document.createElement('p');
            divPar2.innerHTML = "EDIT POINT";
            inDiv.appendChild(divPar2);
            divPar2.className = "pointContentEDIT";
            divPar2.style.wordWrap = 'break-word';
            divPar2.style.position = 'relative';
            divPar2.style.left = '0px';
            divPar2.style.top = '-34px';
            divPar2.style.border = '1px solid rgba(255, 255, 255, .8)';
            divPar2.style.height = '23px';


            var divPar3 = document.createElement('p');
            divPar3.innerHTML = "DELETE POINT";
            inDiv.appendChild(divPar3);
            divPar3.className = "pointContentDELETE";
            divPar3.style.wordWrap = 'break-word';
            divPar3.style.position = 'relative';
            divPar3.style.left = '0px';
            divPar3.style.top = '-50px';
            divPar3.style.border = '1px solid rgba(255, 255, 255, .8)';
            divPar3.style.height = '23px';

            viewer.updateAllPositionables();

        };

        exported.toShowPointContent = function (event) {    // event dla camery/obrazków

            var viewer = exported.viewer;

            var clickedElement = event.target; // to jest tylko element - zaraz znajdziemy dla niego Patch'a/Pointa
            var clickedElementPoint; // tu będzie Patch, który zawiera clickedPicture(img)

            if (clickedElement.className === "point") {



                viewer.positionable.forEach(
                    function (element) {

                        if (element.DOM === clickedElement) {

                            clickedElementPoint = element;
                        }
                    }
                );
            };



            if (clickedElementPoint) {

                //debugger;

                //console.log(clickedElement.hasChildNodes());
                //console.log(clickedElementPoint);
                //console.log(clickedElement);


                if (clickedElement.hasChildNodes()) {

                    //debugger;

                    if (clickedElement.childNodes[0].style.display !== "none") {
                        clickedElement.childNodes[0].style.display = "none";
                    }
                    else {
                        clickedElement.childNodes[0].style.display = "block";
                    }

                }

                else {

                    //console.log(clickedElementPoint.textInit);



                    exported.makePointDefaultOptions(clickedElement,clickedElementPoint);
                }

            }


            else if (clickedElement.className === "pointContentTextValue" || clickedElement.parentNode.className === "pointContentTextValue") {

                //console.log("kliknąłem w listęPodPunktem");
                clickedElement.parentNode.style.display = "none";
            }


            else if (clickedElement.className === "pointContentEDIT" || clickedElement.parentNode.className === "pointContentEDIT") {

                //console.log("kliknąłem w listęPodPunktem");
                //alert("EDIT! EDIT!");

                var editResult = prompt("Please write equipment note here","");

                var clickedPoint;

                if(editResult != "" && editResult !== null){ // przypadke, gdy nic nie wpiszemy w prompta, albo damy "Cancel"

                    viewer.positionable.forEach(
                        function (element, i) {

                            if (element.DOM === clickedElement.parentNode.parentNode) {

                                clickedPoint = element;

                                clickedPoint.point.textInit = editResult;
                                clickedPoint.point.isNew = true;



                            }
                        }
                    );

                    console.log(clickedPoint);


                    clickedElement.parentNode.childNodes[0].innerHTML = clickedPoint.point.textInit;


                    viewer.updateAllPositionables();
                    console.log(viewer.positionable);
                }

            }

            else if (clickedElement.className === "pointContentDELETE" || clickedElement.parentNode.className === "pointContentDELETE") {


                var answer = confirm("Are you sure you wan't to delete point and it content?");

                if (answer == true) {
                    viewer.positionable.forEach(
                        function (element, i) {

                            if (element.DOM === clickedElement.parentNode.parentNode) {

                                //console.log(i);

                                var a = clickedElement.parentNode.parentNode;

                                a.parentNode.removeChild(a);

                                if (i > -1) {
                                    viewer.positionable.splice(i, 1); // usunięto pointa z posositionable ale został jeszcze div.point w htmlu, może jego najpierw usunąć
                                }

                            }
                        }
                    );
                    //viewer.updateAllPositionables();
                    console.log(viewer.positionable);
                }

            }

            else { // sytuacja gdy kikniemy poza jakimkolwiek pointem (wtedy maja zniknąć otwarte okna "pointContent")

                var x = document.getElementsByClassName("pointContent");
                var i;
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none";
                }


            };



        };

        return exported;

    }
);
/**
 * Created by marek on 22.01.16.
 */
define(['./Camera','./Point'], function (Camera,Point) { //tworzy objekty dodawanych punktów razem z właściowściami DOM

        var exported = {};

        exported.toAddPoint = function (event) {// event dla camery/obrazków

            var viewer = exported.viewer;

            var x = event.clientX;     // Get the horizontal coordinate
            var y = event.clientY;

            console.log(viewer);

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
                    var point = {x: null, y: null};


                    // na podstawie Point.updateMyPoisition(), dodoałem tylko "na pałe" 103 tutaj
                    point.y = (((clickY - 6/* 0.5 *style.width + 2* border.width */ - window.innerHeight / 2) / viewer.camera.scale) + (window.innerHeight / 2) - image.absolutePos.y /*+103*/ - viewer.camera.position.y ) / (image.absolutePos.h / 2);

                    // na podstawie Point.updateMyPoisition(), po przekszatłceniu

                    point.x = (((clickX - 6/* 0.5 *style.width + 2* border.width */ - window.innerWidth / 2) / viewer.camera.scale) + window.innerWidth / 2 - image.absolutePos.x - viewer.camera.position.x) / (image.absolutePos.w / 2);


                    return point;
                };

                //console.log(countPointCoordinates(selectedImage,x,y));

                var pointXY = countPointCoordinates(selectedImage, x, y);              // WERSJA Z POINTEM NA patchu, który jest odsłonięty
                //var pointXY =countPointCoordinates(clickedImagePatch.image,x,y);  // WERSJA Z POINTEM NA POWIERZCHNI wszystkich patchów

                //debugger;

                viewer.positionable.push(new Point(selectedImage, pointXY));             // WERSJA Z POINTEM NA patchu, który jest odsłonięty
                //viewer.positionable.push(new Point(clickedImagePatch.image,pointXY)); // WERSJA Z POINTEM NA POWIERZCHNI wszystkich patchów

                viewer.updateAllPositionables();


                //console.log(viewer.positionable[0]);


                //TODO: function createPointInitialContent

            }

        };

        exported.toShowPointContent = function(event) {    // event dla camery/obrazków

            var viewer = exported.viewer;

            var clickedElement = event.target; // to jest tylko element - zaraz znajdziemy dla niego Patch'a/Pointa

            if (clickedElement.className === "point"){

                var clickedElementPoint; // tu będzie Patch, który zawiera clickedPicture(img)

                viewer.positionable.forEach(
                    function (element) {

                        if (element.DOM === clickedElement) {

                            clickedElementPoint = element;
                        }
                    }
                );
            };

            if (clickedElementPoint) {

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

                    console.log(clickedElementPoint.originalTextValue);

                    var inDiv = document.createElement('div');

                    clickedElement.appendChild(inDiv);
                    inDiv.innerHTML = clickedElementPoint.originalTextValue;
                    inDiv.style.position = 'relative';
                    inDiv.style.left = '10px';
                    inDiv.style.top = '10px';
                    inDiv.style.color="red";
                    inDiv.style.textAlign = 'center';
                    // inDiv.style.background = ""

                    inDiv.style.height = '22px';// to ręcznie dodałem do PointEventListener.countPointCoordinate żeby póxniej przy dodawaniu ładnie wyglądało
                    inDiv.style.width = '120px';
                    inDiv.style.border = '3px solid rgba(255, 255, 255, .8)';
                    inDiv.style.borderRadius = '5px';
                    inDiv.style.zIndex = '1001';


                }

            }


        };

        return exported;
    }
);
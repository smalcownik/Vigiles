define(['./Camera','./Point'], function (Camera, Point) {

    var exported = {};

    exported.addPoint = function () {

        var viewer = this.viewer; // jest widoczny jako objekt dopiero gdy wstrzyknąłem viewera przed wykonaniem F-KCJI: registerEventListeners()

         //console.log(viewer);

        document.body.addEventListener('dblclick', function (event) {  // event dla camery/obrazków

            var x = event.clientX;     // Get the horizontal coordinate
            var y = event.clientY;

            var clickedPicture = document.elementFromPoint(x, y); // to jest tylko img - zaraz znajdziemy dla niego Patch'a


            var clickedImagePatch; // tu będzie Patch, który zawiera clickedPicture(img)

            viewer.positionable.forEach(
                function (element) {

                    if (element.DOM.src === clickedPicture.src) {

                        clickedImagePatch = element;
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

                        }else {

                            if (position -1  > 0) {

                               result = selectPointedImage(array, position - 1);
                                //alert('ss');
                            }else {
                                result = array[0];
                            }
                        }
                    }else {

                        result = array[position];
                    }

                }else {
                    result = array[position];
                }

                return result;
            }

            function pointAllocate(array) { //  tu jako zmienna wejdzie array patchów, na których nastapiło dblclick,
                                            // zwraca image, na którym ma być osadzony dodawany punkt

                var initPosition = array.length - 1;

                //debugger;

                return selectPointedImage(array, initPosition);

            }

            var selectedImage = pointAllocate(clickedAndItsParents); // z rodziców wybiera ten, na którym ma osadzić punkt

            console.log(selectedImage);

            // TODO: tutaj policzyć dane punktu, na podstawie image i miejsca kliknięcia

            function countPointCoordinates(image,clickX,clickY ){
            var point = {x:0,y:0};


//TODO: ten point.y coś liczy ale zupełnie źle, trzeba to rozkminić geometrycznie, może sam HTML trzeba obadać
                point.y = (((clickY-window.innerHeight/2)/viewer.camera.scale)+ window.innerWidth/2 - image.absolutePos.y -viewer.camera.position.y )/(image.absolutePos.h/2);

                /*divPoint.style.top = String( window.innerHeight/2 + (image.absolutePos.y +
                        (image.absolutePos.h * 0.5 * this.point.y) + camera.position.y - window.innerHeight/2) * camera.scale) + "px";


                divPoint.style.left = String( window.innerWidth/2 + (image.absolutePos.x +
                        (image.absolutePos.w * 0.5 * this.point.x) + camera.position.x - window.innerWidth/2) * camera.scale) + 'px';*/

            return point;
            };

            console.log(countPointCoordinates(selectedImage,x,y));

            //viewer.positionable.push(new Point(image,point)) // point(Pattern) = {"x":0,"y":0}

        });
    };

    return exported;

})

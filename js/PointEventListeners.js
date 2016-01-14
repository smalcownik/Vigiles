define(['./Camera'], function (Camera) {

    var exported = {};

    exported.addPoint = function () {

        var viewer = this.viewer; // jest widoczny jako objekt dopiero gdy wstrzyknąłem viewera przed wykonaniem F-KCJI: registerEventListeners()

        // console.log(viewer);

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

                function dig(image,arr) { // przeszukuje image i dodaje jego parenty do arraya dodawanie zachodzi
                                            // w kierunku dna, tj. dalsze elementy leżą głębiej, ostatni jest zawsze imgID =0

                    if (image.parent !== null) {

                        arr.push(image.parent);

                        dig(image.parent,arr);
                    }

                    //else {console.log(arr)};
                }

                function parentsDigger(patch,arr) { // patrzy czy

                    var image = patch.image;

                    arr.push(image);

                    dig(image,arr);

                }

                parentsDigger(clickedImagePatch,clickedAndItsParents);

                console.log(clickedAndItsParents);

                //TODO: teraz cza wybrać, któremu imgsowi z clickedAndItsParents przypiszemy dodawany punkt


            }
        )
        ;
    }

    return exported;

})
;
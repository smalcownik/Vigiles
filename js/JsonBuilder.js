/** //1. użyte tylko przy dodawaniu nowych punktów //!! wersja budowania nowego jsona na podstawie positionables,
 * 
 *  //2. nanosi nowe punkty do jsona i wysyla go na serwer - ale 3.
 * 
 *  //3. !!! przy dodawaniu zdjecia (nowego Patcha), json stworzony jest w inny sposob w ImageDataAdding
 *  
 * Created by marek on 01.02.16.
 */
define(["./Camera", "./UpdateJsonOnServerREQUEST"], function (Camera, UpdateJsonOnServerREQUEST) {

        var exported = {};


        exported.buildJSON = function () { // f-kcja wywoływana w Viewer.registerEventListeners
            //var viewer = this.viewer;
            // console.log(viewer.positionable);



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
            var txt = "SAVE POINTS";
            saveJsonButton.style.color = 'white';
            saveJsonButton.style.fontSize = '22px';
            saveJsonButton.style.textAlign = 'center';
            saveJsonButton.innerHTML = txt;

            document.body.appendChild(saveJsonButton);

            //saveButtonParagraph.style.zIndex = '1001';
            //saveJsonButton.appendChild(saveButtonParagraph);

        }; // dodaje przycisk "save points" klasy "saveJsonButton"

        exported.updateJsonEventListener = function () {

            document.body.addEventListener('click', this.updateJson);
        }; // te f-kcje są wywołane wyżej (w buildJSON)
    

        exported.addNewPointsToPatches = function () { // f-kcja działa poprawnie - po kliknięcu save patche mają dodane nowe(lub edytowne) punkty

            // wywołanie w updateJson
            // funkcja bierze każdego nowego pointa (z positionables) i dodaje je do należytych patchów

            exported.viewer.positionable.forEach(function (element) {
                if (element.DOM.tagName === "DIV") {
                    //console.log(element);
                    if (element.point.isNew === true) { // isNew występuje w ./PointEventFunctions i w ./Point
                        //console.log(element); opcjonalnie wyświetla nowe elementy

                        element.point.isNew = false;


                        element.image.points.push(element.point); // tu następuje dodanie nowej zawartości


                    }
                }
            });

            exported.viewer.updateAllPositionables(); // tutaj wyświetla nową zawartość (jeszcze zanim wyśle ją na serwer)
            //console.log(exported.viewer.positionable);

        }; // f-kcja dodaje nowe/edytowane pointy do patchów (elementów viewer.positionable)

        {
            exported.dig = function (image, visitFunction, parentImage) {
                //debugger;

                visitFunction(image, parentImage);

                //tutaj zrobić, zeby visit function dostawało jako parent Image już objekt parentsa z objScheme
                // czyli : jak dojść żeby na podstawie kiedy mamy dany patch, określić, który image z objektu objScheme.images... jest jego parentem - to było trudne, rozwiązaniem
                // jest funkcja addCleanedPatchesToObject i w niej dodanie do patchów swoich adresów w objekcie objScheme

                if (image.children.length > 0) {
                    image.children.forEach(
                        function (childrenImage) { //tu childrenImage to "each children"

                            exported.dig(childrenImage, visitFunction, image);
                        });
                }
            };

            exported.traverse = function (visitFunction) {


                for (var i = 0; i < this.patchesWithoutParent.length; i++) {
                    this.dig(this.patchesWithoutParent[i], visitFunction, null);
                }
            };
        } // dig i traverse

        exported.cleanPatchBeforeAddingToObject = function (image) {

            var result = {};

            result.id = image.id;
            result.size = image.size;
            result.points = image.points;
            result.children = [];

            if (image.pos) {
                result.pos = image.pos
            }


            return result;
        }; //schemat ogoloceniapatcha do elementów niezapetlajacych przed dodaniem do objektu

        exported.addCleanedPatchesToObject = function (image, parentImage) {


            var img = exported.cleanPatchBeforeAddingToObject(image);

            if (parentImage) {

                //console.log(parentImage.jsonAddress); // ten objekt jest stworzony w "else" tej funkcji a tu w drugiej kolejnosci wystepuje
                parentImage.jsonAddress.children.push(img); // jsonAddress to sztucznie dolozony element do objektu,
                //ktory ma tylko te elementy, ktore sie nie zapetlaja
                // zrobiono to dlatego, ze
                image.jsonAddress = parentImage.jsonAddress.children[parentImage.jsonAddress.children.length - 1]; // to ważna linijka, na niej zakończyłem tworzenie objektu (plus 5 linijek niżej)

            }
            else {
                //console.log(parentImage.jsonAddress); // tutaj jeszcze NIE ISTNIEJE jsonAddress
                exported.objScheme.images.push(img);
                image.jsonAddress = exported.objScheme.images[exported.objScheme.images.length - 1]; // to ważna linijka, na niej zakończyłem tworzenie objektu (plus 5 linijek wyżej)
            }
            //console.log(image);


        }; // wsadzenie ogoloconego Patcha, użyte w buidPatchesToObject

        exported.buildPatchesTree = function () {

            this.objScheme = {
                meta: {},
                images: []
            };

            this.patchesWithoutParent = [];

            this.viewer.positionable.forEach(function (element) {
                if (element.DOM.tagName === "IMG" && element.image.parent === null) {
                    exported.patchesWithoutParent.push(element.image);
                }
            });

            //console.log(this.patchesWithoutParent); // są gotowe objekty "ultimate parents"

            this.traverse(this.addCleanedPatchesToObject);


        }; // budowanie exported.objScheme - czyli obiektu, z którego jest robiony json (w funkcji updateJson)


        exported.updateJson = function (event) { // wywołana przez .updateJsonEventListener
            //console.log("dupa 456");

            var viewer = exported.viewer; // tu nie mogłem dać "this.viewer" bo this tutaj to "body"

            var clickedElement = event.target; // to jest tylko element - zaraz znajdziemy dla niego Patch'a/Pointa

            if (clickedElement.className === "saveJsonButton") {

                console.log(viewer.positionable);

                exported.addNewPointsToPatches();

                exported.buildPatchesTree();

                console.log(exported.objScheme);

                exported.updatedJSON = JSON.stringify(exported.objScheme); // objScheme zbudowany w buildPatchesTree

                console.log(exported.updatedJSON);

                UpdateJsonOnServerREQUEST.makeRequest(exported.updatedJSON);

            }
            



        };


        return exported;

    }
)
;
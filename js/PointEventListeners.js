define(['./Point','./PointEventFunctions'], function (Point,PointEventFunctions) {

    var exported = {};

    exported.addPoint = function () {

        //var viewer = this.viewer; // jest widoczny jako objekt dopiero gdy wstrzyknąłem viewera przed wykonaniem F-KCJI: registerEventListeners()

        //console.log(viewer);

        document.body.addEventListener('dblclick',  PointEventFunctions.toAddPoint );
    };


    exported.showPointContent = function () {

        //var viewer = this.viewer;

        document.body.addEventListener('click',PointEventFunctions.toShowPointContent /*function (event) {    // event dla camery/obrazków

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


        }*/);
    };

    return exported;

});

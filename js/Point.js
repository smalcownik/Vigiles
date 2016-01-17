define([], function () {

        var exported = function Point(image, point) {
            var divPoint = document.createElement('div');

            document.body.appendChild(divPoint);
            this.DOM = divPoint;

            divPoint.classList.add("point"); // użyte później w index2.html

            this.point = point;

            this.image = image;

            this.absolutePos = {
                x: image.absolutePos.x + 0.5 * image.absolutePos.w * point.x,
                y: image.absolutePos.y + 0.5 * image.absolutePos.h * point.y
            };

            divPoint.style.top = this.absolutePos.y + 'px';
            divPoint.style.left = this.absolutePos.x + 'px';


            divPoint.style.position = 'absolute';

            divPoint.style.zIndex = '1000';
            divPoint.style.height = '6px';// to ręcznie dodałem do PointEventListener.countPointCoordinate żeby póxniej przy dodawaniu ładnie wyglądało
            divPoint.style.width = '6px';// to ręcznie dodałem do PointEventListener.countPointCoordinate żeby póxniej przy dodawaniu ładnie wyglądało
            divPoint.style.backgroundColor = '#000000';
            divPoint.style.borderColor = '#ffffff';
            //divPoint.style.borderRadius = '50%';
            //divPoint.style.borderWidth = '3px';
            divPoint.style.borderStyle = 'solid';

            /*divPoint.addEventListener("click", function( ) {
                // display the current click count inside the clicked div
                console.log("clicked!");

            }, false);*/

        };

        exported.prototype.updateMyPosition = function (camera) {

            var divPoint = this.DOM;

            var image = this.image;

            divPoint.style.top = String(window.innerHeight/2 + ( image.absolutePos.y +
                    (image.absolutePos.h * 0.5 * this.point.y) + camera.position.y - window.innerHeight/2) * camera.scale) +"px";
//debugger;

            divPoint.style.left = String( window.innerWidth/2 + (/* 0.5 *style.width + 2* border.width */ image.absolutePos.x +
                    (image.absolutePos.w * 0.5 * this.point.x) + camera.position.x - window.innerWidth/2) * camera.scale) + 'px';

        };

        return exported;
    }
);
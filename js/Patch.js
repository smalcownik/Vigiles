define([], function () { // tworzy objekty zdjec (łatek),

        var exported = function Patch(image,parent,data){

            var imgHTML= document.createElement('img');
            imgHTML.src=data.url+'/imgs/'+image.id+'.jpg'; //  tu jest odniesienie do plików jpg (jedyne!!)
            this.DOM = imgHTML;
            image.patch = this;
            this.image = image;

            document.body.appendChild(imgHTML);

            if (parent) {

                var parentW = parent.absolutePos.w; // szerokosc (wraz z padding i border), analogicznie Height
                var parentH = parent.absolutePos.h;
                var parentT = parent.absolutePos.y; // position top srodka parenta ??
                var parentL = parent.absolutePos.x; // position left srodka parenta ??


                var imSizeW = parentW * image.pos.w;
                var imSizeH = parentW * image.pos.w * image.size.h / image.size.w;

                image.absolutePos = {
                    y: parentT + parentH * (image.pos.y) * 0.5, // odleglosc od gory storny do strodka zdjecia
                    x: parentL + parentW * (image.pos.x) * 0.5,// odleglosc od lewej krawedzi strony do srodka zdjecia
                    w: imSizeW,
                    h: imSizeH
                };

            } else {
                image.absolutePos = {
                    y: window.innerWidth * 0.5 * image.size.h / image.size.w,  // srodek zdjęcia : y
                    x: window.innerWidth / 2, // srodek zdjęcia: x
                    w: window.innerWidth, //szerokość okna przegladarki www
                    h: window.innerWidth * image.size.h / image.size.w // wymiar zdjęcia y, w zasadzie 2*y
                };

            }

            imgHTML.style.border = '1px dashed blue';
            imgHTML.style.position = 'absolute';



        };
        exported.prototype.buildDOM =function(){

        };
        exported.prototype.attachEvents =function(){

        };

        exported.prototype.updateMyPosition =function(camera){

            var imgHTML = this.DOM;

            var image = this.image;

            imgHTML.style.top = String(window.innerHeight/2+(image.absolutePos.y - image.absolutePos.h * 0.5 + camera.position.y - window.innerHeight/2)*camera.scale) + 'px';
            imgHTML.style.left = String(window.innerWidth/2+(image.absolutePos.x - image.absolutePos.w * 0.5 + camera.position.x - window.innerWidth/2)*camera.scale) + 'px';
            imgHTML.style.width = String(image.absolutePos.w*camera.scale) + 'px';
            imgHTML.style.height = String(image.absolutePos.h*camera.scale) + 'px';
        };


            return exported;
        }
    );
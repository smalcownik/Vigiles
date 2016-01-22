define([], function () { // tworzy objekty zdjec (łatek),

        var exported = function Patch(image,parent,data,i){

            var imgHTML= document.createElement('img');
            imgHTML.src=data.url+'/imgs/imgs['+i+']/'+image.id+'.jpg'; //  tu jest odniesienie do plików jpg (jedyne!!)
            this.DOM = imgHTML;
            image.patch = this;
            this.image = image;



            //console.log(image);

            image.parent = parent;

            this.defaultOpacity = 0.1;

            document.body.appendChild(imgHTML);

            if (parent) {

                var parentDOM = parent.patch.DOM;

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

                imgHTML.style.opacity = this.defaultOpacity; // jesli ma parenta to widac go słabiej (a f-kcja updateMyPosition zrobi tak):
                                                            // jeśli parent wykracza poza obraz windowWidth/heigth to wtedy jego children będzie mocniej widoczny

                //debugger;

            } else {

                //if(i===0){

                    image.absolutePos = {
                    y: window.innerWidth * 0.5 * image.size.h / image.size.w,  // srodek zdjęcia : y
                    x: window.innerWidth * (0.5 + 1.10 *i), // srodek zdjęcia: x
                    w: window.innerWidth, //szerokość okna przegladarki www
                    h: window.innerWidth * image.size.h / image.size.w // wymiar zdjęcia y, w zasadzie 2*y
                };

               /* }else{}

                image.absolutePos = {
                    y: window.innerWidth * 0.5 * image.size.h / image.size.w,  // srodek zdjęcia : y
                    x: window.innerWidth * (0.5 + 1.25 *i) , // srodek zdjęcia: x
                    w: window.innerWidth, //szerokość okna przegladarki www
                    h: window.innerWidth * image.size.h / image.size.w // wymiar zdjęcia y, w zasadzie 2*y
                };*/

                imgHTML.style.opacity = 1; // jesli nie ma parenta to widac do mocno

            }

            //imgHTML.style.border = '1px dashed blue';
            imgHTML.style.border = '5px solid rgba(255, 255, 255, .2)';
            imgHTML.style.borderRadius = '5px';
            imgHTML.style.position = 'absolute';





        };
        /*exported.prototype.buildDOM =function(){ //to na razie nic nie robi

        };
        exported.prototype.attachEvents =function(){ // to na razie nic nie robi

        };*/

        exported.prototype.updateMyPosition =function(camera){
            var imgHTML = this.DOM;

            var image = this.image;

            var defaultOpacity = this.defaultOpacity;

            if (image.parent!== null){

                var parentDOM = image.parent.patch.DOM;
            }


           // UPDATE POSITION:

            imgHTML.style.top = String(window.innerHeight/2+(image.absolutePos.y - image.absolutePos.h * 0.5 + camera.position.y - window.innerHeight/2)*camera.scale) + 'px';

            imgHTML.style.left = String(window.innerWidth/2+(image.absolutePos.x - image.absolutePos.w * 0.5 + camera.position.x - window.innerWidth/2)*camera.scale) + 'px';/*image.absolutePos.x - image.absolutePos.w * 0.5 +*/

            imgHTML.style.width = String(image.absolutePos.w*camera.scale) + 'px';
            imgHTML.style.height = String(image.absolutePos.h*camera.scale) + 'px';

            //console.log(image);

            // UPDATE OPACITY:

            if(image.absolutePos.w*camera.scale/*imgHTML.style.width ale BEZ PIKSELI*/ > window.innerWidth ) {

               // console.log(image);

                if (image.children.length > 0) {

                    image.children.forEach(function(element){element.patch.DOM.style.opacity = 1});
                }

            }else{
                if (image.children.length > 0) {

                    image.children.forEach(function(element){element.patch.DOM.style.opacity = defaultOpacity});
                }

            }


        };


            return exported;
        }
    );
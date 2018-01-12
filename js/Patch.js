/*wywołany z PatchBuilder tworzy objekty zdjęć (łatek)
 W TYM PLIKU ZNAJDUJE SIĘ JEDYNE ODNIESIENIE DO PLIKÓW JPG */

// w momencie jak patch dostaje swoje zrodlo pliku, automatycznie sie do niego odwoluje do serwera - bez funkcji request-get

define([], function () {


        var exported = function Patch(image,parent,data,i){

            //debugger; pokazuje jak idzie request w node po nadaniu adresu imgHTML.src

            var imgHTML= document.createElement('img');

            //poniżej dwie wersje - górna odnosi się do serwera na dysku - doln do serwera na amazonie
            //http://localhost...../data/test_arch
            //console.log(data.url);

            imgHTML.src=data.url+'/imgs/imgs['+i+']/'+image.id+'.jpg'; // !!! tu jest odniesienie do plików jpg (jedyne!!)
            //data to jest viewer exported.currentData.url

            // !!! .src  - oznacza automatyczny request GET,po wykonianiu linijki imgHTML.src=data.url+'/....  pojawia się get na serwerze node'a
            // AHA ... czyli w momencie jak patch dostaje swoje zrodlo pliku, automatycznie sie do niego odwoluje do serwera - bez funkcji request-get!
            //console.log(imgHTML.src); // =="http://52.30.81.203//data/test_arch/imgs/imgs[0]/0.jpg" (koncowka sie zmienia)


            this.DOM = imgHTML;   image.patch = this;   this.image = image;   image.parent = parent;
            //console.log(image);

            this.originalParent = i; // to jest pozycja w tablicy images w data.json, żeby było wiadomo w którym zdjęciu-matce ląduje dany Patch

            this.defaultOpacity = 0.25;   this.selectOpacity = 0.75;
            //console.log(image);
            
            document.body.appendChild(imgHTML);

            if (parent) {

                var parentDOM = parent.patch.DOM;

                var parentW = parent.absolutePos.w; // szerokosc (wraz z padding i border), analogicznie Height
                var parentH = parent.absolutePos.h;
                var parentT = parent.absolutePos.y; // position top srodka parenta ??
                var parentL = parent.absolutePos.x; // position left srodka parenta ??


                var imSizeW = parentW * image.pos.w;
                var imSizeH = parentW * image.pos.w * image.size.h / image.size.w;

                image.absolutePos = { //  tu sie tworzy image.absotlutePos dla obiektu, który ma parenta
                    y: parentT + parentH * (image.pos.y) * 0.5, // odleglosc od gory strony do strodka zdjecia
                    x: parentL + parentW * (image.pos.x) * 0.5,// odleglosc od lewej krawedzi strony do srodka zdjecia
                    w: imSizeW,
                    h: imSizeH
                };

                imgHTML.style.opacity = this.defaultOpacity; // jesli ma parenta to widac go słabiej (a f-kcja updateMyPosition zrobi tak):
                                                            // jeśli parent wykracza poza obraz windowWidth/heigth to wtedy jego children będzie mocniej widoczny

            } else {

                image.absolutePos = {//  tu sie tworzy image.absotlutePos dla obiektu, który jest parentem
                    y: window.innerWidth * 0.5 * image.size.h / image.size.w,  // srodek zdjęcia : y
                    x: window.innerWidth * (0.5 + 1.10 *i), // srodek zdjęcia: x // tutaj jest jedyne odniesienie do "original parent"
                        //UWAGA! dla ujemnych "i" też działa, wyrzuca zdjęcia bardziej w lewą stronę
                        // numeru parenta pierwotnego od tej liczby zależy w jakiej odległości będą parenty i tylko na jej podstawie można je identyfikować
                    w: window.innerWidth, //szerokość okna przegladarki www
                    h: window.innerWidth * image.size.h / image.size.w // wymiar zdjęcia y, w zasadzie 2*y , bo samo y to srodek zdjecia
                };
                

                imgHTML.style.opacity = 1; // jesli nie ma parenta to widac do mocno

            }

            //imgHTML.style.border = '1px dashed blue';
            imgHTML.style.border = '5px solid rgba(255, 255, 255, .2)';
            imgHTML.style.borderRadius = '5px';
            imgHTML.style.position = 'absolute';
            

        };

        exported.prototype.recalculateBack =function() {
            var image = this.image;
            
            //ODO: przeliczyc (z exported.prototype.move i exported.prototype.zoom)

            image.pos.x = 0;
            image.pos.y = 0;
            image.pos.w = 0;

            return;

        }; //TODO: #EDIT: przeliczyc (z exported.prototype.move i exported.prototype.zoom lub exported.prototype.updateMyPosition ?)

        exported.prototype.enableEditMode =function(pEditor){

            this.pEditor = pEditor;


            if(!this.image.parent){
                return;
            }


            var imgHTML = this.DOM;

            imgHTML.style.border = '2px solid rgba(255, 0, 0, 1)';

            var that = this;

            imgHTML.addEventListener('mousedown',function(e){
                if(e.altKey){

                    that.selectMe()
                }

            })
        };

        exported.prototype.deSelectMe =function(){

            var pEditor = this.pEditor;

            var imgHTML = this.DOM;

            imgHTML.style.border = '5px solid rgba(255, 255, 255, .2)';
            imgHTML.style.opacity = this.defaultOpacity;

            this.recalculateBack();

        };

        exported.prototype.selectMe =function(){

            var pEditor = this.pEditor;

            if(pEditor.selected){
                pEditor.selected.deSelectMe();
                pEditor.selected = null;
            }

            pEditor.selected = this;

            var imgHTML = this.DOM;

            imgHTML.style.border = '5px solid rgba(255, 0, 0, 1)';
            imgHTML.style.opacity = this.selectOpacity;

        };

        exported.prototype.move = function(dx,dy){
            var image = this.image;

            image.absolutePos.x +=dx;
            image.absolutePos.y +=dy;

        }

        exported.prototype.zoom = function(zoom){
            var image = this.image;

            image.absolutePos.h *=Math.pow(1+0.01,zoom);
            image.absolutePos.w *=Math.pow(1+0.01,zoom);


        }

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

            if(this.pEditor /*&& this.pEditor.selected==this*/){
                return;
            }else {


                if (image.absolutePos.w * camera.scale/*imgHTML.style.width ale BEZ PIKSELI*/ > window.innerWidth) {

                    // console.log(image);

                    if (image.children.length > 0) {

                        image.children.forEach(function (element) {
                            element.patch.DOM.style.opacity = 1
                        });
                    }

                } else {
                    if (image.children.length > 0) {

                        image.children.forEach(function (element) {
                            element.patch.DOM.style.opacity = defaultOpacity
                        });
                    }

                }
            }

        };


            return exported;
        }
    );
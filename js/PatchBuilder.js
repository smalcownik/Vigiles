define([], function () {

            var exported = {
                test : 2,
                images:[]
            };


            exported.placeImage = function(image,parent){

                var imgHTML =  image.DOM;

                if(parent){

                    var parentW = parent.absolutePos.w; // szerokosc (wraz z padding i border), analogicznie Height
                    var parentH = parent.absolutePos.h;
                    var parentT = parent.absolutePos.y; // position top
                    var parentL = parent.absolutePos.x; // position left


                    var imSizeW =parentW * image.pos.w;
                    var imSizeH =parentW * image.pos.w * image.size.h / image.size.w;

                    image.absolutePos = {
                        y:parentT+parentH*(image.pos.y)*0.5, // odleglosc od gory storny do strodka zdjecia
                        x:parentL+parentW*(image.pos.x)*0.5,// odleglosc od lewej krawedzi strony do strodka zdjecia
                        w:imSizeW,
                        h:imSizeH
                    };

                }else{
                    image.absolutePos = {
                        y:window.innerWidth * 0.5 * image.size.h / image.size.w,
                        x:window.innerWidth/2,
                        w:window.innerWidth,
                        h:window.innerWidth * image.size.h / image.size.w
                    };

                }

                image.updPosition = function(){

                    imgHTML.style.top=String( image.absolutePos.y-image.absolutePos.h*0.5)+'px';
                    imgHTML.style.left=String(image.absolutePos.x-image.absolutePos.w*0.5)+'px';
                    imgHTML.style.width=String(image.absolutePos.w)+'px';
                    imgHTML.style.height=String(image.absolutePos.h)+'px';

                };

                image.updPosition();

                imgHTML.style.border='1px dashed blue';
                imgHTML.style.position='absolute';

            };

            exported.buildImage = function(data,image,cb){

                var imgHTML= document.createElement('img');
                imgHTML.src=data.url+'/imgs/'+image.id+'.jpg';
                image.DOM = imgHTML;

                image.DOM.addEventListener('load',function(){
                    cb();
                });

                exported.images.push(image);

                document.body.appendChild(imgHTML);
            };

            exported.build = function(data){
                //debugger;
                data.traverse(
                    function(image,parent){
                        exported.buildImage(data,image,function(){
                        });
                        exported.placeImage(image,parent);
                    }
                );
            };


            return exported;
        }
    );
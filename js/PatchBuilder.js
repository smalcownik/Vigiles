define([], function () {

            var exported = {
                test : 2,
                images:[],

            };

            exported.placeImage = function(image,parent){

                var camera = this.viewer.camera;


                var imgHTML =  image.DOM; // referencja do DOM objektu

                //imgHTML.onload = function(){ //TODO: tu jestem, nie mogę odpalić tego addEventListenera ale teraz trzeba odblokować pointsBuildera (tz go wziać onloAD)

                //function place(){};

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
                        image.absolutePos = { //TODO: tu jestem, ogarniam co to absolutePos
                            y: window.innerWidth * 0.5 * image.size.h / image.size.w,  // srodek zdjęcia : y
                            x: window.innerWidth / 2, // srodek zdjęcia: x
                            w: window.innerWidth, //szerokość okna przegladarki www
                            h: window.innerWidth * image.size.h / image.size.w // wymiar zdjęcia y, w zasadzie 2*y
                        };

                    }



                    image.updPosition = function () {

                        imgHTML.style.top = String(image.absolutePos.y - image.absolutePos.h * 0.5) + 'px';
                        imgHTML.style.left = String(image.absolutePos.x - image.absolutePos.w * 0.5) + 'px';
                        imgHTML.style.width = String(image.absolutePos.w) + 'px';
                        imgHTML.style.height = String(image.absolutePos.h) + 'px';

                    };

                    image.updPosition();

                    imgHTML.style.border = '1px dashed blue';
                    imgHTML.style.position = 'absolute';


                    //TODO: tutaj napisać zblizanie i przesuwanie kamery (przeliczanie współrzędnych) na eventy (arrows i +/-);

                //console.log(exported.images);

                function move(direction){

                    if(direction == "left"){
                        exported.images.forEach(function(image){image.absolutePos.x -= camera.delta.x;});
                    }

                    else if(direction == "up"){
                        exported.images.forEach(function(image){image.absolutePos.y -= camera.delta.y});
                    }

                    else if(direction == "right"){
                        exported.images.forEach(function(image){image.absolutePos.x += camera.delta.x});
                    }

                    else if(direction == "down"){
                        exported.images.forEach(function(image){image.absolutePos.y += camera.delta.y});
                    }

                    exported.images.forEach(function(image){image.updPosition()});

                };


                function zoom(direction){ //TODO:
                    if(direction == "plus"){
                        //debugger;
                        console.log("plus");
                        exported.images.forEach(function(image){
                            image.absolutePos.w *= camera.zoom;
                            image.absolutePos.h *= camera.zoom;
                            image.absolutePos.x *= camera.zoom;
                            image.absolutePos.y *= camera.zoom;
                        });
                    }



                    else if (direction =="minus"){

                        console.log("minus");
                        exported.images.forEach(function(image){
                            image.absolutePos.w /= camera.zoom;
                            image.absolutePos.h /= camera.zoom;
                            image.absolutePos.x /= camera.zoom;
                            image.absolutePos.y /= camera.zoom;
                        });
                    };

                    exported.images.forEach(function(image){image.updPosition()});

                };






                imgHTML.addEventListener('load', function () {
                        document.onkeydown = function(e) {
                            switch (e.keyCode) {
                                case 37://left
                                    //alert('left');
                                    //console.log(exported.images);
                                    move("left");
                                    //exported.images.forEach(function(image){image.absolutePos.x -= camera.delta.x; image.updPosition()});// to działa
                                    //image.absolutePos.x += camera.delta.x; //TODO: tu nie ma sie odnosić do image - tylko jakos inaczej to nazwać zeby dotrzec do objektu
                                    //console.log(exported.images);
                                    break;
                                case 38://up
                                    //alert('up');
                                    move("up");
                                    //exported.images.forEach(function(image){image.absolutePos.y -= camera.delta.y});
                                    break;
                                case 39 ://right
                                    //alert('right');
                                    move("right");
                                    //exported.images.forEach(function(image){image.absolutePos.x += camera.delta.x});
                                    break;
                                case 40://down
                                    //alert('down');
                                    move("down");
                                    //exported.images.forEach(function(image){image.absolutePos.y += camera.delta.y});
                                    break;
                                case 189 ://minus
                                    //alert('minus');
                                    zoom("minus")
                                    break;
                                case 187://plus
                                    //alert('plus');
                                    zoom("plus")
                                    break;
                            }

                            //image.updPosition();
                        };

                    });

                };
           // };




            exported.buildImage = function(data,image,cb){

                var imgHTML= document.createElement('img');
                imgHTML.src=data.url+'/imgs/'+image.id+'.jpg';
                image.DOM = imgHTML;

                //console.log(image);



                image.DOM.addEventListener('load',function(){
                    //cb();
                });




                exported.images.push(image);

                document.body.appendChild(imgHTML);
            };

            exported.build = function(data){

                data.traverse( //TODO: a to traverse to z kąd - z MapData?? w jaki sposób tu jest odniesienie do map data - ahaaaa data:MapData
                    function(image,parent){
                        //debugger;
                        exported.buildImage(data,image/*,function(){console.log(" w buildImage callback")}*/ //image - to pochodzi z traverse->dig (MapData) , gdzie image jest na siłę wstawiony this.images[0]
                        );
                        exported.placeImage(image,parent); // parent - tak samo jak komentarz wyżej - pochodzi z f-kcji dig
                    }
                );
            };


            return exported;
        }
    );
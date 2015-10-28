define(['./MapData'], function (MapData) { //skorzystamy z funkcji MapData.dig do testowania wnetrza jsonow

         var exported ={};

        exported.ValidateData = function(data){

            console.log(data);
            this.DataMainTypeValidation(data);
            this.DataContentTypeValidation(data);

        };

            exported.TypeValidator = function (data,type){
                if(typeof(data)!==type){
                    throw Error('invalid data -'+data+'  is not "'+ type+'" type');
                }
                else {/*console.log('OK: '+data+'  is '+ type+' type')*/};

            };

            exported.ArrayValidator = function (data){
                if( typeof(data.length)=='number' && typeof(data)!=='string' ){/*console.log("OK jest arrayem");*/}
                else console.log("huj wie co to jest"+data+" ale nie array");

            };

            exported.DataSurfaceLayerObjectsValidation = function (data){ // sprawdza na siłę czy w katalogu głównym są 2 objekty i czy są to objekty "meta" i "imgs"
                var imgs = data.imgs;
                var meta = data.meta;

                this.ArrayValidator(data.imgs);


                if (Object.keys(data).length==2){
                    if(Object.keys(data)[0]=='meta' &&  Object.keys(data)[1]=='imgs'){/*console.log("ok:jest meta i imgs")*/}
                    else (console.log("NOT_OK:cos nie tak z meta i imgs"));
                }
                else (console.log("NOT_OK:ilosc plikow na wierzchu objektu sie nie zgadza (powinny byc dwa: main i imgs)"));

                if(Object.keys(meta).length==0){/*console.log("OK meta jest pustym objektem")*/}
                else {console.log("NOT_OK data.meta powinien byc a nie jest pustym objektem",Object.keys(meta).length)}

            };

            exported.ImagesContentValidation = function(data){


            };


        exported.DataMainTypeValidation = function(data){
            /*console.log('ok');*/
            this.TypeValidator(data,'object');

        };


        exported.DataContentTypeValidation = function(data){
            if(data.imgs && data.meta)
            {
                this.DataSurfaceLayerObjectsValidation(data);
                //this.ImagesContentValidation(data);
                //TODO: użyć dig(patrz dół pliku, z MapData) do opierdalania zawartości
            }
            else/*ma sprawdzić wnętrza wszystkich childrenów*/ {
                (console.log("NOT_OK: brak objektu data.imgs lub data.meta"));};

            };




        return exported;

    }
    );
//TODO: robić walidacje ino roz

/*exported.prototype.dig = function dig(image,visitFn,parent){
    debugger;
    visitFn(image,parent); // tu ma wykonać właściwą funckję visitFn(można ją sobie osobno jakkolwiek zdefiniować) na danym elemencie
    //debugger;
    image.children.forEach(
        function(childrenImage){

            this.dig(childrenImage,visitFn,image);
        }
        ,this);

};*/

define([/*'./MapData'*/], function (/*MapData*/) {

         var exported ={};

        exported.ValidateData = function(data){

            console.log(data);
            this.DataMainTypeValidation(data);
            this.DataContentTypeValidation(data,this.Digger);

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

            exported.ImageContentCheck = function(image,parent){

                if(parent){

                    if (Object.keys(image).length==5){
                        console.log(image+" has good keys length of 5")
                    }
                    else (console.log("NOT_OK:ilosc plikow sie nie zgadza"));

                    exported.TypeValidator(image.id,'string');console.log(" ok1");
                    exported.TypeValidator(image.size,'object');console.log(" ok2");
                    exported.TypeValidator(image.pos,'object');console.log(" ok3");
                    exported.ArrayValidator(image.points);console.log(" ok4");
                    exported.ArrayValidator(image.children);console.log(" ok5");
                }

                else{

                    if (Object.keys(image).length==4){
                        console.log(image+" has good keys length of 4")
                    }
                    else (console.log("NOT_OK:ilosc plikow sie nie zgadza)"));

                    exported.TypeValidator(image.id,'string');console.log(" ok1");
                    exported.TypeValidator(image.size,'object');console.log(" ok2");
                    //this.TypeValidator(data.pos,'object');console.log(" ok3");//ten tylko jesli jest parent ale mozna to zmienic GDY NIE MA PARENTA, NIE MA DATA.POS
                    exported.ArrayValidator(image.points);console.log(" ok4");
                    exported.ArrayValidator(image.children);console.log(" ok5");
                }



            };

             exported.Digger = function(image,visitFunction,parent){
             //debugger;
             visitFunction(image,parent); // tu ma wykonać właściwą funckję visitFn(można ją sobie osobno jakkolwiek zdefiniować) na danym elemencie
             //debugger;
             image.children.forEach(
             function(childrenImage){

             exported.Digger(childrenImage,visitFunction,image);
             }
             ,this);

             };


             exported.ImagesTreeContentValidation = function(data,digFunction){

             data.imgs.forEach(
             function(image){
             digFunction(image,this.ImageContentCheck,null)
             }
             ,this); //TODO:tu obadać tego thisa i wogóle f-kcja dig coś nie gra


             };




        exported.DataMainTypeValidation = function(data){
            /*console.log('ok');*/
            this.TypeValidator(data,'object');

        };


        exported.DataContentTypeValidation = function(data,digFunction){
            if(data.imgs && data.meta)
            {
                this.DataSurfaceLayerObjectsValidation(data);
                //this.ImageContentCheck(data.imgs[0].children[0],data.imgs[0]) //test- DZIAŁA DOBRZE;
                this.ImagesTreeContentValidation(data,digFunction);
            }

            else/*ma sprawdzić wnętrza wszystkich childrenów*/ {
                (console.log("NOT_OK: brak objektu data.imgs lub data.meta"));};

            };



        return exported;

    }
    );

 /**exported.prototype.dig = function dig(image,visitFn,parent){
 debugger;
 visitFn(image,parent); // tu ma wykonać właściwą funckję visitFn(można ją sobie osobno jakkolwiek zdefiniować) na danym elemencie
 //debugger;
 image.children.forEach(
 function(childrenImage){

 this.dig(childrenImage,visitFn,image);
 }
 ,this);

 };*/

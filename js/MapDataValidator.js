define([/*'./MapData'*/], function (/*MapData*/) {

         var exported ={};

        exported.ValidateData = function(data){
            /*console.log("W walidatorze data to:");
            console.log(data);*/
            this.DataMainTypeValidation(data);
            this.DataContentTypeValidation(data,this.Digger);

        };

            exported.TypeValidator = function (obj,type,propName){
                if(propName!==null)
                    {var data = obj[propName]}
                else
                    {var data = obj};


                if(typeof(data)!==type){
                    console.warn('invalid data: property "'+propName+'" of the object with id:'+obj.id+'  is not "'+ type+'" type');
                }
                else {/*console.log('OK: "'+propName+'"  is "'+ type+'" type')*/};

            };

            exported.ArrayValidator = function (obj,propName){
                var data = obj[propName];

                if( typeof(data.length)=='number' && typeof(data)!=='string' ){/*console.log("OK: '"+propName+"' o id:"+ obj.id+"  jest arrayem");*/}
                else console.log('invalid data:' +propName+" of image with id:" +obj.id+"  is not array");

            };

            exported.DataSurfaceLayerObjectsValidation = function (data){ // sprawdza na siłę czy w katalogu głównym są 2 objekty i czy są to objekty "meta" i "imgs"
                var imgs = data.imgs;
                var meta = data.meta;

               // this.ArrayValidator(data.imgs,dataName,dataId);


                if (Object.keys(data).length==2){
                    if(Object.keys(data)[0]=='meta' &&  Object.keys(data)[1]=='imgs'){/*console.log("ok:jest meta i imgs")*/}
                    else (console.log("NOT_OK:cos nie tak z meta i imgs"));
                }
                else (console.log("NOT_OK:ilosc plikow na wierzchu objektu sie nie zgadza (powinny byc dwa: main i imgs)"));

                if(Object.keys(meta).length==0){/*console.log("OK meta jest pustym objektem")*/}
                else {console.log("NOT_OK data.meta powinien byc a nie jest pustym objektem",Object.keys(meta).length)}

            };

            exported.ImageContentCheck = function(image,parent){ //

                if(parent){

                    if (Object.keys(image).length==5){
                        /*console.log("Object o id: "+image.id+" has good keys length of 5")*/
                    }
                    else (console.log("NOT_OK:ilosc keys objektu o id= "+image.id+" sie nie zgadza"));

                    [
                        ['id','string'],
                        ['size','object'],
                        ['pos','object']
                    ].forEach(function(arr){
                            exported.TypeValidator(image,arr[1],arr[0]);
                            /*console.log("5ok");*/
                        });

                    [
                        'points',
                        'children'
                    ].forEach(function(propName){
                            exported.ArrayValidator(image,propName);
                            /*console.log("5ok0");*/
                        });

                }

                else{

                    if (Object.keys(image).length==4){
                       /* console.log("Object o id: "+image.id+" has good keys length of 4")*/
                    }
                    else (console.log("NOT_OK:ilosc keys objektu o id= "+image.id+" sie nie zgadza"));

                    [
                        ['id','string'],
                        ['size','object']
                    ].forEach(function(arr){
                            exported.TypeValidator(image,arr[1],arr[0]);
                            /*console.log("4ok");*/
                        });

                    [
                        'points',
                        'children'
                    ].forEach(function(propName){
                            exported.ArrayValidator(image,propName);
                            /*console.log("4ok0");*/
                        });


                }



            };

             exported.Digger = function(image,visitFunction,parent){
             //debugger;
             visitFunction(image,parent); // tu ma wykonać właściwą funckję visitFn(można ją sobie osobno jakkolwiek zdefiniować) na danym elemencie
             //debugger;
             image.children.forEach(
             function(childrenImage){

             exported.Digger(childrenImage,visitFunction,image); //TODO:obadać: chciałbym dać this zamiast exported ale wtedy nie działa
             }
             ,this);

             };


             exported.ImagesTreeContentValidation = function(data,digFunction){


             data.imgs.forEach(
             function(image){
             digFunction(image,this.ImageContentCheck,null)
             }
             ,this); //TODO:obadać: tego thisa dla własnej satysfakcji


             };




        exported.DataMainTypeValidation = function(data){
            /*console.log('ok');*/
            this.TypeValidator(data,'object',null);

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

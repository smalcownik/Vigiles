define(['./MapData'], function (MapData) { //

         var exported ={};

        exported.ValidateData = function(data){

            console.log(data);
            exported.DataMainTypeValidation(data);
            exported.DataTypeValidation(data);
            //exported.TypeValidator(data,"string");
           // exported.ArrayValidator(data);
            //exported.ArrayValidator(data.imgs);
            //exported.ArrayValidator(data.imgs[0]);

        };

            exported.TypeValidator = function (data,type){
                if(typeof(data)!==type){
                    throw Error('invalid data -'+data+'  is not "'+ type+'" type');
                }
                else console.log('OK: '+data+'  is '+ type+' type');

            };

            exported.ArrayValidator = function (data){
                if( typeof(data.length)=='number' && typeof(data)!=='string' ){console.log("OK jest arrayem");}
                else console.log("huj wie co to jest"+data+" ale nie array");

            };

        exported.DataMainTypeValidation = function(data){
            console.log('ok');
            exported.TypeValidator(data,'object');

        };


        exported.DataTypeValidation = function(data){
            if(data.imgs)
            {
            var imgs = data.imgs;
                if( imgs.length!==-1 && typeof(imgs)!=='string' ){/*console.log("OK jest arrayem")*/}
                    else console.log("huj wie co to jest ale nie array");
                if (Object.keys(data).length==2){
                    if(Object.keys(data)[0]=='meta' &&  Object.keys(data)[1]=='imgs'){console.log("alles gute2")}
                    else (console.log("cos nie funguje2"));
                }
                else (console.log("cos nie funguje"));

            }

            else {};


            };



        return exported;

    }
    );
//TODO: robić walidacje ino roz

/*exported.prototype.dig = function dig(image,visitFn,parent){
    debugger;
    visitFn(image,parent);
    //debugger;
    image.children.forEach(
        function(childrenImage){

            this.dig(childrenImage,visitFn,image);
        }
        ,this);

};*/

/*
if(typeof(url)!=='string'){
    throw Error('invalid url');
}

if(url.match(/\.json/)){
    throw Error('invalid url');
    // url powinine byc adresem katalogu w ktorym jest archiwum mapy
}*/

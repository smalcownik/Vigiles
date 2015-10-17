define([], function () { //tworzy objekty dodawanych punktów razem z właściowściami DOM

            var exported = {
                test : 2
            };

        exported.buildPoint = function(data,image,point,i) {
            var divPoint= document.createElement('div');
            //divPoint.innerHTML = image.id +"."+i;
            document.body.appendChild(divPoint);
            point.DOM = divPoint;

           point.absolutePos = {
                x:image.absolutePos.x+image.absolutePos.w*point.x*0.5,
                y:image.absolutePos.y+image.absolutePos.h*point.y*0.5
            };



            divPoint.style.top=point.absolutePos.y+'px';
            divPoint.style.left= point.absolutePos.x+'px';
            divPoint.style.position = 'absolute';
            divPoint.style.zIndex = '1000';
            divPoint.style.height = '6px';
            divPoint.style.width = '6px';
            divPoint.style.backgroundColor = '#000000';
            divPoint.style.borderColor = '#ffffff';
            divPoint.style.borderRadius = '50%';
            divPoint.style.borderWidth = '3px';
            divPoint.style.borderStyle = 'solid';


        };

        exported.buildPoints = function(data,image,cb){
            image.points.forEach(function(point,i){
                exported.buildPoint(data,image,point,i);
            })
        };

        exported.build = function(data){
            data.traverse(
                function(image,parent){
                    exported.buildPoints(data,image);
                }
            );
        };
            return exported;
        }
    );
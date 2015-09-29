var Browser = {
    data:null,
    actualRoot:null,
    rootWidth:512
};

Browser.showPackage = function(data){
    this.data = data;
    this.actualRoot = data.imgs[0];
    this.showImgsTree(this.actualRoot);
    this.showPoints(this.actualRoot);
    //this.getDescendants(this.actualRoot);

};


Browser.getDescendants = function(node){ // f-kcja odczytuje nody wg hierarchii, szukaj�c ich wg��b hierarchia ustalona w pliku json

    var all = [];

    function collectChildren(n){

        all.push(n);

        for (var i = 0; i < n.children.length; i++) {
            collectChildren(n.children[i]);

        }


    }

    collectChildren(node);

    return all;
    console.log(all);

};

Browser.buildImgHtml = function(node){

    var imgHTML = document.createElement('img');
    imgHTML.src=this.data.url+'/imgs/'+node.id+'.jpg'; // data.url to jest "data/arch1" z wywolania loadPckage
                // z pliku main.js - jest to sciezka do folderu

    if(node.pos){

    }

    document.body.appendChild(imgHTML);
}; // to chyba niebyle bo f-kcja "showImgstree" to zastapila

Browser.showDescendants = function(node){

    var toShow = this.getDescendants(node);

    for (var i = 0; i < toShow.length; i++) {
        this.buildImgHtml(toShow[i]);
    }

};


Browser.showImgsTree = function(node){ // ta rozgryzc bo to jest f-kcja wywolana z showPackage // node = this.actualRoot = data.imgs[0];

    function buildNode(n,parent){


        var imgHTML= document.createElement('img');


        imgHTML.src=this.data.url+'/imgs/'+n.id+'.jpg';


        var that = this;


        imgHTML.onload = function(){


            (function(){
                if(parent){


                    var parentW = parent.DOM.offsetWidth; // szerokosc (wraz z padding i border), analogicznie Height
                    var parentH = parent.DOM.height*(parentW/parent.DOM.width);
                    var parentT = parent.DOM.offsetTop; // position top
                    var parentL = parent.DOM.offsetLeft; // position left

                    console.log(parentW,parent.DOM.src);

                    var imgW = (parent.DOM.offsetWidth * n.pos.w);
                    var imgH = imgHTML.height*(imgW/imgHTML.width);

                    imgHTML.style.width=String(imgW)+'px';


                    imgHTML.style.top=String(parentT+parentH*(n.pos.y+1)*0.5-imgH*0.5)+'px';
                    imgHTML.style.left=String(parentL+parentW*(n.pos.x+1)*0.5-imgW*0.5)+'px';


                }else{
                    imgHTML.style.width=String(this.rootWidth)+'px';
                    imgHTML.style.top='0px';
                    imgHTML.style.left='0px';

                }

                imgHTML.style.border='1px dashed blue';
                imgHTML.style.position='absolute';

                n.DOM = imgHTML;



                imgHTML.addEventListener('mouseover',function(){ // TUTAJ JESTEM TUTAJ DOPISAC EVENT Z PUNKTAMI NA HOVER
                    for(var i =0; i< n.points.length;i++){
                    n.points[i].DOM.style.background = 'black';
                        n.points[i].DOM.style.color = 'white';
                        n.points[i].DOM.style.opacity = 0.8;}
                });
                imgHTML.addEventListener('mouseout',function(){ // TUTAJ JESTEM TUTAJ DOPISAC EVENT Z PUNKTAMI NA HOVER
                    for(var i =0; i< n.points.length;i++){
                        n.points[i].DOM.style.background = 'yellow';
                        n.points[i].DOM.style.color = 'darkblue';
                        n.points[i].DOM.style.opacity = 0.1;}
                });


                imgHTML.addEventListener('dblclick',function(e){ //działa !
                    //debugger;
                        var divPoint= document.createElement('div');
                        n.points[n.points.length]={x:e.clientX,y:e.clientY};
                        divPoint.innerHTML = n.id +"."+n.points.length;

                        n.points[n.points.length-1].DOM = divPoint;

                        divPoint.style.top=n.points[n.points.length-1].y+'px';
                        divPoint.style.left= n.points[n.points.length-1].x+'px';
                        document.body.appendChild(divPoint);
                    });



                document.body.appendChild(imgHTML);


                for (var i = 0; i < n.children.length; i++) {
                    buildNode.call(this,n.children[i],n);


                }
        }).call(that);
        }

    }

    buildNode.call(this,node);

};


Browser.showPoints = function(node){ // ta rozgryzc bo to jest f-kcja wywolana z showPackage // node =this.actualRoot = data.imgs[0];

    function insertPoint(n,parent){

        var that = this;

        (function(){

                if(parent){

                    for (var i = 0; i< n.points.length;i++){
                        var divPoint= document.createElement('div');
                        divPoint.innerHTML = n.id +"."+i;
                        document.body.appendChild(divPoint);
                        n.points[i].DOM = divPoint;
                        divPoint.style.top=n.points[i].x+'px';
                        divPoint.style.left=n.points[i].y+'px';

                        console.log("jest dodany div z parentem");
                        console.log(n.points[i].DOM);
                        console.log(n.DOM)

                    }

                }else{

                    for (var i = 0; i< n.points.length;i++){
                        var divPoint = document.createElement('div');
                        divPoint.innerHTML = n.id+"."+i;
                        document.body.appendChild(divPoint);
                        n.points[i].DOM = divPoint;
                        divPoint.style.top=n.points[i].x+'px';
                        divPoint.style.left=n.points[i].y+'px';


                        console.log("jest dodany div bez parenta");
                        console.log(n.points[i].DOM);

                        console.log(n.DOM)
                    }

                }

                for (var i = 0; i < n.children.length; i++) { // tu jest wszystko zle bo trzeba tak zrobic zeby kazdy points
                                                                // byl jako div a nie kazdy children
                    insertPoint.call(this,n.children[i],n);

                }
        }).call(that);



    }

    insertPoint.call(this,node);


    function hoverPoint(n,parent){  // n poczatkowy to data.imgs[0]

        var that = this;

        (function(){


                for (var i = 0; i< n.points.length;i++){
                    console.log(n.points[i].DOM);


                }
            console.log(n.DOM)

            for (var i = 0; i < n.children.length; i++) {
                hoverPoint.call(this,n.children[i],n);

            }
        }).call(that);

    }

    hoverPoint.call(this,node);


    /*function pointsOnHover(idArray){

        for(var i=0; i<idArray.length;i++){

            for(var j=0; j<document.getElementsByClassName(idArray[i]).length; j++){

                document.getElementsByClassName(idArray[i])[j].innerHTML+="!"; // juz "inner html dziala na kazdym divie"
                //document.getElementsByClassName(idArray[i])[j].addEventListener(""); // juz "inner html dziala na kazdym divie"

            }

        }
    }*/


};

//console.log(Browser.pointsClassHolder); // to cholera nie dziala - tablica sie nie zapenila nie wiedziec czemu


var Browser = {
    data:null,
    actualRoot:null,
    rootWidth:512,
    pointsClassHolder:[],
    imgsClassHolder:[]
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

    var imgClass = this.imgsClassHolder;

    function buildNode(n,parent){


        var imgHTML= document.createElement('img');


        imgHTML.src=this.data.url+'/imgs/'+n.id+'.jpg';


        var that = this;
        imgHTML.onload = function(){

           // debugger;

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




                document.body.appendChild(imgHTML);
               /* imgHTML.className= "obraz"+ n.id;
                imgClass.push(imgHTML.className)*/;


                for (var i = 0; i < n.children.length; i++) {
                    buildNode.call(this,n.children[i],n);


                }
        }).call(that);
        }

    }

    buildNode.call(this,node);

   // console.log(imgClass);


};


Browser.showPoints = function(node){ // ta rozgryzc bo to jest f-kcja wywolana z showPackage // node =this.actualRoot = data.imgs[0];

    var pointClass = this.pointsClassHolder;

    //var divPoint = document.createElement('div');
    //debugger;
    function insertPoint(n,parent){  // n poczatkowy to data.imgs[0]

        //var divPoint = document.createElement('div');

        var that = this;

        (function(){



                if(parent){

                    for (var j = 0; j< n.points.length;j++){
                        var divPoint= document.createElement('div');
                        divPoint.innerHTML = n.id +"."+j;
                        document.body.appendChild(divPoint);
                        divPoint.className= "point"+ n.id;

                        //console.log(divPoint.className);

                        console.log("jest dodany div z parentem");
                    }
                    pointClass.push(divPoint.className);

                }
                else{

                    for (var j = 0; j< n.points.length;j++){
                        var divPoint = document.createElement('div');
                        divPoint.innerHTML = n.id+"."+j;
                        document.body.appendChild(divPoint);
                        divPoint.className= "point"+ n.id;


                        console.log("jest dodany div bez parenta");
                    }
                    pointClass.push(divPoint.className);

                }

                for (var i = 0; i < n.children.length; i++) { // tu jest wszystko zle bo trzeba tak zrobic zeby kazdy points
                                                                // byl jako div a nie kazdy children
                    insertPoint.call(this,n.children[i],n);

                }
        }).call(that)

    }

    insertPoint.call(this,node);

   // document.getElementsByClassName(ids[2])[0].innerHTML+="!";


    console.log(pointClass);
    console.log(Browser.pointsClassHolder); // tu kanalia dziala a trzy linijki nizej (poza funkcja) NIET

    function pointsOnHover(idArray){

        for(var i=0; i<idArray.length;i++){

            for(var j=0; j<document.getElementsByClassName(idArray[i]).length; j++){

                document.getElementsByClassName(idArray[i])[j].innerHTML+="!"; // juz "inner html dziala na kazdym divie"
                //document.getElementsByClassName(idArray[i])[j].addEventListener(""); // juz "inner html dziala na kazdym divie"

            }

        }
    }

    pointsOnHover(pointClass);

};

//console.log(Browser.pointsClassHolder); // to cholera nie dziala - tablica sie nie zapenila nie wiedziec czemu


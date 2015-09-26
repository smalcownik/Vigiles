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
    //console.log(all);

};

Browser.buildImgHtml = function(node){

    var imgHTML = document.createElement('img');
    imgHTML.src=this.data.url+'/imgs/'+node.id+'.jpg'; // data.url to jest "data/arch1" z wywolania loadPckage
                // z pliku main.js - jest to sciezka do folderu

    if(node.pos){

    }

    document.body.appendChild(imgHTML);
};

Browser.showDescendants = function(node){

    var toShow = this.getDescendants(node);

    for (var i = 0; i < toShow.length; i++) {
        this.buildImgHtml(toShow[i]);
    }

};


Browser.showImgsTree = function(node){ // ta rozgryzc bo to jest f-kcja wywolana z showPackage // node = data.imgs[0];



    function buildNode(n,parent){


        var imgHTML = document.createElement('img');
        console.log('stworzony img');

        imgHTML.src=this.data.url+'/imgs/'+n.id+'.jpg';
        console.log('nadany src');



        var that = this;
        imgHTML.onload = function(){
            (function(){
                if(parent){

                    console.log('wykonalo sie onload');


                    var parentW = parent.DOM.offsetWidth;
                    var parentH = parent.DOM.height*(parentW/parent.DOM.width);
                    var parentT = parent.DOM.offsetTop;
                    var parentL = parent.DOM.offsetLeft;

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


                for (var i = 0; i < n.children.length; i++) {
                    buildNode.call(this,n.children[i],n);

                }
        }).call(that);
        }

    }

    buildNode.call(this,node);
    console.log()


};



Browser.showPoints = function(node){ // ta rozgryzc bo to jest f-kcja wywolana z showPackage // node = data.imgs[0];

    function insertPoint(n,parent){


        var divPoint = document.createElement('div');
        console.log("jest div");

        var that = this;

        (function(){

                console.log("jest onload");

                if(parent){

                    console.log('jest parent');


                }else{

                    console.log('nie ma parenta');

                }

                document.body.appendChild(divPoint);
                //document.body.appendChild(imgHTML);


                for (var i = 0; i < n.children.length; i++) { // tu jest wszystko zle bo trzeba tak zrobic zeby kazdy points
                                                                // byl jako dov a nie children
                    insertPoint.call(this,n.children[i],n);

                }
        }).call(that)

    }

    insertPoint.call(this,node);


};

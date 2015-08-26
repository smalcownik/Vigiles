var Browser = {
    data:null,
    actualRoot:null,
    rootWidth:512
};

Browser.showPackage = function(data){
    this.data = data;
    this.actualRoot = data.imgs[0];
    this.showImgsTree(this.actualRoot);
};


Browser.getDescendants = function(node){

    var all = [];

    function collectChildren(n){

        all.push(n);

        for (var i = 0; i < n.children.length; i++) {
            collectChildren(n.children[i]);

        }


    }

    collectChildren(node);

    return all;

};

Browser.buildImgHtml = function(node){

    var imgHTML = document.createElement('img');
    imgHTML.src=this.data.url+'/imgs/'+node.id+'.jpg';

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

Browser.showImgsTree = function(node){



    function buildNode(n,parent){



        var imgHTML = document.createElement('img');
        imgHTML.src=this.data.url+'/imgs/'+n.id+'.jpg';

        var that = this;
        imgHTML.onload = function(){
            (function(){
                if(parent){

                    var parentW = parent.DOM.offsetWidth;
                    var parentH = parent.DOM.height*(parentW/parent.DOM.width)
                    var parentT = parent.DOM.offsetTop;
                    var parentL = parent.DOM.offsetLeft;

                    console.log(parentW,parent.DOM.src)

                    var imgW = (parent.DOM.offsetWidth * n.pos.w);
                    var imgH = imgHTML.height*(imgW/imgHTML.width)

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

};
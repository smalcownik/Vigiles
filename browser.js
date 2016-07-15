Browser.getDescendants = function(node){ // potrzebne do podmiany zdjęć (gdzie trzeba podmienic wszystkich potomkow)

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

Browser.showDescendants = function(node){

    var toShow = this.getDescendants(node);

    for (var i = 0; i < toShow.length; i++) {
        this.buildImgHtml(toShow[i]);
    }
};

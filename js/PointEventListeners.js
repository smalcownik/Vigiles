define(['./Camera'], function (Camera) {

    var exported = {};

    exported.addPoint = function() {

        var viewer = this.viewer; // jest widoczny jako objekt dopiero gdy wstrzyknąłem viewera przed wykonaniem F-KCJI: registerEventListeners()

        console.log(viewer);

        document.body.addEventListener('keydown', function (e) {  // event dla camery/obrazków

//TODO: zastanowić się jak zmienić punkt tak, żeby go dodac do jSONa, (po dodaniu trzeba będzie odswieżyć f-kcję MapDataProvider.loadData, bo tam jest ładowany json)
           // viewer.updateAllPositionables();

        });
    }

    return exported;

});
/**
 * Created by marek on 16.06.16.
 */
/*funkcja zbiera dane do nowego patcha przy pomocy prompta i uruchamia AdditionalPatchBuilder, 
//który zajmuje się 1.wywołaniem nowego patcha (additionalPatch) oraz przesylaniem Patcha dalej (JsonBuilder)*/
define(['./AdditionalPatchBuilder'], function (AdditionalPatchBuilder) {

    var exported = {};

    exported.addNewPatch = function () { // f-kcja wywoływana w Viewer.registerEventListeners
        //var viewer = this.viewer;
        // console.log(viewer.positionable);

        this.addNewPatchButton();
        this.addNewPatchEventListener();

    };
    
    exported.addNewPatchButton = function () {}; // dodaje przycisk i nadaje mu klasę, że jak wciśniesz to wywołujesz exported.addNewPatchEventListener

    exported.addNewPatchEventListener = function () { // co po wciśnięciu przycisku (wyskakuje cały prompt)

        document.body.addEventListener('click', this.newPatchDataReceiverBuilder());
    }

    exported.newPatchDataReceiver;

    exported.newPatchDataReceiverBuilder = function(){

        exported.newPatchDataReceiver = prompt("file_path , parentID_nr, pos{x,y,w}, size{w,h}");
    };

    
    //w tego prompta bym wklejał dane w postaci JSON'a i zrobić z niego objekt i z niego już korzystać hehe :)
    //TODO: dodać nowe dane jednak do jsona budowanego z viewera żeby map data brał z nowego jsona
    
    // ma dodawać od razu zdjęcie do folderu imgs tylko opcja save( nie save point tylko savePatch) ma wykonać aktualizację
    
     if (exported.newPatchDataReceiver != null) {
         
     AdditionalPatchBuilder.buildPatch(exported.newPatchDataReceiver);
         
    };
    
    return exported;

});


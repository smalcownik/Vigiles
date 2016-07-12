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
    
     if (exported.newPatchDataReceiver != null) {
         
     AdditionalPatchBuilder.buildPatch(exported.newPatchDataReceiver);
         
    };
    
    return exported;

});

//TODO: ten plik i AdditionalPatchBuilder i AdditionalPatch zrobić

/*
 (budowanie JSONA i dodawanie zdjęcia do folderu na podtstawie pliku i kilku danych o lokalizacji zdjęcia):

 1. przycisk, po kliknięciu którego włączy się request (z pliku, który będzie wysyłał request) POST,
 wysyłający paczkę danych wraz ze zdjęciem

 a.) kliknięcie powoduje wyskoczenie prompta z  : danymi i opcją wgrania pliku (adres zdjęcia,
 ID rodzica, pozycja, wymiary, punkty)


 b.) zatwierdzneie spowoduje:

 I. zapisanie przez JsonBuilder json'a z nowym Patchem
 i. buduje Patch (patrz ii.)
 ii. dodaje go w positionables //viewer.positionable.push(new Patch(image,parent,data,i))
 II. aktualizacja w przeglądarce // updateMyPosition lub update all positionables (nie mialem czasu tego rozstrzygnąć)
 III. - zdjęcie jest użyte ale nie jest zapisywane w archiwum - do tego trzeba kliknać save

 c.) kliknięcie save spowoduje:

 I. wysłanie przez UpdateOnServer nowej paczki danych (także ze zdjęciem)
 II.zadbać (poprzez serwer node'a) żeby nowy plik img zapisał się automatycznie w archiwum
 plików
 III. pamiętać, że dodanie pliku nie spowoduje dodanie do w archiwum w laptopie więc
 trzeba będzie aktualizować lokalną wersję przez git'a

 */

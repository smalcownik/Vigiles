/**
 * Created by marek on 16.06.16.
 */
define([], function () {

    var exported = {};
    

    exported.newImageData = prompt("file_path , parentID_nr, pos{x,y,w}, size{w,h}"); //koncowka sciezki file_path jest jednoczesnie nr_ID

    exported.xxxxx = function () { // f-kcja wywołana w JsonBuilder.updateJson





    };


    return exported;

});

//TODO: zaplanować tę funkcjonalność

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

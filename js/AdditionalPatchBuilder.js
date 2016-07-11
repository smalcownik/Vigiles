/**
 * Created by marek on 30.06.16.
 */
/*
* 1. jest wywołany z ImageDataAdding (stamtąd dostaje dane)
* 2. wywołuje AdditionalPatch i buduje nowego patcha
* 3. musi korzystając z funkcji JsonBuilder wywołać JsonBuilder.buildPatchesTress (dodając tego patcha w dopracowanej formie)
* 4. uruchomić UpdateJsonOnServer stymże dodatkowo ma on przesyłać plik img i ten plik ma być odpowiednio nazwany i dodany tam do data/test_arch/imgs/imgs[originalParent]
* */

define(["./AdditionalPatch"], function (AdditionalPatch) {

        var exported = {


        };
    
        exported.buildPatch = function(data){ // data to new MapData(response//jsonString//) czyli objekt MapData, ale z data jest potrzebny tylko data.url przy budowaniu patcha,
        // wiec do innych potrzeb można w data dawać jakikolwiek "objekt", którego "objekt.url" zwraca url do folderu, w którym jest
        // plik img, czyli wystarczy jeśli data to będzie "http://52.30.81.203/" czyli ?requestheaders.host

        var viewer = this.viewer;

                    viewer.positionable.push(new AdditionalPatch(data))

        };

        return exported;
    }
);
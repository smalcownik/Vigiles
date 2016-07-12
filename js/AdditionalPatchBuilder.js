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
    
        exported.buildPatch = function(data){ 

        var viewer = this.viewer;

                    viewer.positionable.push(new AdditionalPatch(data))

        };

        return exported;
    }
);

//TODO: ten plik chyba zniknie
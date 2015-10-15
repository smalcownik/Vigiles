define([], function () {

            var exported = {
                test : 2
            };

            exported.build = function(data){
                data.traverse(function(image){

                });
            };


            return exported;
        }
    );
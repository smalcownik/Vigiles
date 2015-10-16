define([], function () {

            var exported = {
                test : 2
            };

            exported.build = function(data){
                data.traverse(
                    function(image){
                        console.log('visted!',image);
                    }
                );
            };


            return exported;
        }
    );
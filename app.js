requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {

    }
});

// Start the main app logic.
requirejs([
        "Viewer"
    ],

    function(Viewer) {

        Viewer.initializeViewer();

        //Viewer.loadURL('data/test_arch'); // możnaby od razu dodać '/data1.json', ale jest w MapDataProvider to zrobione dla ogólności
        //Viewer.loadURL('data/test_arch'); // do servera z amazona (plik:   )
        Viewer.loadURL('http://52.30.81.203/'); // do servera z amazona (plik JSON oddany przez node'a  )
    });

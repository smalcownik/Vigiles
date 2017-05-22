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
        //var serverURL = 'http://81.163.204.78:4235'; // to przenioslem do Viewer.serverURL //TODO: tutuaj zmienić prewencyjnie, pfofilaktycznie, kontrolnie na p00.pl
        Viewer.loadURL(Viewer.serverURL); // do servera z amazona (plik JSON oddany przez node'a  )
    });

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
        
        Viewer.loadURL(Viewer.serverURL,Viewer.DataPath, Viewer.JsonFile); // do servera z amazona (plik JSON oddany przez node'a  )
        //Viewer.serverURL:'http://192.168.55.102:4246'
        
        //TODO: tutaj dolozyc zmienna - url serwera node do pracy na plikach
    });

// -----JS CODE-----
// Enable the 'Image Tracking' template in Lens Studio
//@input Component.Text currentHealthP1;
////@input Component.Text maxHealthP1;
//@input Component.MarkerTrackingComponent snapchatMarker;
//@input bool currentlyTracked = false;


script.currentlyTracked = false;

// Reference to the image tracker
//var imageTracker = Scene.root.find('SnapchatMarker-MonsterTest');
var markerTracking = script.getSceneObject().getComponent("Component.MarkerTrackingComponent");
//var textObject = script.getSceneObject().getChild().0;
// Subscribe to the image tracker's onObjectTracked event
if (markerTracking) {
        
    
    if (markerTracking.isTracking())
    {
        print("yes");
        //Dialog("yes");
        //currentHealthP1.text = "500"; 
        //textObject = "500";
        script.currentlyTracked = true;
        print("currentlyTracked: " + script.currentlyTracked);
        script.currentHealthP1.text = '500';
        script.maxHealthP1.text = '500';
    } 
    else
    {
        print("no");
        script.currentHealthP1 = '0'; 
        script.maxHealthP1 = '0';
        script.currentlyTracked = false;

       // currentHealthP1.text = '0'; 
       // maxHealthP1.text = '0';
    }
} else {
    print("image not found");
}    



markerTracking.onMarkerLost = function() {
    print("Marker Lost");
}

markerTracking.onMarkerFound = function() {
    print("Marker found!");
}
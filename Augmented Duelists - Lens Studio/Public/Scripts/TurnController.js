// -----JS CODE-----
//@input Component.Text P1;
//@input Component.Text P2;

//@input Component.MarkerTrackingComponent Sporus;
//@input Component.MarkerTrackingComponent SnapchatMarker-MonsterTest;


//@input Component.ScriptComponent imageTracking;
//@input SceneObject[] markerContainer;

var turnCounter = true;


//var markerSet = ["Sporus", "SnapchatMarker-MonsterTest"];
//"SpikeShell", "Attack1", "Attack2", "Attack3", "Swap",

var imageTrackingcurrentlyTracked = script.imageTracking.currentlyTracked;
print("TurnController(): currentlyTracked: " + imageTrackingcurrentlyTracked);

if (imageTrackingcurrentlyTracked)
{
    if (turnCounter) {  
        //P1        
        turnCounter = false;
        script.P1.enabled = true;
        script.P2.enabled = false;
    } else {
        //P2
    
        //turnCounter = true;
        script.P1.enabled = false;
        script.P2.enabled = true;    
    }

}

/*
function checkTrackedMarker() {
    for (var i = 0; i < script.markerContainer.length; i++)
    {
        //script.getSceneObject().getComponent("Component.MarkerTrackingComponent")
        var markerTracker = script.markerContainer[i].getComponent("Component.MarkerTrackingComponent");     
        if (markerTracker.isTracking())
        {
           print("Tracking " + script.markerContainer[i]);
           actionSearch = false;           
            
            return;
        }
    }
    print("No marker tracked");
}
*/



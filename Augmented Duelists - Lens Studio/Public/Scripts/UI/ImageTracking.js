// -----JS CODE-----
// Enable the 'Image Tracking' template in Lens Studio
//@input Component.Text currentHealthP1;
//@input Component.Text maxHealthP1;
//@input Component.Text currentHealthP2;
//@input Component.Text maxHealthP2;

//@input Component.MarkerTrackingComponent snapchatMarker;
//@input bool currentlyTracked = false;
//@input bool isMonster;
//@input bool isAttack;
//@input Component.Text P1;
//@input Component.Text P2;


script.currentlyTracked = true;
//script.P2.enabled = false;

// Reference to the image tracker
//var imageTracker = Scene.root.find('SnapchatMarker-MonsterTest');
var markerTracking = script.getSceneObject().getComponent("Component.MarkerTrackingComponent");
//var textObject = script.getSceneObject().getChild().0;

var turnCounter = 0;
print(turnCounter);
if (turnCounter % 2) {
    script.P1.enabled = true;
    script.P2.enabled = false;
} else {
    script.P1.enabled = false;
    script.P2.enabled = true;
}

//Load Monster
//[TODO: Replace with specific value of monster and currentStoredHealth]
if (script.isMonster)
{
    if (turnCounter % 2) {
        //Player 2's Turn
        script.currentHealthP2.text = '500';
        script.maxHealthP2.text = '500';
    } else {
        //Player 1's Turn
        script.currentHealthP1.text = '500';
        script.maxHealthP1.text = '500';
    }
}

// Subscribe to the image tracker's onObjectTracked event
if (markerTracking) {
        
    
    if (markerTracking.isTracking())
    {
        //sprint("yes");
        //Dialog("yes");
        //currentHealthP1.text = "500"; 
        //textObject = "500";
        //script.currentlyTracked = true;
        //print("currentlyTracked: " + script.currentlyTracked);
        //script.currentHealthP1.text = '500';
        //script.maxHealthP1.text = '500';
    } 
    else
    {
        //print("no");
       // script.currentHealthP1 = '0'; 
        //script.maxHealthP1 = '0';
        //script.currentlyTracked = false;

       // currentHealthP1.text = '0'; 
       // maxHealthP1.text = '0';
    }
} else {
    print("image not found");
}    



markerTracking.onMarkerLost = function() {
    print("Marker Lost");
    //print(script.currentlyTracked);
    
        script.currentlyTracked = false;
        //script.P1.enabled = true;
        //script.P2.enabled = false;    
       // print("Value: " + script.P2.enabled);

    
}

markerTracking.onMarkerFound = function() {
    //print("Marker Found!");
    turnCounter += 1;
    script.currentlyTracked = true;
    //script.P1.enabled = false;
    //script.P2.enabled = true;
    //print("Value: " + script.P2.enabled);
        
    
    
}
// -----JS CODE-----

//@input Component.Script GM;
//@input int CardValue;
//@input Component.MarkerTrackingComponent CardMarker;

//@input int ScanValue = 0;
//@input bool CardFound = true;
//the value that increases
//var ScanValue = 0;

//@input bool IsMonster = false;

////updates every frame when it is found


if (script.CardFound == true) {
    script.ScanValue += getDeltaTime();
    print(script.ScanValue);

    if (script.ScanValue >= 3) {
        script.CardFound = false;
        script.ScanValue = 0;
        if (script.IsMonster) {
            script.GM.api.SelectMonster(script.CardValue);
        }
        else {
            script.GM.api.SelectMove(script.CardValue);
        }
    }
}



script.CardMarker.onMarkerLost = function () {
    print("Marker Lost");
    //print(script.currentlyTracked);
    script.ScanValue = 0;
    script.CardFound = false;
    //script.P1.enabled = true;
    //script.P2.enabled = false;    
    // print("Value: " + script.P2.enabled);


}

script.CardMarker.onMarkerFound = function () {
    print("Marked found");
    script.CardFound = true;
    //ScanValue = 0;
}
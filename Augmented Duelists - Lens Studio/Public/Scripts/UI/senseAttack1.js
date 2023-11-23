// -----JS CODE-----
var attack1 = script.getSceneObject().getComponent("Component.MarkerTrackingComponent");


if (attack1) {
    
    if (attack1.isTracking())
    {
    print("Queue attack 1");
        //currentHealthP1.text = "500"; 
        //textObject = "500";
    } else {
    //        print("no");
       // currentHealthP1.text = '0'; 
       // maxHealthP1.text = '0';
    }
} else {
    print("image not found");
}    
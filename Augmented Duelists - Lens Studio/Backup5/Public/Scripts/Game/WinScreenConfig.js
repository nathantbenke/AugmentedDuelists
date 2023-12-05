// -----JS CODE-----

//@input SceneObject WinScreen;
//@input Component.Text Player1;
//@input Component.Text Player2;

//@input Component.ScriptComponent P1Script;
//@input Component.ScriptComponent P2Script;

var monstersLeftP1 = script.P1Script.api.GetDeadMonsters();
var monstersLeftP2 = script.P2Script.api.GetDeadMonsters();


if (script.monstersLeftP1 < 3 && script.monstersLeftP2 < 3)
{
    script.WinScreen.enabled  = false;
} else 
{
    //P2 Wins!
    if (script.monstersLeftP1 == 3)
    {
        script.Player1.enabled = false;
        script.WinScreen.enabled  = true;
    }


    //P1 Wins!
    if (script.monstersLeftP2 == 3)
    {
        script.Player2.enabled = false;
        script.WinScreen.enabled = true;
    }
}

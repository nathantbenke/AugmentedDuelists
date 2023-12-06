// -----JS CODE-----
//@input Component.Script Player1;
//@input Component.Script Player2;

//@input Component.SceneObject[] P1Monsters;
//@input Component.Script[] MonsterInfo;
//@input Component.Script UI;


//@input SceneObject[] MonsterModels;


//@input Component.MarkerTrackingComponent Monster1;

var Turn = 1;
//script.Player1.api.SelectMonster(script.MonsterInfo[0]);
//script.Player2.api.SetMonster(script.MonsterInfo[0]);
script.UI.api.SetInstructions("Player 1, please scan a monster");
script.UI.api.UpdateUI(Turn, script.Player1.api.GetHealth(), script.Player1.api.GetMaxHealth(), script.Player2.api.GetHealth(), script.Player2.api.GetMaxHealth());



//script.Player1.api.SetMonster(script.MonsterInfo[1]);
script.api.SelectMove = function (card) {
    //print(script.Player1.api.MonsterCheck());
    //print(script.Player2.api.MonsterCheck());
    script.UI.api.HideInstructions();
    if (script.Player1.api.MonsterCheck() && script.Player2.api.MonsterCheck()) {
        //print("turn is " + Turn);
        if (card < 4) {

            if (Turn % 2 != 0) {
                //print("Player1Attack " + card + " " + Turn);
                //player 1 attacks, player 2 receives the attack
                //if player 2 dies then sort that out here

                var Atk = script.Player1.api.SelectAttack(card);
                //print("Selecting here");
                //Atk.api.GetModifier().Val = 1;
                //print("It's running once");
                //print(Atk.api.GetModifier().Val);



                script.Player2.api.TakeDamage(Atk.api.GetAttackDamage());

                var Mod = Atk.api.GetModifier();
                if (Mod != -1) {
                    print(Mod.ST);

                    if (Mod.ST) {
                        //apply to player 1
                        ApplyMod(Mod, script.Player1);

                    }
                    else {
                        //apply to player 2
                        ApplyMod(Mod, script.Player2);
                    }
                }
                //print(script.Player2.api.GetHealth());
            }
            else {

                /*print("Player2Attack " + card + " " + Turn);*/
                var Atk = script.Player2.api.SelectAttack(card);
                //print("Selecting here");
                //Atk.api.GetModifier().Val = 1;
                //print("It's running once");
                //print(Atk.api.GetModifier().Val);
                
                script.Player1.api.TakeDamage(Atk.api.GetAttackDamage() * Player1.api.GetAtkMod() * Player2.GetDefMod());
                //print(script.Player2.api.GetHealth());

                var Mod = Atk.api.GetModifier();
                if (Mod != -1) {
                    print(Mod.ST);

                    if (Mod.ST) {
                        //apply to player 2
                        ApplyMod(Mod, script.Player2);

                    }
                    else {
                        //apply to player 1
                        ApplyMod(Mod, script.Player1);
                    }
                }
            }

            if (!script.Player1.api.MonsterCheck()) {
                script.UI.api.SetInstructions("Player 1, please scan a monster card");
            }
            else if (!script.Player2.api.MonsterCheck()) {
                script.UI.api.SetInstructions("Player 2, please scan a monster card");
            }
            else {

                script.UI.api.SetInstructions("Scan an action card");
            }

        }
        else {

            if (Turn % 2 != 0) {
                script.Player1.api.SwapMonster();
                script.UI.api.SetInstructions("Player 1, please scan a monster card");
            }
            else {

                script.Player2.api.SwapMonster();
                script.UI.api.SetInstructions("Player 2, please scan a monster card");
            }

        }

        Turn++;
        script.UI.api.UpdateUI(Turn, script.Player1.api.GetHealth(), script.Player1.api.GetMaxHealth(), script.Player2.api.GetHealth(), script.Player2.api.GetMaxHealth());
    }
    else {
        print("Need both monsters");
    }

}


ApplyMod = function (M, T) {

    if (M.H) {
        //recover health
        T.api.TakeDamage(M.val);
    }
    else if (M.AtkMod) {
        print("Atk up");
        T.api.SetAtkMod(M);
    }
    else {
        T.api.SetDefMod(M);
    }
}

script.api.SelectMonster = function (card) {
    script.UI.api.HideInstructions();
    //print(card.MonsterName);
    //check if player 1 has a monster first, if not then select that
    //the players have to do it in order when selecting both. Player 1 first, then player 2. This shouldn't take up a turn.
    if (!script.Player1.api.MonsterCheck()) {
        //have a pop up on screen to confirm it
        script.Player1.api.SetMonster(card);
    }
    else if (!script.Player2.api.MonsterCheck()) {
        script.Player2.api.SetMonster(card);
    }
    

    


    if (!script.Player2.api.MonsterCheck()) {
        script.UI.api.SetInstructions("Player 2, please scan a monster card");
    }

    if (script.Player1.api.MonsterCheck() && script.Player2.api.MonsterCheck()) {

        script.UI.api.SetInstructions("Scan an action card");
    }

    script.UI.api.UpdateUI(Turn, script.Player1.api.GetHealth(), script.Player1.api.GetMaxHealth(), script.Player2.api.GetHealth(), script.Player2.api.GetMaxHealth());
    //if it's not either of these then it should ignore it
}
script.api.SelectMonster(script.MonsterInfo[0]);
script.api.SelectMonster(script.MonsterInfo[1]);
script.api.SelectMove(0);

//script.api.SelectMove(1);
//script.api.SelectMove(1);
//script.api.SelectMove(1);
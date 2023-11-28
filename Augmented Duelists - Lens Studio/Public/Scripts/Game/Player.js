// -----JS CODE-----
//so fun fact that's not officially documented anywhere
//it seems that lens studio cannot run a function from another script if the scripts are on different objects
//it just pretends that it doesn't exist
//so both player scripts have to be on the same one as the game manager
//this exists for no practical reason other than to set them apart in the inspector
//@input int PlayerNumber;

//@input Component.Script Monster;


var Health = 5;

//if we decide to have attacks that change stats, this is where to do it
var AtkChange = 0;
var DefChange = 0;

//this may be unnecessary since I think we're only planning on three cards
const MonsterLimit = 6;

var CurrentMonster = 0;
//@input Component.Script[] PrevMonsters;
//@input float[] MonsterHealth;


var HasMonster = false;


script.api.GetMonsterName = function () {
    return script.Monster.MonsterName;
}
script.api.GetHealth = function () {
    return Health;
}
script.api.SelectAttack = function (num) {
    return script.Monster.api.GetAttack(num);
}

script.api.TakeDamage = function (D) {
    script.Health -= D;
    script.MonsterHealth[script.CurrentMonster] = script.Health;
    if (script.Health <= 0) {
        //play death animation
        HasMonster = false;
    }
}

script.api.SetMonster = function (M) {
    //print(Health);

    

    //script.PrevMonsters.push(M);


    var MonsterLocation = -1;

    for (let i = 0; i < script.PrevMonsters.length; ++i) {
        if (script.PrevMonsters[i].MonsterName == M.MonsterName) {
            print("Matched " + i);
            MonsterLocation = i;
            break;
        }
    }

    if (MonsterLocation == -1) {
        //print("Hasn't found monster");
        if (script.PrevMonsters.length < MonsterLimit) {
            script.Monster = M;
            script.PrevMonsters.push(M);
            Health = M.MaxHealth;
            HasMonster = true;
            CurrentMonster = script.PrevMonsters.length - 1;
            script.MonsterHealth[CurrentMonster] = Health;
        }
        else {
            //can't add more than 6 monsters
            //this should just show an error message
            print("Can't add more than 6");
        }
    }
    else {
        //print("Found in list");
        //check if that monster is dead
        //Resummons monster
        print(script.MonsterHealth[MonsterLocation]);
        if (script.PrevMonsters[MonsterLocation] == script.PrevMonsters[CurrentMonster]) {
            
            //tell the player that they can't re-use the same card
            print("That's the current monster");
        }
        else if (script.MonsterHealth[MonsterLocation] <= 0) {
            //tell the player that they can't use a dead monster
            print("Can't use a dead monster")

        }
        else {
            print("Swapping them out");
            script.Monster = M;
            script.MonsterHealth[script.CurrentMonster] = script.Health;

            CurrentMonster = MonsterLocation;

            script.Health = script.MonsterHealth[script.CurrentMonster];
            HasMonster = true;
        }

    }


    //print(script.Monster.api.MonsterName);
}
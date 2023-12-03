// -----JS CODE-----
//so fun fact that's not officially documented anywhere
//it seems that lens studio cannot run a function from another script if the scripts are on different objects
//it just pretends that it doesn't exist
//so both player scripts have to be on the same one as the game manager
//this exists for no practical reason other than to set them apart in the inspector
//@input int PlayerNumber;

//@input Component.Script Monster;


var Health = 5;
var MaxHealth = 10;

//if we decide to have attacks that change stats, this is where to do it
var AtkChange = 0;
var DefChange = 0;

//this may be unnecessary since I think we're only planning on three cards
const MonsterLimit = 6;

var CurrentMonster = 0;
//@input Component.Script[] PrevMonsters;
//@input float[] MonsterHealth;


var HasMonster = false;


var multiplierVal = 1;  //Value of multiplier
var multiplierNum = 1;  //Number of times multiplier attack is called
var negMultiplier = 0;

switch(multiplierNum)
{
//Positive Multiplier
    case 1:
        multiplierVal = 1;
        break;
    case 2:
        multiplierVal = 1.1;
        break;
    case 3:
        multiplierVal = 1.25;
        break;
    case 4:
        multiplierVal = 1.5;
        break;
    case 5: 
        multiplierVal = 2;
        break;
    
//Negative Multiplier (needs to be added to enemy multiplier)
    case 0:
        negMultiplier = -0.1;
        break;
    case -1:
        negMultiplier = -0.2;
        break;
    case -2:
        negMultiplier = -0.3;
        break;
    case -3:
        negMultiplier = -0.4;
        break;
    case -4:
        negMultiplier = -0.5;
        break;
    
    default:
        if (multiplierNum > 5) 
        {
            multiplierVal = 2;
        } else if (multiplierNum < -4)
        {
            negMultiplier = -0.5;
        } else {
            multiplierVal = 1;        
        }
    break;
}


for (var i = 0; i < 6; ++i) {
    script.MonsterHealth.push(0);
}


script.api.GetMonsterName = function () {
    return script.Monster.MonsterName;
}
script.api.GetHealth = function () {
    return Health;
}
script.api.GetMaxHealth = function () {
    return MaxHealth;
}
script.api.SelectAttack = function (num) {
    return script.Monster.api.GetAttack(num);
}

script.api.TakeDamage = function (D) {
    script.Health -= D * multiplierVal;
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
            MaxHealth = M.MaxHealth;
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
            //print("Swapping them out");
            print(CurrentMonster);
            print(MonsterLocation);
            print(script.MonsterHealth[0]);
            print(script.MonsterHealth[1]);

            
            script.Monster = M;
            script.MonsterHealth[CurrentMonster] = Health;

            CurrentMonster = MonsterLocation;
            
            Health = script.MonsterHealth[CurrentMonster];
            MaxHealth = M.MaxHealth;
            HasMonster = true;
        }

    }


    //print(script.Monster.api.MonsterName);
}
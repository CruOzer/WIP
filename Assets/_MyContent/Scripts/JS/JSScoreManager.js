#pragma strict
import UnityEngine.UI;

//"Globale" Variable Score (wird vom EnemyHealthskript aufgerufen
public static var score : int = 0;

var textArray:Text[];
private var i:int;
//Initialize Score ist 0 und der Text wird sich geholt
function Awake ()
{
    score = 0;
}

//Bei jedem Update wird der Score geupdatet
function Update ()
{
	for(i=0; i < textArray.Length ;i++){
		textArray[i].text = "Score: " + score;		
		}	
}
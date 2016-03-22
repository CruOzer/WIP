#pragma strict
import UnityEngine.UI;

//Leben
var  startingHealth:int = 100;
var  currentHealth:int;
//Lebensanzeige
var healthText:Text;
//Rotes flashen des Bildschirms
var damageImage:Image;
var flashSpeed:float = 5f;
var flashColour:Color = new Color(1f, 0f, 0f, 0.1f);
var deathAudio:AudioClip;

private var  playerShooting:JSPlayerShooting;
private var  playerAudio:AudioSource;
private var damaged:boolean;
private var isDead:boolean;

function Awake ()
{
	playerAudio = GetComponent (AudioSource);
	playerShooting = GetComponent(JSPlayerShooting);
	currentHealth = startingHealth;
	if (playerAudio == null || playerShooting == null) {
		Debug.Log("Kein Shootingscript und oder kein Audiosound beim Spieler gefunden");
	}
	isDead = false;
}


function Update ()
{
	//Wird der Spieler gerade angegriffen flasht der Bidschirm in die flashColour
	if(damaged)
	{
		damageImage.color = flashColour;
	}
	//Ansonsten wird die Farbein echtzeit schwächer.
	else
	{
		damageImage.color = Color.Lerp (damageImage.color, Color.clear, flashSpeed * Time.deltaTime);
	}
	//Da die Farbe des Images nur einmal pro Angriff gesetzt werden soll, wird der SChalter auf false gesetzt.
	damaged = false;
}


public function TakeDamage (damage:int)
{
	//Löst das Flashen des Bildschirmes aus
	damaged = true;
	//Lebensverlust
	currentHealth -= damage;
	//Die Lebensanzeige wird aktualisiert
	healthText.text = currentHealth + " HP";
	//Angriffssound wird ausgelöst
	playerAudio.Play ();
	//Ist der Spieler Tod wird Death() ausgeführt ((es wird hierfür ein Schalter eingebaut, da die Funktion sich sonst unendlich aufruft
	if(currentHealth <= 0 && !isDead)
	{
		Death ();
	}
}


function Death ()
{
	isDead = true;
	playerAudio.clip = deathAudio;
	playerAudio.Play ();
	//Disable verschiedene Effekte
	playerShooting.DisableFire ();
	playerShooting.enabled = false;
}


#pragma strict
var damage:int=10;
private var player:GameObject;
private var anim:Animator;
private var plHealth:JSPlayerHealth;
private var attackAudio:AudioSource;
private var playerIsDead:boolean=false;
	//Initialize Variablen... Fehlermeldung bei Fehlern
function Awake(){
	player = GameObject.FindGameObjectWithTag("Player");
	anim = GetComponent(Animator);
	plHealth=player.GetComponent(JSPlayerHealth);
	attackAudio=GetComponent(AudioSource);
	if (player == null || anim == null || plHealth == null) {
		Debug.Log ("Please Check the Enemy Attacked Script. Player, Animator or PlayerHealth could not be detected!");
	}
	if (JSScoreManager.score>79){
			damage*=1.5;
	}
}
	function Update(){
	//Ist der Spieler Tod wird die Animation idle gespielt
	//eigene Variable, damit der Trigger nicht unendlichn geschossen wird
	if (plHealth.currentHealth<=0 && playerIsDead==false){
		anim.SetTrigger ("PlayerIsDead");
		playerIsDead=true;
	}
}
//Ist der Spieler in Range und hat HP startet die AttackAnimation	
function OnTriggerEnter( go:Collider){
	if (go.gameObject.tag  == "Player" && plHealth.currentHealth >=0) {
		anim.SetBool("PlayerInRange",true);
	}
}
//Ist der Spieler nicht mehr Range und stoppt die AttackAnimation	
function OnTriggerExit(go:Collider){
	if (go.gameObject.tag  == "Player") {
		anim.SetBool("PlayerInRange",false);
	}
}
//Wird von der Animation aufgerufen und fügt schaden hinzu. Die Zombies Idlen nachher und das Ende des Spiels wird aufgerufen
public function EnemyAttackHealth ()
	{	
		plHealth.TakeDamage (damage);
		attackAudio.Play();
	}
#pragma strict

//Speed die beim Sterben  in den Boden sinkt
var sinkSpeed:float=2.5f;
//Selbsterklärend
var scoreValue:int=1;
private var enHealth:JSEnemyHealth ;
private var player:Transform;
private var nav:NavMeshAgent ;
private var plHealth:JSPlayerHealth ;
//entscheided wann gesunken wird
private var isSinking:boolean;

// Use this for initialization
 function Awake(){

	//sucht den Player, da diesen den Tag hat, und holt sich das Transformobjekt
	player = GameObject.FindGameObjectWithTag ("Player").transform;
	//holt sich den NavMeshAgent des Gegners
	nav = GetComponent(NavMeshAgent);
	//Gegnerleben (eigene Komponente) und Spielerleben
	enHealth = GetComponent(JSEnemyHealth);
	plHealth = player.GetComponent(JSPlayerHealth);
	//boolean fürs Sterben
	isSinking = false;
}

// Update is called once per frame
function FixedUpdate () {
	// Wenn enemy und Gegner Leben sucht er sich den Spieler und läuft dahin
	if (enHealth.currentHealth > 0 && plHealth.currentHealth>0) {
		nav.SetDestination (player.position); //setzt das Ziel des Navis zur aktuellen Position des Players
//sonst wird die Navigation disabled
	} else {
		nav.enabled = false;
	}
	//ist der gegner tod sinkt er in den Boden (passt zur Animation) und wird mit der Zeit schneller
	if(isSinking)
	{
		transform.Translate (-Vector3.up * sinkSpeed * Time.deltaTime);
	}
}
//Wird von der Animation FallBack aufgerufen. Player bewegt sich nicht mehr der bool isSinking ermäglicht der isSinking Teil im Update und stirb nach 2s.
//Navigation wird beendet und der Rigidbody kann sich nun durch Collider bewegen
//Der Score wird um ScoreValue erhöht.
public function StartSinking (){
	GetComponent (NavMeshAgent).enabled = false;
	GetComponent (Rigidbody).isKinematic = true;
	isSinking = true;
	Destroy (gameObject, 2f);
	JSScoreManager.score += scoreValue;
	JSEnemySpawn.amountOfEnemies-=1;
}
#pragma strict
import UnityEngine.UI;

var player:GameObject;

var prefabPowerUpShooting:GameObject;
var timeToSpawnPowerUpShooting:float=30.0f;
private var playerShooting:JSPlayerShooting;
private var oldFireRate:float;
private var localTimer:float=0f;
private var cooldown:float;
private var rampage:boolean=false;
var spawnPointsShooting:JSSpawnPoint[];


var prefabPowerUpHealth:GameObject;
var timeToSpawnPowerUpHealth:float=30.0f;
private var playerHealth:JSPlayerHealth;
var healthText:Text;
var spawnPointsHealth:JSSpawnPoint[];

private var myRandom:int;

var textPowerUp:GameObject;
private var textAnimator:Animator;
private var text:Text;

function Awake () {
	//Initialize
	playerHealth=player.GetComponent(JSPlayerHealth);
	playerShooting=player.GetComponent(JSPlayerShooting);
	oldFireRate=playerShooting.fireRate;
	textAnimator= textPowerUp.GetComponent(Animator);
	text = textPowerUp.GetComponent(Text);
}


function Update () {
	//herunterzählen des Localtimers
	localTimer-=Time.deltaTime;
	//falls der cooldown vorbei ist (repräsentiert durch localTime) und die Rampage vorbei wiord das schießen wieder erlaubt
	if(localTimer <= 0 && rampage==false){
		playerShooting.enabled=true;
	}
	//falls die rampage vorbei ist (repäsentiert durch localTime) und die Rampage gerade aktiv ist 
	if(localTimer <= 0 && rampage==true){
		rampage=false;
		//rampage wird inaktiv und die schießgeschwindigkeit wird zurückgesetzt
		playerShooting.fireRate=oldFireRate;
		playerShooting.DisableFire();
		//alle feuereffekte werden entfernt und das schießen disabled
		playerShooting.enabled=false;
		//der cooldown wird gesetzt und die Spieler wird mit einem Text informiert
		localTimer=cooldown;
		text.text="Cooldown" ;
		textAnimator.SetTrigger("PowerUp");
	}
	//falls der Score höher als 20 ist werden ShootingPowerUps gespawnt
	if (JSScoreManager.score >= 20 && !IsInvoking("SpawnPowerUpShooting") ){
		InvokeRepeating("SpawnPowerUpShooting",timeToSpawnPowerUpShooting,timeToSpawnPowerUpShooting);	
	}
	//es werden immer LebensPowerUps gespawnt
	if (!IsInvoking("SpawnPowerUpHealth") ){
		InvokeRepeating("SpawnPowerUpHealth",timeToSpawnPowerUpHealth,timeToSpawnPowerUpHealth);	
	}
}

function SpawnPowerUpShooting(){
//Spawnt in einem der übergebenen Spawnpunkte
	myRandom=Random.Range(0,spawnPointsShooting.Length);
	Instantiate(prefabPowerUpShooting,spawnPointsShooting[myRandom].transform.position,spawnPointsShooting[myRandom].transform.rotation);
}

function SpawnPowerUpHealth(){
//Spawnt in einem der übergebenen Spawnpunkte
	myRandom=Random.Range(0,spawnPointsShooting.Length);
	Instantiate(prefabPowerUpHealth,spawnPointsHealth[myRandom].transform.position,spawnPointsHealth[myRandom].transform.rotation);
}




//Boosten des Spielerschießens	
public function BoostPlayerShooting( newFireRate:float , newFireRateTime:float,overHeat:float ){
	if(playerShooting==null){
		Debug.Log("Kein PlayerShooting");
		return;
	}
	//Feuerrat wird erhöht und ein Timer dafür gesetzt
	playerShooting.fireRate=newFireRate;
	localTimer=newFireRateTime;
	rampage=true;
	//Rampage wird aktiviert und der cooldown der Waffe afterwards gesetzt
	cooldown=overHeat;
	//Der SPieler wird über die Rampage informiert
	text.text="Rampage" ;
	textAnimator.SetTrigger("PowerUp");
}
//Erhöhen der Spielerleben
public function BoostPlayerHealth(healthUp:float){
	if (playerHealth==null){
		Debug.Log("Kein Spieler!");
		return;
	}
	//die Leben sollen nicht mehr  als 200 betragen
	if (playerHealth.currentHealth>150){
		return;
	}
	//die Spielerleben werden erhöht
	playerHealth.currentHealth+=healthUp;
	if (healthText==null){
		Debug.Log("Kein Text!");
		return;
	}
	//Der Spieler wird darüber informiert 
	text.text="Plus " + healthUp + " HP" ;
	textAnimator.SetTrigger("PowerUp");
	//Die Lebensanzeige wird aktualisiert
	healthText.text = playerHealth.currentHealth + " HP";	
}
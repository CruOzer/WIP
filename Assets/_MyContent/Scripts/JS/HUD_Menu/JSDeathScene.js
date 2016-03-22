#pragma strict	

var DeathMenuCam: GameObject;
var enemy: GameObject;
var hUDAnimator: Animator;
var  zombieMenuGO:JSzombieMenu;

private var player: GameObject;
private var camPosition: GameObject;
private var plHealth:JSPlayerHealth;
private var death:boolean =false;
private var waitTime:float=3.0f;
// Use this for initialization
function Start () {
	//Instanziert alle Objekte und überprüft ob diese da sind
	player = GameObject.FindGameObjectWithTag ("Player");
	camPosition=GameObject.FindGameObjectWithTag ("MenuCamPosition");
	if (player == null) {
		Debug.Log ("There is no Player!");
	}
	plHealth = player.GetComponent(JSPlayerHealth);
	if (plHealth == null) {
		Debug.Log ("The Player has no Health");
	}
	if (camPosition == null) {
		Debug.Log ("There is no Camposition attached to the player!");
	}
	if (enemy == null) {
		Debug.Log ("No enemy attached");
	}
}

// Update is called once per frame
function Update () {
	//ist der Spieler Tod und wurde die Kamera nciht nicht geswitcht wird der Trigger Gameover ausgelöst und ein Countdown zum switchen der Kamera gemacht
	if (plHealth.currentHealth <= 0 && death==false) {
		hUDAnimator.SetTrigger ("Gameover");
		waitTime-=Time.deltaTime;
		if (waitTime<=0){//wechselt die Kamera
			switchCamera();
		}
	}
}
function switchCamera(){
	//wechseln der Kamera true
	death=true;
	//anstelle des Players wird ein Zombie gespawnt
	Instantiate (enemy, player.transform.position, player.transform.rotation);
	//der Spieler wird deaktiviert und eine neue Kamera wird hinzugefügt
	player.SetActive(false);
	DeathMenuCam.SetActive(true);
	DeathMenuCam.transform.position=camPosition.transform.position;
	DeathMenuCam.transform.rotation=camPosition.transform.rotation;
	// starten der Funktion des DeathMenüs
	zombieMenuGO.showDeathMenu ();
}
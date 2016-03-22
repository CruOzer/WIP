#pragma strict
import UnityEngine.UI;
import UnityEngine.EventSystems;

var pauseMenu:Canvas;
var HUD:Canvas;
var crosshair:GameObject;
var firstPauseSelected:GameObject;
var firstDeathSelected:GameObject;
private var eventSystem:EventSystem;

private var intMenu:int=0; //0 für kein Menü 1 für PauseMenü 2 für DeathMenü
	// Use this for initialization
function Awake () {
	if (pauseMenu == null) {
		Debug.Log("No Pause Menu attached.");
	}
	pauseMenu.enabled = false;
	
	if (HUD == null) {
		Debug.Log("No HUD attached.");
	}

	HUD.enabled = true;
	if (crosshair == null) {
		Debug.Log("No Crosshair attached.");
	}
	crosshair.SetActive (true);

	eventSystem = GameObject.FindGameObjectWithTag ("Eventsystem").GetComponent(EventSystem);
	if (eventSystem== null) {
		Debug.Log("No EventSystem found.");
	}
	if (firstPauseSelected== null||firstDeathSelected== null) {
		Debug.Log("No FirstSelectedItem found.");
	}
}
	
// Update is called once per frame
function Update () {
	//wird Escape gedrückt und ist das PauseMenü noch nicht aktiv wird es geladen sofern kein anderes Menü geladen worden es
	if (Input.GetKeyDown (KeyCode.Escape)||Input.GetKeyDown ("p")) {
		if (intMenu==0) {
			showPauseMenu ();
		}else if (intMenu==1){
			//ansonsten wird es geschlossen
			closePauseMenu ();
		}
	}
	//PauseMenü
	if(intMenu==1){
		if(Input.GetKeyDown("c")){
			closePauseMenu();
		}
		if(Input.GetKeyDown("x")){
			loadMainMenu();
		}
	}
	//DeathMenü
	if (intMenu == 2) {
		if(Input.GetKeyDown("r")){
			reloadScene();
		}
		if(Input.GetKeyDown("x")){
			loadMainMenu();
		}
	}
}
//show PauseMenu
function showPauseMenu(){
	pauseMenu.enabled = true;
	HUD.enabled = false;
	crosshair.SetActive (false);
	eventSystem.SetSelectedGameObject (firstPauseSelected);
	intMenu = 1;
	Time.timeScale = 0;
}
//Schließen des PauseMenüs
public function closePauseMenu(){
	Time.timeScale = 1;
	pauseMenu.enabled = false;
	HUD.enabled = true;
	crosshair.SetActive (true);
	intMenu = 0;
}
//zeigen des DeathMenüs
public function showDeathMenu(){
	eventSystem.SetSelectedGameObject (firstDeathSelected);
	crosshair.SetActive (false);
	intMenu = 2;
}
// Exit zum Startmenü
public function loadMainMenu(){
	intMenu = 0;
	Time.timeScale = 1;
	Application.LoadLevel (0);
}

// Reload der Scene
public function reloadScene(){
	intMenu = 0;
	Time.timeScale = 1;
	Application.LoadLevel (Application.loadedLevel);
}
#pragma strict


var newFireRate:float=0.1f;
var newFireRateTime:float=20f;
var overHeat:float=5f;
var selfDestruct:float=20;
var powerUpManager:JSPowerUpManager;

function Awake(){
	powerUpManager=GameObject.FindGameObjectWithTag("PowerUpManager").GetComponent("JSPowerUpManager");
	Destroy(gameObject,selfDestruct);	
}
function FixedUpdate () {
	this.transform.Rotate(new Vector3(0.0f,10f*Time.deltaTime,0.0f));
}

function OnTriggerEnter(go:Collider){
	if(go.gameObject.tag=="Player"){
		powerUpManager.BoostPlayerShooting(newFireRate,newFireRateTime,overHeat);
 		Destroy(gameObject,0f);	
 	}
}

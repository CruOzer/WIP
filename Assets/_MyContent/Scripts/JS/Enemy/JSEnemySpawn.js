#pragma strict

	var playerHealth:JSPlayerHealth;
	var enemy:GameObject;
	var spawnTime:float=5f; //sollte mit Anzahl der Level übereinstimmen
	var spawnPoints:Transform[];
	var maxEnemies:int=30;
	private var level:int=0;
	public static var amountOfEnemies:int=5;

function Start () {
	InvokeRepeating("Spawn", spawnTime,spawnTime);
}


function Spawn () {
		//Ist der Spieler Tod wird die Funktion direkt beendet
		if (playerHealth.currentHealth <= 0) {
			return;
		}
		
		if (JSEnemySpawn.amountOfEnemies >= maxEnemies) {
			return;
		}
		//Sonst wird sich einer der Spawnpointe ausgesucht und der Gegner an der Stelle gespawnt
		var spawnPointIndex:int = Random.Range (0, spawnPoints.Length);
		Instantiate (enemy, spawnPoints [spawnPointIndex].position, spawnPoints [spawnPointIndex].rotation);
		JSEnemySpawn.amountOfEnemies+=1;
		//verringert die Spawnzeit pro Gegner um RECHNUNG bis maximal minSpawnTime
		if (JSScoreManager.score>10 && level<1) {
			newLevel();
		}
		if (JSScoreManager.score>20 && level<2) {
			newLevel();
		}
		if (JSScoreManager.score>40 && level<3) {
			newLevel();
		}
		if (JSScoreManager.score>60 && level<4) {
			newLevel();
		}

	}

function newLevel(){
		spawnTime-=1;
		level += 1;
		CancelInvoke ("Spawn");
		InvokeRepeating("Spawn",spawnTime,spawnTime);
	}
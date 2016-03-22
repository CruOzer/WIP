#pragma strict

var  startingHealth:int = 100;
var currentHealth:int;

private var anim:Animator;
//Instantiate
function Start(){
	currentHealth = startingHealth;
	anim = gameObject.GetComponent(Animator);
	
}

//Bekomme Schaden. Ist das Leben weg stirb.
public function TakeDamage( damage:int){
	currentHealth -= damage;
	if (currentHealth <= 0) {
		Death();
	}
}

function Death(){
	//Es wird die Sterbeanimation ausgelöst. Diese löst auch die Funktion StartSinking des EnemyControllers aus
	anim.SetTrigger ("Dead");
	//Destroy (gameObject);
}
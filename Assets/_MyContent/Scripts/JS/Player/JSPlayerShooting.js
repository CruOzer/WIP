#pragma strict

var fireRate:float = 0.5f;
var range:float=50f;
var damage: int=20;
var rifleEnde:GameObject;
private var nextShot:float =0;
private var fireTime:float=0.05f;

private var  cam:Camera;
private var shootRay:Ray;

private var gunLight:Light;
private var gunAudio:AudioSource ;
private var gunParticles:ParticleSystem;
private var gunLine:LineRenderer ;
// Use this for initialization
function Awake(){
	cam = Camera.main;
	gunLine = rifleEnde.GetComponent(LineRenderer);
	gunAudio = rifleEnde.GetComponent(AudioSource);
	gunLight = rifleEnde.GetComponent(Light);
	gunParticles = rifleEnde.GetComponent(ParticleSystem);
}
function Update(){
	if (gunLine == null ||gunAudio == null || gunParticles == null || gunLight == null) {
		Debug.Log("No Linerenderer, Audio or Particles");
		return;
	}

	// in Echtzeit
	nextShot -= Time.deltaTime;
	if (Input.GetMouseButton(0) && nextShot <= 0) {
		gunLight.enabled = true;
		gunAudio.Play ();
		gunParticles.Stop ();
		gunParticles.Play ();
		//GunLine wird sichtbar und startet von der Kameraposition
		gunLine.enabled = true;
		gunLine.SetPosition (0, rifleEnde.transform.position );
		//schießt ein Ray
		shootRay = new Ray(cam.transform.position, cam.transform.forward);
		var hitInfo:RaycastHit;
		//sucht nach erstem Hit in shootablen in der Range
		if(Physics.Raycast (shootRay, hitInfo,range)){
			//der Punkt, wo getroffen wird
			//Vector3 hitPoint = hitInfo.point;
			//Holt sich die GegnerHealth und zieht Leben ab.
			Debug.Log("HitSth");
			if(hitInfo.collider.gameObject.tag=="EnemyHead"){
				var enHealthHead:JSEnemyHealth = hitInfo.collider.GetComponentInParent(JSEnemyHealth);
				if(enHealthHead != null)
				{	
					enHealthHead.TakeDamage (damage*5);

				}	
									Debug.Log("Head");
			}else{
				var enHealth:JSEnemyHealth = hitInfo.collider.GetComponent(JSEnemyHealth);

				if(enHealth != null)
				{
					enHealth.TakeDamage (damage);;
			
				}
						Debug.Log("Body");
			}
				//Line geht zum Hitpoint
			gunLine.SetPosition (1, hitInfo.point);
		} else{//Oder ins nichts
			gunLine.SetPosition (1, transform.position + transform.forward * range);
		}
		//Reset des Timers
		nextShot=fireRate;
	}
	// ist die Feuersequenz zu Ende werden die Effekte removed
	if(nextShot<=fireRate-fireTime ){
		DisableFire ();
	}
}

function DisableFire(){
	gunLine.enabled = false;
	gunLight.enabled = false;
}
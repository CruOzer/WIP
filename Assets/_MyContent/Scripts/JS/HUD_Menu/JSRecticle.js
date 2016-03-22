#pragma strict

//Kamera
var  MainCamera:Camera;
// Größe des Crosshairs
var crosshairScale:float=0.1f;
private var hit:RaycastHit ;
private var  distance:float;

// Update is called once per frame
function FixedUpdate () {
	if (MainCamera == null) {
		Debug.Log("No MainCamera assignet");
		return;
	}
	//Schießt ein Ray los und gibt den hitpoint zurück (falls was getroffen wurde)
	//gibt die Entfernung des fokussierten Objektes zurück. Wird nix fokussiert gibt es die Maximale Weite der Kamera * 0.95 an.
	if (Physics.Raycast (new Ray (MainCamera.transform.position, MainCamera.transform.rotation * Vector3.forward),  hit)) {
		distance = hit.distance;
	} else {
		distance=MainCamera.farClipPlane * 0.95f;
	}
	//Crosshair an die Position setzen, wo das der Raycast ein Objekt gefunden hat (Distance)
	transform.position = MainCamera.transform.position + MainCamera.transform.rotation * Vector3.forward * distance;
	//Drehung des Corsshairs, sodass es immer zur Kamera zeigt
	transform.LookAt (MainCamera.transform.position);
	transform.Rotate(0.0f,180.0f,0.0f);

	//Anpassen der Crosshairgröße zusätzlich, damit es realistischer wirkt
/*	if (distance < 10f) {
		distance=1+5*Mathf.Exp(-distance);
	}*/

	//das Crosshair passend skalieren basierend auf der Distance und der vom User gesetzen Skale
	transform.localScale = Vector3.one * distance * crosshairScale;
}

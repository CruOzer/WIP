#pragma strict


var  rotateSpeed:float = 2f;

// Update is called once per frame
function Update () {
	//Rotiert um die Rotation Speed in Echtzeit
	transform.Rotate (0.0f, rotateSpeed*Time.deltaTime, 0.0f);
}
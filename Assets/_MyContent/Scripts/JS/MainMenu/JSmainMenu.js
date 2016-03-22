#pragma strict


// Update is called once per frame
function Update () {
	if (Input.GetKey("z")){
		openZombie();
	}
	if (Input.GetKey("x")){
		appExit();
	}
}

public function openZombie(){
	Application.LoadLevel(1);
}

public function appExit(){
	Application.Quit ();
}
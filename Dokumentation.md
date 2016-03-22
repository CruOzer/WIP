#ZombieShooter#

Der Zombieshooter ist ein Survival-Shooter mit der OculusRift VR. Der Spieler steuert den Soldaten über die Tastatur, Maus und der Brille. Dabei muss er so lange überleben wie möglich und so viele Zombies abschießen wie es geht. Es spawnen immer wieder Objekte, die den Spieler verstärken und neue Kraft geben.

----------

##Change-Log##

###15/09/15###

Bug-Fixes und die Anzahl der Gegner am Anfang wurde erhöht.

###15/09/14###

Verbesserung der Lebens- und Shooting-PowerUps. Einfügen von Hintergrundmusik und Soundeffekten.

###15/09/11###

Ein Lebens- und ein Shooting-PowerUp sind hinzugekommen die zufällig spawnen. Das Levelsystem wurde verbessert. Es gibt nun eine maximal Anzahl an Zombies. Die Zombies werden mit der Zeit stärker.


###15/09/09###
Waffen und Schießen sind nun möglich. Viele Skripte wurden performanter geschrieben. 
Es gibt nun ein Levelsystem. Die Gegner spawnen mit der Zeit schneller.

###15/09/07###
Die Menüs wurden fertiggestellt und das Game ist nun pausierbar. Des Weiteren wurde eine HUD mit einer Lebensanzeige und einem Scoremanager entwickelt. 

Die Gegner spawnen nun automatisch alle paar Sekunden.

Zudem verwandelt sich der Spieler in ein Zombie, wenn er stirbt. Außerdem kann man das Spiel nun wiederholen.

###15/09/03###
Eine Möglichkeit das Menü auf die Oculus zu bekommen wurde gefunden. Erste Teile des Menüs wurden erstellt. 

###15/09/01###
Der Spieler hat ein Crosshair bekommen das vor das Objekt gerendert wird, wo sich der Fokus befindet. Erste Gedanken über die Menüführung wurden entworfen. Ein Hauptmenü mit einer Weltraumszene wurden erstellt. Das Menü auf die Oculus Rift zu bekommen ist zur Zeit noch Bearbeitung.

###15/08/31###

Nach dem Update der OculusRift-Runtime auf die Version 0.7.0.0 läuft diese auch unter Windows 10. Der OVR-Player-Controller wurde eingefügt und hat ein Shooting und Health-Skript bekommen. Dem Player fehlen jedoch Animationen, eine Waffe und ein Modell. Darüber hinaus funktioniert das Shooting-Skript noch nicht.

Darüber hinaus wurde ein Zombie als Prefab erstellt. Dieses beinhaltet folgende Komponenten:

- einen Nav Mesh Agent mit einem passenden Skript (der Zombie läuft zum Player hin)
- ein Attack-Skript (der Spieler wird angegriffen, verliert Leben und er kann sterben)
- ein Health-Skript (der Zombie verliert Leben, wenn er angegriffen wird und kann sterben)
- verschiedene Animationen zu den jeweiligen States

###15/08/24###

Erstellung der Welt. Die Welt ist nun begehbar und ist realistisch.

- Wände, Decken, Räume, und Objekte
- Licht, Nebel
- Kollisionsboxen


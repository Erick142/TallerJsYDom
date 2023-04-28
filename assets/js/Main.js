class Personaje{
    constructor(name){
        this.name=name;
        this.classType=this.obtenerClase();
        this.health=Math.floor(Math.random() * 101) + 100;
        this.currentHealth=this.health;
        this.speed=Math.floor(Math.random()*10) +1;
        this.pickAttacks();
    }
    //OBTENER CLASE ALETORIA
    obtenerClase(){
        const clases=["MAGICIAN","KNIGHT","WARRIOR","FAIRY"];
        return  clases[Math.floor(Math.random() * clases.length)];
    }

    //OBTENER ATAQUES ALEATORIOS SEGUN TIPO DE CLASE
    pickAttacks(){
        var attackType;
        switch(this.classType){
            case "MAGICIAN":
                attackType="MAGIC";
                break;
            case "KNIGHT":
                attackType="PHYSICAL";
                break;
            case "WARRIOR":
                attackType="PHYSICAL"
                break;
            case "FAIRY":
                attackType="MAGIC";
                break;
        }
        const posiblesAtaques= attacks.filter(ataque=>ataque.type==attackType);
        const firstAttack=posiblesAtaques[Math.floor(Math.random() * posiblesAtaques.length)];
        var secondAttack=posiblesAtaques[Math.floor(Math.random() * posiblesAtaques.length)];
        //WHILE PO SI SALEN LOS MISMOS ATAQUES REPETIDOS.
        while(firstAttack==secondAttack){
            secondAttack=posiblesAtaques[Math.floor(Math.random() * posiblesAtaques.length)];
        }
        this.firstAttack=firstAttack;
        this.secondAttack=secondAttack;
    }

    recibirDaño(daño){
        this.currentHealth-=daño;
    }
    atacar(personajeObjetivo){
        const ataques=[this.firstAttack, this.secondAttack];
        const ataqueElegido= ataques[Math.floor(Math.random() * ataques.length)];
        const elAtaqueAcerto=this.acertarAtaque(ataqueElegido);
        if(elAtaqueAcerto){
            personajeObjetivo.currentHealth-=ataqueElegido.damage;
        }
        return elAtaqueAcerto;
    }
    acertarAtaque(ataque){
        const precision = Math.floor(Math.random() * 100) + 1;
        if (precision <= ataque.accuracy) {
            return true; // El ataque golpeó
        } else {
            return false; // El ataque falló
        }
    }
    estaDerrotado(){
        return this.currentHealth<=0;
    }
    
}

const attacks=[
    { "name": "Thunderstorm", "damage": 30, "accuracy": 60, "type": "MAGIC" },
    { "name": "Earthquake", "damage": 12, "accuracy": 50, "type": "MAGIC" },
    { "name": "Fist Punch", "damage": 18, "accuracy": 95, "type": "PHYSICAL" },
    { "name": "Poison Cloud", "damage": 15, "accuracy": 80, "type": "MAGIC" },
    { "name": "Hurricane", "damage": 22, "accuracy": 65, "type": "MAGIC" },
    { "name": "Frost Nova", "damage": 10, "accuracy": 40, "type": "MAGIC" },
    {"name": "Fist Uppercut","damage": 12,"accuracy": 100,"type": "PHYSICAL"},
    { "name": "Divine Smite", "damage": 28, "accuracy": 90, "type": "MAGIC" },
    { "name": "Sword Thrust", "damage": 20, "accuracy": 85, "type": "PHYSICAL" },
    { "name": "Flame Burst", "damage": 18, "accuracy": 95, "type": "MAGIC" },
    { "name": "Arcane Blast", "damage": 25, "accuracy": 70, "type": "MAGIC" },
    { "name": "Sword Stab", "damage": 30, "accuracy": 60, "type": "PHYSICAL" },
    { "name": "Kick Sweep", "damage": 10, "accuracy": 40, "type": "PHYSICAL" },
    { "name": "Kick Strike", "damage": 22, "accuracy": 75, "type": "PHYSICAL" },
    { "name": "Sword Slash", "damage": 25, "accuracy": 80, "type": "PHYSICAL" },
    { "name": "Mind Blast", "damage": 8, "accuracy": 100, "type": "MAGIC" },
    { "name": "Shadow Bolt", "damage": 20, "accuracy": 85, "type": "MAGIC" },
    { "name": "Sword Cleave", "damage": 8, "accuracy": 70, "type": "PHYSICAL" },
    { "name": "Kick Combo", "damage": 28, "accuracy": 65, "type": "PHYSICAL" },
    { "name": "Fist Smash", "damage": 15, "accuracy": 90, "type": "PHYSICAL" }
]

class Combate{

    constructor(p1,p2){
        this.turno=0;
        this.p1=p1;
        this.p2=p2;
        this.combateActivo=true;
    }


    function (p1,p2) {
        let Personaje_1 = p1.name  //Nombre del personaje 1
        let Personaje_2 = p2.name   //Nombre del personaje 1
        let ATACK_NAME_1   //Nombre del ataque usado por el personaje 1 en el turno
        let ATACK_NAME_2   //Nombre del ataque usado por el personaje 2 en el turno
        let N = 0;             //Número del turno
        let HEALTH_1       //Vida actual del personaje 1 en el turno posterior al ataque del personaje 2
        let HEALTH_2       //Vida actual del personaje 2 en el turno posterior al ataque del personaje 1
        let N_FALLOS_1     //Cantidad de ataques fallados en la batalla por parte del personaje 1
        let N_FALLOS_2     //Cantidad de ataques fallados en la batalla por parte del personaje 2

        


    }
    
    //crea un log del combate
    generateFileLog(logs, filename) {
        const fs = require("fs");
        fs.writeFile(filename, logs, (err) => {
        if (err) throw err;
        });
    }

    pasarTurno(){
        this.turno++;
    }

    alguienFueDerrotado(){
        if(this.p1.estaDerrotado()||this.p2.estaDerrotado()){
            this.combateActivo=false;
        }
    }

    resolucion(){
        if(this.p1.speed>this.p2.speed){
            this.realizarAtaques(p1,p2);
        }else if(this.p2.speed>this.p1.speed){
            this.realizarAtaques(p2,p1);
        }else{
            const primeroEnAtacar=Math.floor(Math.random*2)+1;
            if (primeroEnAtacar==1){
                this.realizarAtaques(p1,p2);
            }else{
                this.realizarAtaques(p2,p1);
            }
        }
    }
    realizarAtaques(personajeRapido,personajeLento){
        console.log(`${personajeRapido.name} ataca a ${personajeLento.name}`)
        personajeRapido.atacar(personajeLento);
        if(!personajeLento.estaDerrotado()){
            personajeLento.atacar(personajeRapido);
            console.log(`${personajeLento.name} ataca a ${personajeRapido.name}`)
        }else{
            console.log(personajeLento.name+ "derrotado")
        }
        if(personajeRapido.estaDerrotado()){
            console.log(personajeRapido.name+" derrotado")
        }
    }
}


const p1= new Personaje("Erick");
const p2= new Personaje("Jorge");

console.log(p1);
console.log(p2);
const combate=new Combate(p1,p2);

while(combate.combateActivo){
    combate.resolucion();
    combate.pasarTurno();
    combate.alguienFueDerrotado();
}











/*
    —------------------------------------------------------------------------------------------------------------------
"### INICIO ###""
%Personaje_1% +"|"+ %CLASS_1% | %HEALTH_1% de vida vs Personaje_2 | CLASS_2 | HEALTH_2 de vida
### BATALLA ###

Turno N
Personaje_1 ataca con ATACK_NAME… Da en el blanco!. La vida del Personaje_2 queda en
HEALTH_2.
Personaje_2 ataca con ATACK_NAME… Da en el blanco!. La vida del Personaje_1 queda en
HEALTH_1.

Turno N
Personaje_1 ataca con ATACK_NAME_1…Falla!. La vida del Personaje_2 se mantiene en
HEALTH_2.
Personaje_2 ataca con ATACK_NAME_2…Falla!. La vida del Personaje_1 se mantiene en
HEALTH_1.

Turno N
Personaje_1 ataca con ATACK_NAME_1…Falla!. La vida del Personaje_2 se mantiene en
HEALTH_2.
Personaje_2 ataca con ATACK_NAME_2…Da en el blanco!. El Personaje_1 no puede
continuar.
### RESUMEN ###
Personaje_2 gana la batalla!
El Personaje_1 falló N_FALLOS_1 veces su ataque
El Personaje_2 falló N_FALLOS_2 veces su ataque
—------------------------------------------------------------------------------------------------------------------------
    */




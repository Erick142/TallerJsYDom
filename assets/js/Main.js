class Personaje{
    constructor(name){
        this.name=name;
        this.classType=this.obtenerClase();
        this.health=Math.floor(Math.random() * 101) + 100;
        this.currentHealth=this.health;
        this.speed=Math.floor(Math.random()*10) +1;
        this.pickAttacks();
        this.contadorFallos=0;
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
        //WHILE POR SI SALEN LOS MISMOS ATAQUES REPETIDOS.
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
        //console.log("acc "+ataqueElegido.accuracy);
        const elAtaqueAcerto=this.acertarAtaque(ataqueElegido);
        //console.log(elAtaqueAcerto)
        let resultado;
        if(elAtaqueAcerto){
            personajeObjetivo.currentHealth-=ataqueElegido.damage
            let salud= personajeObjetivo.currentHealth;
            if(salud>0){
            resultado = `${this.name} ataca con ${ataqueElegido.name}…  Da en el blanco!. La vida de ${personajeObjetivo.name} queda en ${personajeObjetivo.currentHealth}.\n`;
            console.log(resultado);

            }else{
            resultado = `${this.name} ataca con ${ataqueElegido.name}…  Da en el blanco!. ${personajeObjetivo.name} no puede continuar.\n`;
            console.log(resultado);
            return resultado;}
        
        }else{
            resultado=`${this.name} ataca con ${ataqueElegido.name}…  Falla!. La vida de ${personajeObjetivo.name} se mantiene en ${personajeObjetivo.currentHealth}.\n`;
            console.log(resultado);
            this.contadorFallos+=1;
            return resultado;
        }
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
        if (this.currentHealth<=0) {
            return true
        }else{return false} 
    }
    
}

const attacks=require("../../attacks.json");

class Combate{

    constructor(p1,p2){
        this.turno=0;
        this.p1=p1;
        this.p2=p2;
        this.combateActivo=true;
        

    }


    combatir(p1,p2) {
        let Personaje_1 = this.p1.name  //Nombre del personaje 1
        console.log(Personaje_1);
        let Personaje_2 = this.p2.name   //Nombre del personaje 1
        console.log(Personaje_2);

        let ganador;

        let ATACK_NAME_1   //Nombre del ataque usado por el personaje 1 en el turno
        let ATACK_NAME_2   //Nombre del ataque usado por el personaje 2 en el turno
        let N = 0;             //Número del turno
        let HEALTH_1       //Vida actual del personaje 1 en el turno posterior al ataque del personaje 2
        let HEALTH_2       //Vida actual del personaje 2 en el turno posterior al ataque del personaje 1
        let N_FALLOS_1= 0;    //Cantidad de ataques fallados en la batalla por parte del personaje 1
        let N_FALLOS_2= 0;     //Cantidad de ataques fallados en la batalla por parte del personaje 2
        let log;


        //mensaje inicio
        console.log("### INICIO ###\n"+
        `
        ${Personaje_1} | ${this.p1.classType} | ${this.p1.health} de vida\n
        V/S\n
        ${Personaje_2} | ${this.p2.classType} | ${this.p2.health} de vida\n
        `);


        
        //ciclo del combate
        while(this.combateActivo){
            this.resolucion();
            this.ganador=this.comprobarFinCombate();
        }

        //mensaje final de resumen
        console.log("\n### RESUMEN ###\n"+
        `\n${this.ganador} gana la batalla!
            
            ${this.p1.name} falló ${this.p1.contadorFallos} veces su ataque\n
            ${this.p2.name} falló ${this.p2.contadorFallos} veces su ataque\n
            —------------------------------------------------------------------------------------------------------------------------`);

        
        console.log("logs \n"+ log)
        
    }
    

    //crea un log del combate
    generateFileLog(logs, filename) {
        const fs = require("fs");
        fs.writeFile(filename, logs, (err) => {
        if (err) throw err;
        });
    }

    
    pasarTurno(N){
        N+=1;
    }

    

    
    realizarAtaques(personajeAtacante,personajeObjetivo){
        this.log +="\n"+ personajeAtacante.atacar(personajeObjetivo); 
        this.log +="\n"+ personajeObjetivo.atacar(personajeAtacante);
    }

    resolucion(){
        if(this.p1.speed>this.p2.speed){
            //console.log("comienza p1")
            this.realizarAtaques(p1,p2);
        }else if(this.p2.speed>this.p1.speed){
            //console.log("comienza p2")
            this.realizarAtaques(p2,p1);
        }else{
            //en caso de que tengan misma speed
            const primeroEnAtacar=Math.floor(Math.random*2)+1;
            if (primeroEnAtacar==1){
                this.realizarAtaques(p1,p2);
                //console.log("comienza p1")
            }else{
                this.realizarAtaques(p2,p1);
                //console.log("comienza p2")
            }
        }
    }

    

    comprobarFinCombate(){
        if(p1.estaDerrotado()){
            this.combateActivo=false;
            return p2.name
        }else if(p2.estaDerrotado()){
            this.combateActivo=false;
            return p1.name
        }
        }
}






//creacion de personajes
const p1= new Personaje("Erick");
const p2= new Personaje("Jorge");

//console.log(p1);
//console.log(p2);

//comienzo combate
const combate=new Combate(p1,p2);

combate.combatir();

/*
while(combate.combateActivo){
    combate.combatir();
}*/











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




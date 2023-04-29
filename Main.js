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
    //OBTENER CLASE ALEATORIA
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

    atacar(personajeObjetivo){
        const ataques=[this.firstAttack, this.secondAttack];
        const ataqueElegido= ataques[Math.floor(Math.random() * ataques.length)];
        const elAtaqueAcerto=this.acertarAtaque(ataqueElegido);
        let resultado;
        if(elAtaqueAcerto){
            personajeObjetivo.currentHealth-=ataqueElegido.damage
            let salud= personajeObjetivo.currentHealth;
            if(salud>0){
            resultado = `${this.name} ataca con ${ataqueElegido.name}…  Da en el blanco!. La vida de ${personajeObjetivo.name} queda en ${personajeObjetivo.currentHealth}.\n`;
            return resultado;

            }else{
            resultado = `${this.name} ataca con ${ataqueElegido.name}…  Da en el blanco!. ${personajeObjetivo.name} no puede continuar.\n`;
            return resultado;}
        
        }else{
            resultado=`${this.name} ataca con ${ataqueElegido.name}…  Falla!. La vida de ${personajeObjetivo.name} se mantiene en ${personajeObjetivo.currentHealth}.\n`;
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

const attacks=require("./attacks.json");




class Combate{

    constructor(p1,p2){
        this.turno=0;
        this.p1=p1;
        this.p2=p2;
        this.combateActivo=true;
        this.log="";
        this.logBatalla="\n";

    }


    combatir(p1,p2) {
        let Personaje_1 = this.p1.name  
        let Personaje_2 = this.p2.name 
        let mensajeInicio = `### INICIO ###\n
        
        ${Personaje_1} | ${this.p1.classType} | ${this.p1.health} de vida\n
        V/S\n
        ${Personaje_2} | ${this.p2.classType} | ${this.p2.health} de vida\n
        `;
        //ciclo del combate
        while(this.combateActivo){
            this.turno++
            
            this.resolucion(this.turno);
            this.ganador=this.comprobarFinCombate();
        }

        //mensaje final de resumen
        let mensajeFinal=`\n### RESUMEN ###\n
        ${this.ganador} gana la batalla!
            
            ${this.p1.name} falló ${this.p1.contadorFallos} veces su ataque\n
            ${this.p2.name} falló ${this.p2.contadorFallos} veces su ataque\n
            —------------------------------------------------------------------------------------------------------------------------`;


    
        this.log=mensajeInicio+this.logBatalla+mensajeFinal;

        this.generateFileLog(this.log, "resultados.txt")

        
    }
    

    //crea un log del combate
    generateFileLog(logs, filename) {
        const fs = require("fs");
        fs.writeFile(filename, logs, (err) => {
        if (err) throw err;
        });
    }
    
    
    realizarAtaques(personajeAtacante,personajeObjetivo){
        this.logBatalla += personajeAtacante.atacar(personajeObjetivo);
        if(!personajeObjetivo.estaDerrotado()){
            this.logBatalla +=personajeObjetivo.atacar(personajeAtacante);
        }
    }

    resolucion(turno){
        this.logBatalla+="TURNO "+turno+"\n";
        if(this.p1.speed>this.p2.speed){
            this.realizarAtaques(p1,p2);
        }else if(this.p2.speed>this.p1.speed){
            this.realizarAtaques(p2,p1);
        }else{
            //en caso de que tengan misma speed
            const primeroEnAtacar=Math.floor(Math.random*2)+1;
            if (primeroEnAtacar==1){
                this.realizarAtaques(p1,p2);
            }else{
                this.realizarAtaques(p2,p1);
            }
        }
        this.logBatalla+="\n"; 
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
//comienzo combate
const combate=new Combate(p1,p2);
combate.combatir();






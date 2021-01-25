'use strict'
//botones
let encendido = document.getElementById("encendido");
encendido.addEventListener("click", iniciar);

let destino = document.getElementById("destino");
destino.addEventListener("click", definir_destino);

let arranque = document.getElementById("arranque");
arranque.addEventListener("click", arrancar);

let direccional_izquierda = document.getElementById("enc_direccional_izquierda");
direccional_izquierda.addEventListener("click", enc_direccional_izquierda);

let direccional_derecha = document.getElementById("enc_direccional_derecha");
direccional_derecha.addEventListener("click", enc_direccional_derecha);

let freno = document.getElementById('frenos');
freno.addEventListener("click", frenar);
//botones

function iniciar() {
    Nisan.encender();
}
function definir_destino() {
    Nisan.seleccionar_destino();
}
function arrancar() {
    Nisan.arrancar(0);
}
function enc_direccional_izquierda() {
    Nisan.enc_direccional_izquierda();
}
function enc_direccional_derecha() {
    Nisan.enc_direccional_derecha();
}
function frenar() {
    Nisan.frenar();
}

let recorrer; //Función que cuenta mediante un interval las funcionas básicas del recorrido
let cant_promedio = 0; //Veces que se cambió de velocidad

class Carro {
    constructor(cambio, freno_mano, encendido, arranque, tiempo) {
        this.cambio = cambio;
        this.freno_mano = freno_mano;
        this.encendido = encendido;
        this.arranque = arranque;
        this.direccional_izquierda = false;
        this.direccional_derecha = false;
        this.veces_frenado = 0;
        this.tiempo = tiempo;
        this.vel_promedio = 0;
        this.vel_maxima = 0;
        this.distancia_ms = 3000;
        this.distancia_pausa = 0;
        this.recorrer;
    } //Constructor

    encender() {

        let mensajes = document.getElementById("mensajes");

        //Verificar cambio
        setTimeout(() => { mensajes.innerHTML += "Verificando que el cambio esté en neutro..."; }, 1000);

        setTimeout(() => { mensajes.innerHTML = ` ... `; }, 3000);

        if (this.cambio === 0) {

            setTimeout(() => { mensajes.innerHTML = `¡Verificación exitosa!`; }, 5000);

        } else {
            setTimeout(() => { mensajes.innerHTML = `Corrigiendo cambio...`, this.cambio = 0; }, 5000);

            setTimeout(() => { mensajes.innerHTML += `¡Cambio corregido con exito!`; }, 7000);
        }   //Verificar cambio

        //Verificar freno de mano
        setTimeout(() => { mensajes.innerHTML = `Verificando que el freno de mano esté activado...`; }, 8000);

        if (this.freno_mano == true) {

            setTimeout(() => { mensajes.innerHTML = `¡Verificación exitosa!`; }, 10000);

        } else {
            setTimeout(() => { mensajes.innerHTML = `Activando el freno de mano...`; }, 10000);

            setTimeout(() => { mensajes.innerHTML = `¡Freno de mano activado con exito!`; }, 12000);
        }
        //Verificar freno de mano

        //Encendido
        setTimeout(() => { mensajes.innerHTML = `Encendiendo vehículo...`; }, 13000);

        setTimeout(() => { mensajes.innerHTML = `...`, this.encendido = true; }, 15000);

        setTimeout(() => { mensajes.innerHTML = `¡Vehículo encendido!`; }, 18000);
        //Encendido

        setTimeout(() => { mensajes.innerHTML = "Por favor, defina su destino";; }, 21000);
    } //Encender

    seleccionar_destino() {
        let mensajes = document.getElementById("mensajes");

        if (this.encendido) {
            this.distancia = prompt("Por favor, ingrese la distancia a recorrer: ");
            this.tiempo_paradas = Math.round(Math.random() * 4) + 1;
            this.distancia_ms = Math.round(this.distancia / 3.6);


            setTimeout(() => { mensajes.innerHTML = ` Estableciendo información del recorrido... `; }, 1000);

            setTimeout(() => { mensajes.innerHTML += ` ... `; }, 3000);

            setTimeout(() => { mensajes.innerHTML = ` Ruta del recorrido establecida, por favor presione el botón de "Arrancar" `; }, 5000);
        } else {
            mensajes.innerHTML = "<label style='color: red;'>Debe encender el vehículo antes de seleccionar destino.</label>"

            setTimeout(() => { mensajes.innerHTML = ''; }, 3000);
        }

    }//Seleccionar destino

    arrancar(x) {
        let param = x;
        let mensajes = document.getElementById("mensajes");

        if (this.encendido && this.distancia_ms != 0) {
            setTimeout(() => { mensajes.innerHTML = "Poniendo el clutch"; }, 0.500);
            //pone el clutch

            setTimeout(() => { mensajes.innerHTML = "Pisando el freno..."; }, 1500);

            setTimeout(() => { mensajes.innerHTML = `Desactivando el freno de mano...`, this.freno_mano = false;; }, 2500);
            //Freno de mano desactivado

            setTimeout(() => { mensajes.innerHTML = "Cambiando a primera...", this.cambio = 1;; }, 4000);
            //Cambio 1ra

            setTimeout(() => { mensajes.innerHTML = "Soltando el freno..."; }, 5000);
            //suelta el freno

            setTimeout(() => { mensajes.innerHTML = "Acelerando y soltando clutch..."; }, 6000);

            if (param == 0) {
                setTimeout(() => { mensajes.innerHTML = "¡Empieza el viaje!"; }, 8000);
            } else {
                setTimeout(() => { mensajes.innerHTML = "¡Continuamos!"; }, 8000);
            }

            setTimeout(() => { mensajes.innerHTML = "Cambiando a segunda...", this.cambio = 2; }, 10000);
            //Cambio 2da

            setTimeout(() => { Nisan.cambios(0); }, 11500);

            setTimeout(() => { mensajes.innerHTML = "Consejo: Puedes encender las direccionales izquierda y derecha con e y ñ respectivamente", this.cambio = 2; }, 11000);

            setTimeout(() => { mensajes.innerHTML = "También puedes girar usando R para la izquierda y L para la derecha.", this.cambio = 2; }, 13000);

            setTimeout(() => { mensajes.innerHTML = "", this.arranque = true; }, 15000);

        } else if (this.encendido) {
            mensajes.innerHTML = "<label style='color: red;'>Debe seleccionar un destino antes de arrancar.</label>"

            setTimeout(() => { mensajes.innerHTML = ''; }, 4000);
        } else {
            mensajes.innerHTML = "<label style='color: red;'>Debe encender el vehículo y seleccionar destino antes de arrancar.</label>"

            setTimeout(() => { mensajes.innerHTML = ' '; }, 2000);
        }

    } //Arrancar

    //Giros y direccionales
    enc_direccional_izquierda() {
        let mensajes = document.getElementById("mensajes");

        if (this.encendido) {
            if (this.direccional_izquierda == true) {
                this.direccional_izquierda = false;
                document.getElementById("direccional_izquierda").style = "opacity: 0;"
            } else {
                this.direccional_izquierda = true;
                document.getElementById("direccional_izquierda").style = "opacity: 1;"
            }
        } else {
            mensajes.innerHTML = "<label style='color: red;'>Debe encender el vehículo antes de activar direccionales.</label>"

            setTimeout(() => { mensajes.innerHTML = ''; }, 2500);
        }


    }//Direccional izquierda

    girar_izquierda() {
        if (this.direccional_izquierda === true && this.arranque === true) {
            mensajes.innerHTML = "Girando a la izquierda..."

            setTimeout(() => { mensajes.innerHTML = "Giro terminado", enc_direccional_izquierda(); }, 2000);
        } else if (this.arranque === false) {
            mensajes.innerHTML = "<label style='color: red;'>¡Debe arrancar el carro antes de girar!</label>"
            setTimeout(() => { mensajes.innerHTML = ""; }, 3000);
        } else {
            mensajes.innerHTML = "<label style='color: red;'>¡Debe activar las direccionales antes de girar!</label>"
            setTimeout(() => { mensajes.innerHTML = ""; }, 3000);
        }
    }//Girar izquierda

    enc_direccional_derecha() {
        let mensajes = document.getElementById("mensajes");

        if (this.encendido) {
            if (this.direccional_derecha == true) {
                this.direccional_derecha = false;
                document.getElementById("direccional_derecha").style = "opacity: 0;"
            } else {
                this.direccional_derecha = true;
                document.getElementById("direccional_derecha").style = "opacity: 1;"
            }
        } else {
            mensajes.innerHTML = "<label style='color: red;'>Debe encender el vehículo antes de activar direccionales.</label>"

            setTimeout(() => { mensajes.innerHTML = ''; }, 2500);
        }


    }//Direccional derecha

    girar_derecha() {
        let mensajes = document.getElementById("mensajes");

        if (this.direccional_derecha === true && this.arranque === true) {
            mensajes.innerHTML = "Girando a la derecha..."

            setTimeout(() => { mensajes.innerHTML = "Giro terminado", enc_direccional_derecha(); }, 2000);
        } else if (this.arranque === false) {

            mensajes.innerHTML = "<label style='color: red;'>¡Debe arrancar el carro antes de girar!</label>"
            setTimeout(() => { mensajes.innerHTML = ""; }, 3000);

        } else {

            mensajes.innerHTML = "<label style='color: red;'>¡Debe activar las direccionales antes de girar!</label>"
            setTimeout(() => { mensajes.innerHTML = ""; }, 3000);

        }
    }//Direccional derecha
    //Giros y direccionales

    cambios(x) {
        //variables
        const p_velocidad = document.getElementById("velocidad");
        const p_cambio = document.getElementById("cambio");
        let i = 0;
        let recorrido = 0;
        let distancia_ms = this.distancia_ms;
        let cambio = this.cambio;
        let vel_maxima = this.vel_maxima;
        let tiempo = this.tiempo;
        let velocidad_ms = 0;
        const velocidades = [40, 80, 120, 160, 220];
        let j = 0;
        //variables

        recorrer = setInterval(function () {
            if (i <= 220) {
                if (i > velocidades[j]) {
                    cambio++;
                    j++;
                }
                console.log("Recorrido: " + recorrido);
                velocidad_ms = Math.round(i / 3.6);
                recorrido += velocidad_ms;

                
                console.log("Recorrido 2: " + recorrido);

                p_velocidad.innerHTML = `Velocidad: ${i} km/h`;
                p_cambio.innerHTML = `Cambio actual: ${cambio}`;
            }
            if (i > vel_maxima) {
                vel_maxima = i;
            }

            i++;
            tiempo += 1;

            if (recorrido >= distancia_ms) {
                clearInterval(recorrer);
                this.vel_promedio = recorrido / i;
                this.vel_maxima = vel_maxima;
                this.tiempo = tiempo;
                Nisan.finalizar(i);
            }
        }, 1000);
    }//Cambios

    frenar() {
        clearInterval(recorrer);

        if (this.arranque == true) {
            //variables
            this.veces_frenado += 1;
            this.arranque = false //define que el carro está detenido
            document.getElementById("fondo").setAttribute('data-class', 'after');
            let i = 0;
            let timeleft = this.tiempo_paradas;
            let stop = document.getElementById("stop");
            //variables

            let restante = setInterval(function () {
                document.getElementById("restante").textContent = timeleft;
                timeleft--;
                if (timeleft < 0) {
                    document.getElementById("fondo").removeAttribute('data-class', 'after');
                    document.getElementById("restante").textContent = "";
                    stop.innerHTML = '';
                    Nisan.arrancar(1);
                    clearInterval(restante);
                }
                if (i == 1 && timeleft >= 0) {
                    document.getElementById("direccional_izquierda").style = "opacity: 1;";
                    document.getElementById("direccional_derecha").style = "opacity: 1;"
                    i--;
                } else {
                    document.getElementById("direccional_izquierda").style = "opacity: 0;";
                    document.getElementById("direccional_derecha").style = "opacity: 0;"
                    i++;
                }
            }, 1000);

            //Poner imagenes al iniciar
            stop.innerHTML = '<img src="./img/stop.png" alt="img" class="stop">';
            stop.style = "opacity: 1;"
            document.getElementById("direccional_izquierda").style = "opacity: 1;";
            document.getElementById("direccional_derecha").style = "opacity: 1;"
        } else {
            mensajes.innerHTML = "<label style='color: red;'>Debe arrancar el vehículo antes de frenar.</label>"
            setTimeout(() => { mensajes.innerHTML = ""; }, 3000);
        }

    }//frenar

    finalizar() {
        let mensajes = document.getElementById("mensajes");
        let p_velocidad = document.getElementById("velocidad");
        let p_cambio = document.getElementById("cambio");


        setTimeout(() => { p_velocidad.innerHTML = "0 km/h"; }, 2000);

        setTimeout(() => { p_cambio.innerHTML = "Neutro"; }, 2000);

        mensajes.innerHTML = "¡¡Haz llegado a tu destino!!";

        setTimeout(() => { mensajes.innerHTML = "Reversando para parquear..."; }, 2000);

        setTimeout(() => { mensajes.innerHTML = "Poniendo el freno de mano...", this.freno_mano = true; }, 4000);

        setTimeout(() => { mensajes.innerHTML = "Apagando el vehículo...", this.encendido = false; }, 6000);

        setTimeout(() => { mensajes.innerHTML = "Ahora dejame mostrarte información del recorrido"; }, 8000);

        setTimeout(() => { mensajes.innerHTML = "Calculando...", this.fase_2(); }, 11000);
    }//finalizar

    fase_2() {
        let mensajes = document.getElementById("mensajes");
        let veces_frenado = this.veces_frenado;
        console.log("Veces frenado: " + veces_frenado)
        let n = ((tiempo + (veces_frenado * this.tiempo_paradas)) / 60);

        tiempo = round(n, 2);
        vel_promedio = round(vel_promedio, 2)

        setTimeout(() => { mensajes.innerHTML = "En total el recorrido duró: " + tiempo + " horas" }, 1000);
        setTimeout(() => { mensajes.innerHTML = "La velocidad promedio durante el recorrido fué de " + vel_promedio + " km/h" }, 3000);
        setTimeout(() => { mensajes.innerHTML = "Finalmente, la velocidad máxima fué de  " + vel_maxima + " km/h" }, 6000);

        setTimeout(() => { mensajes.innerHTML = "¡Hasta la próxima!" }, 9000);
        setTimeout(() => { mensajes.innerHTML = "" }, 12000);
    }
} //Carro

const Nisan = new Carro(false, false, false, false, 0);

//Redondear a dos cifras
function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

//giros y direccionales
document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 69) {
        Nisan.enc_direccional_izquierda();
    }
});
document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 82) {
        Nisan.girar_izquierda();
    }
});
document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 76) {
        Nisan.girar_derecha();
    }
});
document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 192) {
        Nisan.enc_direccional_derecha();
    }
});


import React, { useState } from "react";

const JUGADOR1 = 'O';
const JUGADOR2 = 'X';

const Juego = () =>{

    const [casillas, setCastillas] = useState(['','','','','','','','','']);
    const [turno, setTurno] = useState(false);
    const [ganador, setGanador] = useState(0);

    const combinacion = (a,b,c, casillasActuales) =>{ 
        return (casillasActuales[a] === casillasActuales[b]) && (casillasActuales[b] === casillasActuales[c]);
    };

    const comprobarVictoria = (jugador, casillasActuales) =>{
        if(((jugador === casillasActuales[0]) && (combinacion(0,1,2,casillasActuales) || combinacion(0,4,8,casillasActuales) || combinacion(0,3,6,casillasActuales)))
        || ((jugador === casillasActuales[1]) && combinacion(1,4,7,casillasActuales)) 
        || ((jugador === casillasActuales[2]) && (combinacion(2,5,8,casillasActuales)||combinacion(2,4,6,casillasActuales))) 
        || ((jugador === casillasActuales[3]) && combinacion(3,4,5,casillasActuales))
        || ((jugador === casillasActuales[6]) && combinacion(6,7,8,casillasActuales))
        ){ 
            let numeroJugador = (jugador===JUGADOR1) ? 1 : 2;
            setGanador(numeroJugador);
        }
    };

    const handleClick = (index) =>{
        if(casillas[index]===''){
            let jugador;
            if (turno) jugador = JUGADOR1;
            else jugador = JUGADOR2;
            setTurno(!turno);
            var newCasillas= [...casillas];
            newCasillas[index]=jugador;
            setCastillas(newCasillas);
            comprobarVictoria(jugador, newCasillas);
        }
    }

    const reiniciar = () =>{
        setTurno(false);
        setGanador(0);
        setCastillas(['','','','','','','','','']);
    }

    return (
        <div className="contenedor2">
        <div className="cabecera">
            <button className="reiniciar" onClick={reiniciar}>Reiniciar</button>
        </div>
        <div className="juego">
            {casillas.map(
                (value, index) => 
                <div className="casilla" onClick={()=>handleClick(index)}>
                    <h1>{value}</h1>
                </div>
            )}
        </div>
        { ganador ? <div>Enhorabuena { (ganador===1) ? 'JUGADOR1' : 'JUGADOR2'}!!</div> : ''}
        </div>
    );
};

export default Juego;
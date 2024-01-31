import React, { useState } from "react";

const JUGADOR1 = 'O';
const JUGADOR2 = 'X';

const Juego = () =>{

    const [casillas, setCasillas] = useState(['','','','','','','','','']);
    const [completo, setCompleto] = useState(false);
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

    const comprobarCompleto = (casillasActuales) => {
        for (var i = 0; i < 9; i++) 
            if (casillasActuales[i] === '') return;
        setCompleto(true);
    }
    

    const handleClick = (index) =>{
        if(casillas[index]===''){
            let jugador;
            if (turno) jugador = JUGADOR1;
            else jugador = JUGADOR2;
            setTurno(!turno);
            var newCasillas= [...casillas];
            newCasillas[index]=jugador;
            setCasillas(newCasillas);
            comprobarVictoria(jugador, newCasillas);
            comprobarCompleto(newCasillas);
        }
    }

    const reiniciar = () =>{
        setTurno(false);
        setCompleto(false);
        setGanador(0);
        setCasillas(['','','','','','','','','']);
    }

    return (
        <div className="contenedor2">
        <div className="juego">
            {casillas.map(
                (value, index) => 
                <div className="casilla" key={index} onClick={(ganador===0)? ()=>handleClick(index) : undefined}>
                    <h1 className="jugador">{value}</h1>
                </div>
            )}
        </div>
        <div className="opciones">
            <img className="reset" 
            src="https://cdn.pixabay.com/photo/2012/04/13/00/18/button-31199_960_720.png" 
            onClick={reiniciar} alt="Imágen de reset"/>
            { ganador ? <div className="victoria">Enhorabuena { (ganador===1) ? 'JUGADOR 1' : 'JUGADOR 2'}!!</div> : ''}
            { (completo && ganador===0) ? <div className="victoria">Empate!!</div> : ''}
        </div>
        
        </div>
    );
};

export default Juego;
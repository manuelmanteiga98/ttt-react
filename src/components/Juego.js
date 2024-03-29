import React, { useState } from "react";
import Casilla from "./Casilla";
import Marcador from "./Marcador";

const JUGADOR1 = "O";
const JUGADOR2 = "X";

const Juego = () => {
  const [casillas, setCasillas] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [marcador, setMarcador] = useState([0, 0, 0]);
  const [completo, setCompleto] = useState(false);
  const [turno, setTurno] = useState(true);
  const [ganador, setGanador] = useState(0);

  const comprobarVictoria = (jugador, casillasActuales) => {
    const combinacion = (a, b, c, casillasActuales) => {
      return (
        casillasActuales[a] === casillasActuales[b] &&
        casillasActuales[b] === casillasActuales[c]
      );
    };

    if (
      (jugador === casillasActuales[0] &&
        (combinacion(0, 1, 2, casillasActuales) ||
          combinacion(0, 4, 8, casillasActuales) ||
          combinacion(0, 3, 6, casillasActuales))) ||
      (jugador === casillasActuales[1] &&
        combinacion(1, 4, 7, casillasActuales)) ||
      (jugador === casillasActuales[2] &&
        (combinacion(2, 5, 8, casillasActuales) ||
          combinacion(2, 4, 6, casillasActuales))) ||
      (jugador === casillasActuales[3] &&
        combinacion(3, 4, 5, casillasActuales)) ||
      (jugador === casillasActuales[6] &&
        combinacion(6, 7, 8, casillasActuales))
    ) {
      let numeroJugador = jugador === JUGADOR1 ? 1 : 2;
      setGanador(numeroJugador);
      var nuevoMarcador = [...marcador];
      nuevoMarcador[numeroJugador] += 1;
      setMarcador(nuevoMarcador);
      return true;
    }
    return false;
  };

  const comprobarCompleto = (casillasActuales) => {
    for (var i = 0; i < 9; i++) if (casillasActuales[i] === "") return false;
    setCompleto(true);
    return true;
  };

  const manejarClick = (index) => {
    if (casillas[index] === "") {
      let jugador;
      if (turno) jugador = JUGADOR1;
      else jugador = JUGADOR2;
      setTurno(!turno);
      var casillasActuales = [...casillas];
      casillasActuales[index] = jugador;
      setCasillas(casillasActuales);
      if (
        !comprobarVictoria(jugador, casillasActuales) &&
        comprobarCompleto(casillasActuales)
      ) {
        var nuevoMarcador = [...marcador];
        nuevoMarcador[0] += 1;
        setMarcador(nuevoMarcador);
      }
    }
  };

  const reiniciar = () => {
    setTurno(true);
    setCompleto(false);
    setGanador(0);
    setCasillas(["", "", "", "", "", "", "", "", ""]);
  };

  return (
    <div className="home">
      <Marcador
        empates={marcador[0]}
        jugador1={marcador[1]}
        jugador2={marcador[2]}
      />
      <div className="juego">
        {casillas.map((value, index) => (
          <Casilla
            key={index}
            value={value}
            click={ganador === 0 ? () => manejarClick(index) : undefined}
          />
        ))}
      </div>
      <div className="opciones">
        <img
          className="botonReset"
          src="https://cdn.pixabay.com/photo/2012/04/13/00/18/button-31199_960_720.png"
          onClick={reiniciar}
          alt="Imágen de reset"
        />
        {ganador ? (
          <div className="victoria">
            Enhorabuena {ganador === 1 ? "JUGADOR 1" : "JUGADOR 2"}!!
          </div>
        ) : undefined}
        {completo && ganador === 0 ? (
          <div className="victoria">Empate!!</div>
        ) : undefined}
      </div>
    </div>
  );
};

export default Juego;

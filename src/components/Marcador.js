import React from "react";

const Marcador = (props) => {
  const { empates, jugador1, jugador2 } = props;
  return (
    <div className="marcador">
      <h1 className="puntuacion">Empates:{empates}</h1>
      <h1 className="puntuacion">Jugador1:{jugador1}</h1>
      <h1 className="puntuacion">Jugador2:{jugador2}</h1>
    </div>
  );
};

export default Marcador;

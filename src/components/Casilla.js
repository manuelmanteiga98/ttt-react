import React from "react";

const Casilla = (params) =>{
    const {key, value, click} = params;
    return (
        <div key={key} className="casilla" onClick={click}>
            <h1 className="jugador">{value}</h1>
        </div>
    );
};

export default Casilla;
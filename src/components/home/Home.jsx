import React, { useEffect, useRef } from "react";
import "./Home.css";

const Home = ({ activarLocation }) => {
  const texto =
    "Hola! si quieres comprobar el clima en una ciudad en específico utiliza la barra de búsqueda superior o entérate de la temperatura en tu ciudad pulsando aquí abajo!";
  const indiceRef = useRef(0);
  const targetElement = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    function tipearTexto() {
      if (indiceRef.current < texto.length && targetElement.current) {
        targetElement.current.innerHTML += texto.charAt(indiceRef.current);
        indiceRef.current++;
        timeoutRef.current = setTimeout(tipearTexto, 70);
      }
    }

    tipearTexto();
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [texto]);

  return (
    <div className="home">
      <div className="home-container">
        <p className="presentation typing-animation" ref={targetElement}></p>
      </div>
      <img src={"./svg/clima.svg"} alt="weather" className="weather-svg" />
      <a onClick={activarLocation} className="my-location  heartbeat">
        ¿A qué temperatura estaremos?
      </a>
    </div>
  );
};

export default Home;

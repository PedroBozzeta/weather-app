import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";
import "./Forecast.css";
const days = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];
const Forecast = ({ data }) => {
  const today = new Date().getDay();
  const forecastDays = days
    .slice(today, days.length)
    .concat(days.slice(0, today));
  return (
    <>
      <label className="title">Pronóstico de los próximos 5 días</label>
      <Accordion allowZeroExpanded>
        {data.list.map((item, index) => {
          if ((index + 1) % 8 === 0) {
            return (
              <AccordionItem key={index}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className="daily-item">
                      <img
                        src={`icons/${item.weather[0].icon}.png`}
                        alt="weather"
                        className="icon-small"
                      />
                      <label className="day">
                        {forecastDays[(index + 1) / 8 - 1]}
                      </label>

                      <label className="description">
                        {item.weather[0].description}
                      </label>
                      <label className="max">
                        {" "}
                        Max temp <br />
                        {Math.round(item.main.temp_max)}°C
                      </label>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="daily-details-grid slide-bottom ">
                    <div className="daily-details-grid-item">
                      <label>Sensación Térmica</label>
                      <label>{Math.round(item.main.feels_like)}°C</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Humedad</label>
                      <label>{item.main.humidity}%</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Vientos</label>
                      <label>{item.wind.speed}m/s</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Temperatura Máxima</label>
                      <label>{Math.round(item.main.temp_max)}°C</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Nubes</label>
                      <label>{item.clouds.all}%</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Presión</label>
                      <label>{item.main.pressure}hPa</label>
                    </div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            );
          }
        })}
      </Accordion>
      <p className="creditos">Desarrollado por Pedro Bozzeta</p>
    </>
  );
};
export default Forecast;

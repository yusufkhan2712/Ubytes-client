import {useEffect, useState} from "react";

import "./pitimestyle.css"
const PickupTime1 = () => {
  const [timeList, setTimeList] = useState([])

  useEffect(()=>{
    const l = []
    for (let i = 0; i <= 52; i++) {
      const division = Math.floor(i/4);
      const rest = i % 4;
      l.push(`${division+8}:${rest===0 ? `0${rest}`:rest*15}`)
    }
    setTimeList(l)
  }, [])
  return (
    <div
      className="pitimestyle-container"
    >
      <div className="drawer__backdrop">
        <div className="drawer__container">
          <div className="timetable-panel">
            <div className="timetable-panel__days">
              <div
                className="timetable-panel__day"
              >
                <div
                  className
                >
                  Today
                </div>
              </div>
              <div
                className="timetable-panel__day"
              >
                <div
                  className="selected"
                >
                  Tomorrow
                </div>
              </div>
            </div>
            <div className="timetable-panel__times">
              <ul className="timetable-panel__scrollable">
                {timeList.map(item=>(
                  <li key={item}>
                    <div
                      className="timetable-panel__time"
                    >
                      {item}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupTime1;

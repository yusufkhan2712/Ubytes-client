import { useEffect, useState, useRef } from "react";
import { useOutsideAlerter } from "../../../../hooks";
import "./style.scss";
const PickupTime = ({
  selectedDay,
  setSelectedDay,
  selectedHour,
  setSelectedHour,
}) => {
  const timeRef = useRef(null);
  const [timeList, setTimeList] = useState([]);
  const [showTime, setShowTime] = useState(false);
  const [changeDay, onChangeDay] = useState(selectedDay || "Today");
  useOutsideAlerter(timeRef, setShowTime);

  useEffect(() => {
    if (changeDay === "Today") {
      const l = [];
      const currentHour =
        new Date().getHours() + 1 > 8 ? new Date().getHours() + 1 : 8;
      const len = Math.abs(currentHour - 23) * 4;
      for (let i = 0; i <= len; i++) {
        const division = Math.floor(i / 4);
        const rest = i % 4;
        l.push(
          `${division + currentHour}:${rest === 0 ? `0${rest}` : rest * 15}`
        );
      }
      setTimeList(l);
    } else if (changeDay === "Tomorrow") {
      const l = [];
      const currentHour = 8;
      const len = Math.abs(currentHour - 23) * 4 + 1;
      for (let i = 0; i <= len; i++) {
        const division = Math.floor(i / 4);
        const rest = i % 4;
        l.push(
          `${division + currentHour}:${rest === 0 ? `0${rest}` : rest * 15}`
        );
      }
      setTimeList(l);
    }
  }, [changeDay]);

  const onSelectedDay = (val) => {
    onChangeDay(val);
  };

  const onSelectHour = (hour) => {
    setSelectedHour(hour);
    setSelectedDay(changeDay);
    setShowTime(false);
  };
  return (
    <>
      <div className="PickupTime-container">
        <h4 className="title">Pickup time</h4>
        <div className="main-content">
          <div className="content" onClick={() => setShowTime(true)}>
            <div className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="15 15 70 70"
                fill="currentColor"
                className="fill-primary"
                style={{ width: 20, height: 20 }}
              >
                <path d="M50 18c-17.638 0-32 14.363-32 32s14.362 32 32 32c17.638 0 32-14.363 32-32 0-17.638-14.362-32-32-32zm0 6c14.395 0 26 11.605 26 26S64.395 76 50 76 24 64.395 24 50s11.605-26 26-26zm0 6a3 3 0 00-3 3v17c0 .828.332 1.582.875 2.125L58.5 62.719a2.971 2.971 0 004.219 0 2.971 2.971 0 000-4.219L53 48.75V33a3 3 0 00-3-3z"></path>
              </svg>
            </div>
            <div className="branch-infos">
              <small className="name">{selectedHour === "ASAP"? "ASAP":`${selectedDay} - ${selectedHour}`}</small>
            </div>
          </div>
          <span className="change-container">Change</span>
        </div>
        {showTime && (
          <div className="pickup-time-drawer">
            <div className="content" ref={timeRef}>
              <div className="days">
                <div
                  className={`day ${changeDay === "Today" ? "selected" : ""}`}
                  onClick={() => onSelectedDay("Today")}
                >
                  Today
                </div>
                <div
                  className={`day ${
                    changeDay === "Tomorrow" ? "selected" : ""
                  }`}
                  onClick={() => onSelectedDay("Tomorrow")}
                >
                  Tomorrow
                </div>
              </div>
              <div className="times-list">
                {changeDay === "Today" && (
                  <div
                    className={`time ${
                      selectedHour === "ASAP" ? "selected" : ""
                    }`}
                    onClick={() => onSelectHour("ASAP")}
                  >
                    ASAP
                  </div>
                )}
                {timeList.map((time) => (
                  <div
                    key={time}
                    className={`time ${
                      selectedHour === time ? "selected" : ""
                    }`}
                    onClick={() => onSelectHour(time)}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PickupTime;

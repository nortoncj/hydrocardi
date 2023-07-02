import React, {useEffect, useRef, useState} from 'react';

export const AnnouncementBar = () => {
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');
  const Announcement = useRef(null);

  let interval = useRef();
  const startTimer = () => {
    const countDownDate = new Date('Jan 01, 2024 00:00:00').getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  useEffect(() => {
    timerSeconds % 2  == 0 ? Announcement.current.style.setProperty("color", "black") : Announcement.current.style.setProperty("color", "transparent");
  },[timerSeconds])

  return (
    <div className=" bg-amber-600 opacity-75 content-center">
      <div
        className="block px-4 py-4 m-auto font-semibold text-center "
        id="announcement"
        ref={Announcement}
      >
        BUY A CARD AND GET A FREE ACCOUNT
      </div>
      <div className="flex  justify-center block " id="counter">
        <div className="text-center px-3 ">
          <span className="px-1 count number" id="days">
            {timerDays}
          </span>
          <small>Days</small>
        </div>
        <div className="text-center px-3">
          <span className="px-1 number" id="hours">
            {timerHours}
          </span>
          <small>Hours</small>
        </div>
        <div className="">
          <span className="px-1 count number" id="minutes">
            {timerMinutes}
          </span>
          <small>Minutes</small>
        </div>
        <div className="text-center px-3">
          <span className="px-1 count number" id="seconds">
            {timerSeconds}
          </span>
          <small>Seconds</small>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;

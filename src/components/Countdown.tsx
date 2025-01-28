import React, { useEffect, useState } from "react";

function Countdown({ onFinish }) {
  const targetDate = new Date("2025-02-18T00:00:00").getTime(); // Дата годовщины
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());
  const [isToday, setIsToday] = useState(false); // Сегодняшняя дата
  const [isPast, setIsPast] = useState(false); // Дата уже прошла
  const [isReset, setIsReset] = useState(false); // Состояние сброса таймера

  // Основной таймер
  useEffect(() => {
    if (isReset) return; // Пропускаем стандартный таймер, если он сброшен

    const now = Date.now();

    if (now < targetDate) {
      const timer = setInterval(() => {
        const timeRemaining = targetDate - Date.now();
        if (timeRemaining <= 0) {
          clearInterval(timer);
          setIsToday(true); // Сегодняшняя дата
        } else {
          setTimeLeft(timeRemaining);
        }
      }, 1000);

      return () => clearInterval(timer);
    } else if (now >= targetDate && now < targetDate + 24 * 60 * 60 * 1000) {
      // Если дата - сегодня
      setIsToday(true);
    } else {
      // Если дата уже прошла
      setIsPast(true);
    }
  }, [targetDate, isReset]);

  // Таймер для сброса
  useEffect(() => {
    if (!isReset) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onFinish();
          setIsReset(false); // Возвращаемся к обычному режиму
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isReset, onFinish]);

  // Глобальная команда для сброса таймера
  useEffect(() => {
    window.resetCountdownTo5Seconds = () => {
      console.log("%cТаймер сброшен до 5 секунд!", "color: #ff6f61; font-size: 16px;");
      setTimeLeft(5000); // Устанавливаем время на 5 секунд
      setIsReset(true); // Активируем режим сброса
    };
  }, []);

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${days}д ${hours}ч ${minutes}м ${seconds}с`;
  };

  const getDaysAgo = () => {
    const days = Math.floor((Date.now() - targetDate) / (1000 * 60 * 60 * 24));
    return days;
  };

  const handleSkipToTasks = () => {
    setIsPast(false); // Убираем состояние "прошлого"
    onFinish(); // Переход к заданиям
  };

  useEffect(() => {
    if (isToday) {
      // Переход к заданиям через 8 секунд
      const timer = setTimeout(() => {
        onFinish();
      }, 8000);

      return () => clearTimeout(timer); // Очищаем таймер при размонтировании
    }
  }, [isToday, onFinish]);

  // Если дата уже прошла
  if (isPast) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1 style={styles.header}>
          Наша годовщина была {getDaysAgo()} дней назад
        </h1>
        <button
          onClick={handleSkipToTasks}
          style={styles.button}
        >
          Перейти к заданиям
        </button>
      </div>
    );
  }

  // Если дата - сегодня
  if (isToday) {
    return (
      <div style={{ position: "relative", overflow: "hidden", textAlign: "center" }}>
        <h1 style={styles.header}>
          Наша годовщина уже сегодня!
        </h1>
        <p style={styles.subheader}>
          Приготовься к сюрпризу...
        </p>
      </div>
    );
  }

  // Если дата ещё не наступила
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={styles.header}>
        До нашей годовщины осталось:
      </h1>
      <p style={styles.timer}>
        {formatTime(timeLeft)}
      </p>
    </div>
  );
}

const styles = {
  header: {
    fontSize: "36px",
    marginBottom: "10px",
    color: "white",
    textShadow: "2px 2px 4px black", // Чёрная обводка текста
    fontFamily: "'Pacifico', cursive", // Красивый рукописный шрифт
  },
  subheader: {
    fontSize: "20px",
    marginBottom: "30px",
    color: "white",
    textShadow: "1px 1px 3px black",
    fontFamily: "'Roboto', sans-serif",
  },
  timer: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "white",
    textShadow: "2px 2px 6px black",
    fontFamily: "'Roboto Mono', monospace", // Монопространственный стиль для таймера
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#ff6f61",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Countdown;

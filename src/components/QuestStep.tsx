import React, { useState } from "react";

function QuestStep() {
  const [isIntroSlide, setIsIntroSlide] = useState(true); // Для начального слайда
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false); // Управляет отображением поля ввода
  const [isError, setIsError] = useState(false); // Управляет тряской кнопки
  const [isFinalSlide, setIsFinalSlide] = useState(false); // Для финального экрана
  const [secretMessage, setSecretMessage] = useState(""); // Для отображения секретного сообщения

  const tasks = [
    {
      title: "Первое задание!",
      description: "Найди письмо, спрятанное под подушкой.",
      key: "love2025",
      secretMessage: "Ты нашла это письмо! Я тебя люблю ❤️",
    },
    {
      title: "Второе задание",
      description: "Подойди к окну и смотри внимательно...",
      key: "window2025",
      secretMessage: "Ты замечаешь звёзды? Они прекрасны, как и ты ✨",
    },
    {
      title: "Третье задание",
      description: "Найди шоколадку на кухне 🍫",
      key: "sweet2025",
      secretMessage: "Ты заслужила это! Наслаждайся 🍫❤️",
    },
  ];

  const currentTask = tasks[currentTaskIndex];

  const handleCheckKey = () => {
    const reversedKey = currentTask.key.split("").reverse().join("");

    if (inputValue.trim() === reversedKey) {
      // Если ключ задом наперёд, показываем секретное сообщение
      setSecretMessage(currentTask.secretMessage);
    } else if (inputValue.trim() === currentTask.key) {
      // Успех: включаем свечение экрана
      document.body.style.boxShadow =
        "0 0 40px 20px #ff91a4, inset 0 0 40px 20px #ff6f61";

      setTimeout(() => {
        document.body.style.boxShadow = ""; // Убираем свечение
        setInputValue(""); // Очищаем поле
        setSecretMessage(""); // Убираем секретное сообщение
        setShowInput(false); // Поле ввода скрываем, показываем кнопку
        if (currentTaskIndex < tasks.length - 1) {
          setCurrentTaskIndex(currentTaskIndex + 1); // Переход к следующему заданию
        } else {
          setIsFinalSlide(true); // Переход на финальный экран
        }
      }, 1500);
    } else {
      // Ошибка: трясём кнопку
      setIsError(true); // Включаем состояние ошибки
      setTimeout(() => {
        setIsError(false); // Сбрасываем состояние ошибки через 1 секунду
      }, 1000);
    }
  };

  if (isIntroSlide) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          maxWidth: "90%", // Для мобильных
          margin: "0 auto", // Центровка
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Добро пожаловать!</h1>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Тебе предстоит пройти несколько заданий. Каждое задание содержит подсказку, 
          которая приведёт тебя к правильному ответу. Вводи ключ в поле для проверки. 
          Если всё верно — тебя ждёт следующее задание.
        </p>
        <button
          onClick={() => setIsIntroSlide(false)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "#ff6f61",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Я поняла
        </button>
      </div>
    );
  }

  if (isFinalSlide) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          maxWidth: "90%", // Для мобильных
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
          Спасибо за участие!
        </h1>
        <p style={{ fontSize: "18px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        maxWidth: "50%", // Для десктопов
        minWidth: "500px",
        margin: "0 auto", // Центровка
      }}
    >
      {/* Название задания */}
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>{currentTask.title}</h1>

      {/* Описание или секретное сообщение */}
      <p style={{ fontSize: "18px", marginBottom: "20px" }}>
        {secretMessage || currentTask.description}
      </p>

      {/* Поле ввода */}
      {showInput || secretMessage ? (
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Введите ключ"
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "2px solid #ccc",
              width: "200px",
              marginRight: "10px",
              transition: "border-color 0.3s",
            }}
          />
          <button
            onClick={handleCheckKey}
            className={`task-button ${isError ? "error" : ""}`}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              backgroundColor: isError ? "#ff6f6f" : "#ff6f61",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              animation: isError ? "shake 0.5s" : "none",
            }}
          >
            Проверить ключ
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className={`task-button ${isError ? "error" : ""}`}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: isError ? "#ff6f6f" : "#ff6f61",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            animation: isError ? "shake 0.5s" : "none",
          }}
        >
          Выполнила
        </button>
      )}
    </div>
  );
}

export default QuestStep;



import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

function QuestStep() {
  const [isIntroSlide, setIsIntroSlide] = useState(true); // Для начального слайда
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false); // Управляет отображением поля ввода
  const [isError, setIsError] = useState(false); // Управляет тряской кнопки
  const [isFinalSlide, setIsFinalSlide] = useState(false); // Для финального экрана
  const [secretMessage, setSecretMessage] = useState(""); // Для отображения секретного сообщения
  const inputRef = useRef(null); // Для фокуса на поле ввода

  const tasks = [
  {
    "title": "Завтрак с сюрпризом",
    "description": "Сегодня утром тебя ждёт вкусное начало дня. 🥐 Доставка из сервиса «Самокат» прибудет к твоей двери с сюрпризом. 🎁 Твоя задача — внимательно осмотреть доставку. В одном из пакетов тебя ждёт не только завтрак, но и подарок. 🎉 Найди внутри карточку с ключом, чтобы продолжить свой путь!",
    "key": "Сладкий старт",
    "secretMessage": "Даже простые моменты рядом с тобой становятся особенными. Доброе утро, любовь моя! ☀️💛"
  },
  {
    "title": "Секретный свет",
    "description": "Следующая точка — магазин подарков. 🎁 Внутри спрятан свет, который согреет тебя в любую ночь. ✨ Твоя задача — найти ночник в форме звезды, сердца или другого милого символа. 🌟 Когда выберешь ту форму, которая тебе по душе, скажи её название вслух, чтобы получить подарок и подсказку.",
    "key": "Свет сердца",
    "secretMessage": "Ты озаряешь мою жизнь, даже когда всё вокруг кажется тёмным. Спасибо, что ты есть. 💫✨"
  },
  {
    "title": "Цветы своими руками",
    "description": "Теперь отправляемся на прогулку по парку или набережной. 🌳 Найди немного вдохновения и собери мини-букет из того, что тебе попадётся: листья, веточки, цветы. 🌸 Твоя уникальная композиция — это ключ. Сделай её с любовью, и подарок станет твоим. ❤️",
    "key": "Природная магия",
    "secretMessage": "Когда ты рядом, природа становится ещё прекраснее. Твоя магия бесконечна. 🌺✨"
  },
  {
    "title": "Дрифт мечты",
    "description": "Время немного повеселиться! 🎉 Следующая точка — открытая площадка, где ты сможешь устроить свой первый дрифт. 🚗💨 Не переживай, мы начнём с чего-то маленького: попробуй угадать, что такое 'дрифт мечты'. Найди машину, которая готова гонять, и пусть начнётся шоу! 🏁 После завершения — ключ у тебя.",
    "key": "Дрифт-шоу",
    "secretMessage": "Ты заставляешь моё сердце разгоняться, как самая быстрая машинка. Обожаю тебя! 💞💨"
  },
  {
    "title": "Тортик-сюрприз",
    "description": "В холодильнике тебя ждёт сладкий сюрприз. 🎂 Найди коробку с тортиком, на которой есть кое-что особенное — наша дата. 🗓️ Чтобы открыть коробку, вспомни дату нашей годовщины и скажи её вслух. После этого сюрприз станет твоим!",
    "key": "Тортик любви",
    "secretMessage": "Каждая минута с тобой — это праздник. С тобой я всегда счастлив! 🥰🎉"
  },
  {
    "title": "Магия чая",
    "description": "Теперь отправляемся в уютный чайный магазин. 🍵 Найди там чай, который подходит именно тебе. Попробуй угадать, какой аромат ближе твоему сердцу. ❤️ Когда выберешь — это станет твоим ключом к награде.",
    "key": "Чай любви",
    "secretMessage": "С тобой даже самые простые моменты становятся теплее. Спасибо за это! 💕🍃"
  },
  {
    "title": "Романтический финал",
    "description": "Заканчиваем день ужином в нашем любимом кафе. 🍷 Здесь мы сделаем финальный штрих. Чтобы получить последний подарок, вспомни, какое наше первое блюдо или напиток стало особенным. 🥂 Или выбери что-то новое — пусть оно станет символом нашего нового года вместе.",
    "key": "Романтический вкус",
    "secretMessage": "Ты делаешь каждый момент особенным. Я люблю тебя больше, чем слова могут выразить. 💞🍷"
  },
  {
    "title": "Спа-перезагрузка",
    "description": "Финальная точка — это место, где ты сможешь расслабиться. 💆‍♀️ Ответь на вопрос: что для тебя настоящее счастье? (Подсказка: в этом слове спрятаны любовь и немного заботы). Когда ответишь правильно, подарок твой. 🎁",
    "key": "Массажный отдых",
    "secretMessage": "Каждое твоё счастливое мгновение делает меня счастливее. Люблю тебя! 💖🌺"
  }
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

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus(); // Фокус на поле ввода
    }
  }, [showInput]);

  if (isIntroSlide) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        style={{
          padding: "20px",
          textAlign: "center",
          maxWidth: "90%",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Ты готова открыть тайны этого дня?</h1>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Приветствую тебя в нашем маленьком приключении! 🌟
          Тебя ждут увлекательные задания, каждое из которых наполнено теплом и заботой. 🧩 В каждом задании спрятана подсказка, которая поможет найти ключ к следующему шагу. 🔑
          Вводи ключ в поле проверки, чтобы продвигаться дальше. Если всё верно, впереди тебя ждёт ещё больше сюрпризов и подарков! 🎁
          Готова начать наше волшебное путешествие? 💖
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
          Я готова!
        </button>
      </motion.div>
    );
  }

  if (isFinalSlide) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        style={{
          padding: "20px",
          textAlign: "center",
          maxWidth: "90%",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Спасибо за то, что прошла этот путь со мной! 💖</h1>
        <p style={{ fontSize: "18px" }}>
          Ты сделала это! Все задания выполнены, и каждое из них наполнило наш день особенным смыслом. 🌟
          Спасибо за твою улыбку, смех и искорки в глазах — они делают мою жизнь невероятно счастливой. Каждый момент с тобой — это подарок, и я благодарен за нашу любовь. ❤️
          Ты — самое прекрасное приключение в моей жизни, и это только начало. Люблю тебя бесконечно. 💞
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      style={{
        padding: "20px",
        textAlign: "center",
        maxWidth: "50%",
        minWidth: "500px",
        margin: "0 auto",
      }}
    >
      {/* Название задания */}
      <motion.h1
        key={currentTask.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: "24px", marginBottom: "10px" }}
      >
        {currentTask.title}
      </motion.h1>

      {/* Описание или секретное сообщение */}
      <motion.p
        key={secretMessage || currentTask.description}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: "18px", marginBottom: "20px" }}
      >
        {secretMessage || currentTask.description}
      </motion.p>

      {/* Поле ввода */}
      <AnimatePresence>
        {showInput || secretMessage ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginTop: "20px" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Введи ключ"
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
          </motion.div>
        ) : (
          <motion.button
            onClick={() => setShowInput(true)}
            className={`task-button ${isError ? "error" : ""}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              backgroundColor: isError ? "#ff6f6f" : "#ff6f61",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Я выполнила задание
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default QuestStep;
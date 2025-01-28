import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Countdown from "./components/Countdown.tsx";
import Hearts from './components/Hearts.tsx';
import HelpButton from './components/HelpButton.tsx';
import QuestStep from "./components/QuestStep.tsx";

declare global {
  interface Window {
    showInstructions: () => void;
    revealTasks: () => void;
    resetCountdownTo5Seconds: () => void;
    _developerMessageShown: boolean;
  }
}

function App() {
  useEffect(() => {
    // Проверяем, был ли уже выведен текст
    if (!window._developerMessageShown) {
      window._developerMessageShown = true; // Устанавливаем флаг

      console.log(
      "%cДобро пожаловать, программист! 🛠️",
      "color: #ff6f61; font-size: 20px; font-weight: bold;"
      );
      console.log(
        "Введите %cshowInstructions()%c или %crevealTasks()%c для подсказок.\n" +
        "%cresetCountdownTo5Seconds()%c - сбросить таймер до 5 секунд.",
        "color: #00aaff; font-weight: bold;",
        "",
        "color: #00aaff; font-weight: bold;",
        "",
        "color: #ff6f61; font-weight: bold;",
        ""
      );
    }

    // Регистрируем функции, если они ещё не зарегистрированы
    if (!window.showInstructions) {
      window.showInstructions = () => {
        console.log("%cИнструкции:", "color: #ff6f61; font-size: 20px;");
        console.log("1. Вводите ключи в заданиях, чтобы перейти к следующему.");
        console.log("2. Если вам нужны подсказки, активируйте 'revealTasks()'.");
        console.log("3. Получайте удовольствие от сайта! 💖");
      };
    }

    if (!window.revealTasks) {
      window.revealTasks = () => {
        console.log("%cСписок всех заданий и ключей:", "color: #ff6f61; font-size: 20px;");
        console.table([
          { Задание: "Завтрак с сюрпризом", Ключ: "Сладкий старт" },
          { Задание: "Секретный свет", Ключ: "Свет сердца" },
          { Задание: "Цветы своими руками", Ключ: "Природная магия" },
          { Задание: "Дрифт мечты", Ключ: "Дрифт-шоу" },
          { Задание: "Тортик-сюрприз", Ключ: "Тортик любви" },
          { Задание: "Магия чая", Ключ: "Чай любви" },
          { Задание: "Романтический финал", Ключ: "Романтический вкус" },
          { Задание: "Спа-перезагрузка", Ключ: "Массажный отдых" },
        ]);
      };
    }
  }, []);

  const [isCountdownFinished, setCountdownFinished] = useState(false);
  const [isCountdownHidden, setCountdownHidden] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [heartsHidden, setHeartsHidden] = useState(false); // Для плавного исчезновения сердечек
  const [confettiOpacity, setConfettiOpacity] = useState(1); // Для плавного угасания конфетти

  const handleFinish = () => {
    // Плавно скрываем сердечки перед началом конфетти
    setHeartsHidden(true);

    setTimeout(() => {
      // После исчезновения сердечек запускаем конфетти
      setShowConfetti(true);
      setTimeout(() => {
        // Плавно уменьшаем прозрачность конфетти
        setConfettiOpacity(0);
        setTimeout(() => {
          setShowConfetti(false); // Убираем конфетти
          setCountdownHidden(true); // Скрываем таймер
        }, 1000); // Ждём окончания плавного угасания конфетти
      }, 3000); // Конфетти длится 3 секунды
    }, 0); // Ждём 1.5 секунды для исчезновения сердечек

    setTimeout(() => {
      setCountdownFinished(true); // Переходим к заданиям
    }, 6000); // Учитываем время исчезновения сердечек и конфетти
  };

  return (
    <div className="container" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Сердечки как глобальный фон */}
      <Hearts show={true} heartsHidden={heartsHidden} count={50} />

      {/* Конфетти */}
      {showConfetti && (
        <div
          style={{
            opacity: confettiOpacity,
            transition: "opacity 1s ease-out",
          }}
        >
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}

      {/* Анимация таймера */}
      <AnimatePresence>
        {!isCountdownHidden && (
          <motion.div
            key="countdown"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <Countdown onFinish={handleFinish} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Анимация заданий */}
      <AnimatePresence>
        {isCountdownFinished && (
          <motion.div
            key="quest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <QuestStep />
          </motion.div>
        )}
      </AnimatePresence>
      <HelpButton />
    </div>
  );
}

export default App;


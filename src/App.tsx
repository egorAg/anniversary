import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Confetti from "react-confetti";
import Countdown from "./components/Countdown.tsx";
import QuestStep from "./components/QuestStep.tsx";

function App() {
  const [isCountdownFinished, setCountdownFinished] = useState(false);
  const [isCountdownHidden, setCountdownHidden] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHearts, setShowHearts] = useState(true); // Управляет отображением сердечек
  const [heartsHidden, setHeartsHidden] = useState(false); // Для плавного исчезновения сердечек
  const [confettiOpacity, setConfettiOpacity] = useState(1); // Для плавного угасания конфетти

  const handleFinish = () => {
    // Сначала плавно скрываем сердечки
    setHeartsHidden(true);
    setTimeout(() => {
      // После исчезновения сердечек запускаем конфетти
      setShowHearts(false); // Полностью убираем сердечки
      setShowConfetti(true);
      setTimeout(() => {
        // Плавно уменьшаем прозрачность конфетти
        setConfettiOpacity(0);
        setTimeout(() => {
          setShowConfetti(false); // Убираем конфетти
          setCountdownHidden(true); // Скрываем таймер
        }, 1000); // Ждём окончания плавного угасания конфетти
      }, 3000); // Конфетти длится 3 секунды
    }, 1500); // Ждём 1.5 секунды для исчезновения сердечек
    setTimeout(() => {
      setCountdownFinished(true); // Переходим к заданиям
    }, 7500); // Учитываем время исчезновения сердечек и конфетти
  };

  return (
    <div className="container">
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
            <Countdown
              onFinish={handleFinish}
              showHearts={showHearts}
              heartsHidden={heartsHidden}
            />
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
    </div>
  );
}

export default App;


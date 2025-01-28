import React, { useEffect, useMemo, useState } from "react";

function Hearts({ show, heartsHidden, count = 50 }) {
  // Генерируем сердечки только один раз
  const hearts = useMemo(() => {
    const emojiHearts = ["❤️", "💕", "💖", "💘", "💗", "💓", "💞"];

    const generateHearts = (count) => {
      return Array.from({ length: count }, (_, index) => {
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * 5;
        const randomDuration = Math.random() * 5 + 3;
        const randomSize = Math.random() * 20 + 10;
        const randomEmoji =
          emojiHearts[Math.floor(Math.random() * emojiHearts.length)];

        return {
          id: index,
          emoji: randomEmoji,
          style: {
            left: `${randomLeft}%`,
            animationDelay: `${randomDelay}s`,
            animationDuration: `${randomDuration}s`,
            fontSize: `${randomSize}px`,
            top: "-100px",
          },
        };
      });
    };

    return generateHearts(count);
  }, [count]);

  // Управляем видимостью сердечек
  const [visibleHearts, setVisibleHearts] = useState(hearts);

  useEffect(() => {
    // Обновляем стиль сердечек в зависимости от heartsHidden
    setVisibleHearts(
      hearts.map((heart) => ({
        ...heart,
        style: {
          ...heart.style,
          opacity: heartsHidden ? 0 : 1,
          transition: "opacity 1.5s ease",
        },
      }))
    );
  }, [hearts, heartsHidden]);

  return (
    <div
      className="heart-container"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Чтобы сердечки не мешали кликам
        overflow: "hidden",
        zIndex: -1, // Чтобы они всегда были фоном
      }}
    >
      {show &&
        visibleHearts.map((heart) => (
          <div key={heart.id} className="heart" style={heart.style}>
            {heart.emoji}
          </div>
        ))}
    </div>
  );
}

export default Hearts;

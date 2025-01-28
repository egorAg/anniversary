import React, { useState } from "react";

function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHelp = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Кнопка в правом нижнем углу */}
      <div
        onClick={toggleHelp}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "50px",
          height: "50px",
          backgroundColor: "#ff6f61",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        ?
      </div>

      {/* Модальное окно с подсказками */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            width: "400px",
            zIndex: 1000,
          }}
        >
          <h3 style={{ color: "#ff6f61", marginBottom: "10px" }}>Подсказки</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            <li>🔑 Вводите ключи, чтобы переходить к заданиям.</li>
            <li>📜 Получайте подсказки, вводя команды в консоль.</li>
            <li>💡 Если возникли вопросы, обратитесь за помощью.</li>
          </ul>
          <button
            onClick={toggleHelp}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              fontSize: "14px",
              borderRadius: "5px",
              backgroundColor: "#ff6f61",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Закрыть
          </button>
        </div>
      )}
    </>
  );
}

export default HelpButton;

import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Funksion për shtimin e një notification të re
  const addNotification = (notif) => {
    setNotifications(prev => [
      { id: Date.now(), read: false, ...notif },
      ...prev
    ]);
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Simulim: shton një notification të re çdo 10 sekonda
  useEffect(() => {
    const interval = setInterval(() => {
      const titles = ["Booking confirmed", "New deal available", "Flight delayed"];
      const messages = [
        "Your flight is confirmed!",
        "Check our last minute deals!",
        "Your flight has a 30 min delay"
      ];
      const idx = Math.floor(Math.random() * titles.length);
      addNotification({ title: titles[idx], message: messages[idx] });
    }, 10000); // 10 sekonda

    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

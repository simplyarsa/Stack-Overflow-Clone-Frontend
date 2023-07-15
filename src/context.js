import { createContext, useEffect, useState } from "react";

export const MenuBarContext = createContext();

export const MenuBarContextProvider = ({ children }) => {
    const [slideIn, setSlideIn] = useState(true);

    useEffect(() => {
        if (window.innerWidth <= 760) {
          setSlideIn(false);
        }
      }, []);

  return (
    <MenuBarContext.Provider value={{slideIn, setSlideIn}}>
      {children}
    </MenuBarContext.Provider>
  );
};

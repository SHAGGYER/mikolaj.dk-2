import { createContext } from "react";

export const AppContext = createContext({
  scrollY: 0,
  setScrollY: () => null,
  navbarOpen: false,
  setNavbarOpen: () => null,
  isMobile: false,
  currentComponent: null,
  setCurrentComponent: () => null,
});

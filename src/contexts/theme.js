import { createContext } from "react";



const light_theme = {
  color1: '#86B6F6',
  color2: '#EEF5FF',
  color3: '#B4D4FF',
  color4: '#CAEDFF',
};
  
const dark_theme = {
  color1: '#092635',
  color2: '#1B4242',
  color3: '#5C8374',
  color4: '#9EC8B9'
};
  
const ThemeContext = createContext(light_theme);

export { ThemeContext, light_theme, dark_theme };
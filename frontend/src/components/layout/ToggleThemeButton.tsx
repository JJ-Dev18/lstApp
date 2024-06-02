import {  SunIcon, MoonIcon } from "@chakra-ui/icons";
import {  IconButton,  useColorMode } from "@chakra-ui/react";


function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
     
      variant="ghost"
      aria-label="Toggle Theme"
    />
  );
}

export default ToggleThemeButton;
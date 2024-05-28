// ThemeToggleButton.tsx
import * as React from "react";
import { Button, useColorMode } from "@chakra-ui/react";

const ThemeToggleButton: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} variant="outline">
      {colorMode === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
};

export default ThemeToggleButton;

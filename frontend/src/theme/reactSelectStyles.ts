import { Theme } from "@chakra-ui/react";
import { StylesConfig } from "react-select";

const customStyles = (theme: Theme, colorMode: "light" | "dark"): StylesConfig => ({
  control: (provided, state) => ({
    ...provided,
    backgroundColor: colorMode === "light" ? theme.colors.white : theme.colors.gray[800],
    borderColor: state.isFocused
      ? theme.colors.blue[500]
      : colorMode === "light" ? theme.colors.gray[200] : theme.colors.gray[600],
    boxShadow: state.isFocused ? `0 0 0 1px ${theme.colors.blue[500]}` : "none",
    "&:hover": {
      borderColor: state.isFocused
        ? theme.colors.blue[500]
        : colorMode === "light" ? theme.colors.gray[300] : theme.colors.gray[600],
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: colorMode === "light" ? theme.colors.white : theme.colors.gray[800],
    color: colorMode === "light" ? theme.colors.gray[800] : theme.colors.white,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? theme.colors.blue[500]
      : state.isFocused
      ? colorMode === "light" ? theme.colors.gray[100] : theme.colors.gray[700]
      : "transparent",
    color: state.isSelected ? "white" : "inherit",
    "&:hover": {
      backgroundColor: state.isSelected
        ? theme.colors.blue[600]
        : colorMode === "light" ? theme.colors.gray[200] : theme.colors.gray[600],
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: colorMode === "light" ? theme.colors.gray[100] : theme.colors.gray[700],
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: colorMode === "light" ? theme.colors.gray[800] : theme.colors.gray[200],
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    backgroundColor: colorMode === "light" ? theme.colors.gray[200] : theme.colors.gray[600],
    color: colorMode === "light" ? theme.colors.gray[800] : theme.colors.gray[200],
    "&:hover": {
      backgroundColor: colorMode === "light" ? theme.colors.gray[300] : theme.colors.gray[500],
    },
  }),
});

export default customStyles;

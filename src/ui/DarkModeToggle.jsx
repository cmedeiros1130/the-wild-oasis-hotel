import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;

type ThemeMode = "light" | "dark";
type FontSize = "small" | "medium" | "large";

export interface IThemeContextProps {
  mode: ThemeMode;
  fontSize: FontSize;
  toggleTheme: () => void;
  changeFontSize: (size: FontSize) => void;
}

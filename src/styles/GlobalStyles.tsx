import { GlobalStyles as MuiGlobalStyles } from "@mui/system";

const GlobalStyles = () => {
  return (
    <MuiGlobalStyles
      styles={{
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        "html, body, #root": {
          height: "100%",
        },
        body: {
          fontFamily: "Roboto, sans-serif",
        },
      }}
    />
  );
};

export default GlobalStyles;

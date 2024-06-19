import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Grid,
  Typography,
  Stack,
  colors,
} from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";
const Settings: React.FC = () => {
  const { mode, fontSize, toggleTheme, changeFontSize } = useThemeContext();

  const handleFontSizeChange = (event: SelectChangeEvent) => {
    changeFontSize(event.target.value as "small" | "medium" | "large");
  };

  return (
    <Grid container spacing={2} justifyContent="center" p={2}>
      <Grid item xs={12} md={6}>
        <Stack
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={1}
        >
          <Typography variant="h4" color={colors.blue[400]} gutterBottom>
            Settings
          </Typography>
        </Stack>
        <Button
          onClick={toggleTheme}
          variant="contained"
          color="primary"
          fullWidth
        >
          Toggle Theme to {mode === "light" ? "Dark" : "Light"}
        </Button>
        <FormControl fullWidth margin="normal">
          <InputLabel id="font-size-label">Font Size</InputLabel>
          <Select
            labelId="font-size-label"
            id="font-size-select"
            value={fontSize}
            label="Font Size"
            onChange={handleFontSizeChange}
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Settings;

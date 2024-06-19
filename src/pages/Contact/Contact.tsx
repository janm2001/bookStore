import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Stack,
  colors,
} from "@mui/material";
import { IFormData, IFormErrors } from "./types";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<IFormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const tempErrors: IFormErrors = {};
    tempErrors.username =
      formData.username.length >= 8
        ? ""
        : "Username must be at least 8 characters.";
    tempErrors.email = /\S+@\S+\.\S+/.test(formData.email)
      ? ""
      : "Email is not valid.";
    tempErrors.subject = formData.subject ? "" : "Subject is required.";
    tempErrors.message = formData.message ? "" : "Message is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" py={2} px={2}>
      <Grid item xs={12} md={6}>
        <Stack
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={1}
        >
          <Typography variant="h4" color={colors.blue[400]} gutterBottom>
            Contact
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            name="username"
            label="Username"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            name="email"
            label="Email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            name="subject"
            label="Subject"
            fullWidth
            margin="normal"
            value={formData.subject}
            onChange={handleChange}
            error={!!errors.subject}
            helperText={errors.subject}
          />
          <TextField
            name="message"
            label="Message"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Contact;

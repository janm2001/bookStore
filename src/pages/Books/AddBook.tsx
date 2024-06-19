import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { IBook } from "./types";

const AddBook: React.FC = () => {
  const navigate = useNavigate();

  const initialBookState: IBook = {
    id: "",
    title: "",
    authors: "",
    publishedDate: "",
    pageCount: 0,
    imageLinks: {
      smallThumbnail: "",
      thumbnail: "",
    },
  };

  const [newBook, setNewBook] = useState<IBook>(initialBookState);
  const [picture, setPicture] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const imageUrl = URL.createObjectURL(file!);
    setNewBook((prev: IBook) => ({
      ...prev,
      imageLinks: {
        smallThumbnail: imageUrl,
        thumbnail: imageUrl,
      },
    }));
    setPicture(imageUrl);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook((prev: IBook) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    // Add the new book (update local storage or make an API call)
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    const updatedBooks = [
      ...storedBooks,
      { ...newBook, id: Date.now().toString() },
    ];
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Box py={2} px={2} maxWidth="600px" mx="auto">
      <Typography variant="h4" gutterBottom>
        Add New Book
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          name="title"
          label="Title"
          value={newBook.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="authors"
          label="Authors"
          value={newBook.authors}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="publishedDate"
          label="Published Date"
          value={newBook.publishedDate}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="pageCount"
          label="Page Count"
          type="number"
          value={newBook.pageCount}
          onChange={handleChange}
          fullWidth
        />
        <Typography variant="h6" gutterBottom>
          Current Picture:
        </Typography>
        <Stack display="flex" alignItems="center" justifyContent="center">
          <img
            src={picture}
            alt="Thumbnail"
            style={{ width: "100px", height: "100px" }}
          />
        </Stack>
        <Button variant="contained" component="label" color="primary">
          Upload Thumbnail
          <input
            type="file"
            name="thumbnail"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddBook;

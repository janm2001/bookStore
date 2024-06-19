import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { IBook } from "./types";

const EditBook: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state as { book: IBook };

  const [editedBook, setEditedBook] = useState<IBook>(book);
  const [picture, setPicture] = useState(book.imageLinks.thumbnail);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const imageUrl = URL.createObjectURL(file!);
    setEditedBook((prev: IBook) => ({
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
    setEditedBook((prev: IBook) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAccept = () => {
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    const updatedBooks = storedBooks.map((b: IBook) =>
      b.id === editedBook.id ? editedBook : b
    );
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Box py={2} px={2} maxWidth="600px" mx="auto">
      <Typography variant="h4" gutterBottom>
        Edit Book
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          name="title"
          label="Title"
          value={editedBook.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="authors"
          label="Authors"
          value={editedBook.authors}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="publishedDate"
          label="Published Date"
          value={editedBook.publishedDate}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="pageCount"
          label="Page Count"
          type="number"
          value={editedBook.pageCount}
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
          <Button variant="contained" color="primary" onClick={handleAccept}>
            Accept
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditBook;

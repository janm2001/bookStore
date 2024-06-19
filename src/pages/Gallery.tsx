import React, { useState, useEffect } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
  colors,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IBook } from "./Books/types";

const Gallery: React.FC = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [selectedBookIndex, setSelectedBookIndex] = useState<number | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedBookIndex(index);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedBookIndex(null);
  };

  const handlePrevious = () => {
    if (selectedBookIndex !== null && selectedBookIndex > 0) {
      setSelectedBookIndex(selectedBookIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedBookIndex !== null && selectedBookIndex < books.length - 1) {
      setSelectedBookIndex(selectedBookIndex + 1);
    }
  };

  const selectedBook =
    selectedBookIndex !== null ? books[selectedBookIndex] : null;

  return (
    <Box py={2} px={2}>
      <Stack display="flex" alignItems="center" justifyContent="center" py={1}>
        <Typography variant="h4" color={colors.blue[400]} gutterBottom>
          Books Gallery
        </Typography>
      </Stack>
      <ImageList variant="masonry" cols={3} gap={8}>
        {books.map((book, index) => (
          <ImageListItem key={book.id} onClick={() => handleImageClick(index)}>
            <img
              src={book.imageLinks?.thumbnail}
              alt={book.title}
              style={{ cursor: "pointer", width: "100%", height: "auto" }}
            />
            <Typography variant="subtitle1" align="center">
              {book.title}
            </Typography>
          </ImageListItem>
        ))}
      </ImageList>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedBook?.title}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedBook && (
            <Box>
              {selectedBook.imageLinks?.thumbnail && (
                <img
                  src={selectedBook.imageLinks.thumbnail}
                  alt={selectedBook.title}
                  style={{
                    width: "100%",
                    height: "65vh",
                    marginBottom: "16px",
                  }}
                />
              )}
            </Box>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={handlePrevious}
              disabled={selectedBookIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={handleNext}
              disabled={selectedBookIndex === books.length - 1}
            >
              Next
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Gallery;

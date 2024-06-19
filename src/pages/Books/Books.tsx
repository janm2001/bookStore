import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import {
  Typography,
  IconButton,
  Box,
  Stack,
  Button,
  colors,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { IBook, IBooksResponse } from "./types";
import { useNavigate } from "react-router-dom";
import { AddCircle } from "@mui/icons-material";
import { useThemeContext } from "../../context/ThemeContext";

const Books: React.FC = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const navigate = useNavigate();
  const { mode } = useThemeContext(); // Use the ThemeContext
  const theme = useTheme();

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      fetchBooks();
    }
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=free+books&maxResults=10"
      );
      const data = response.data.items.map((item: IBooksResponse) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors
          ? item.volumeInfo.authors.join(", ")
          : "Unknown",
        publishedDate: item.volumeInfo.publishedDate,
        pageCount: item.volumeInfo.pageCount,
        imageLinks: item.volumeInfo.imageLinks,
      }));
      setBooks(data);
      localStorage.setItem("books", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleEdit = (book: IBook) => {
    navigate(`/${book.id}/edit`, { state: { book } });
  };

  const handleAdd = () => {
    navigate("/add");
  };

  const handleDelete = (id: string) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "authors", headerName: "Authors", flex: 1 },
    { field: "pageCount", headerName: "Page Count", flex: 1 },
    { field: "publishedDate", headerName: "Published Date", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        const book = books.find((book) => book.id === params.id);
        return (
          <>
            <IconButton
              color="primary"
              onClick={() => book && handleEdit(book)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleDelete(`${params.id}`)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const dataGridStyles = {
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor:
        mode === "dark"
          ? theme.palette.primary.dark
          : theme.palette.primary.light,
      color:
        mode === "dark"
          ? theme.palette.common.white
          : theme.palette.common.black,
      borderBottom: "2px solid #e0e0e0",
    },
    "& .MuiDataGrid-columnHeader": {
      borderRight: "1px solid #e0e0e0",
      padding: "0 12px",
    },
    "& .MuiDataGrid-columnHeader:last-child": {
      borderRight: "none",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      padding: theme.spacing(1),
      fontSize: "1.1rem",
      fontWeight: 600,
      textAlign: "center",
    },
    "& .MuiDataGrid-columnHeader:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "& .MuiDataGrid-cell": {
      color:
        mode === "dark"
          ? theme.palette.common.white
          : theme.palette.common.black,
    },
    backgroundColor:
      mode === "dark" ? theme.palette.common.black : theme.palette.common.white,
  };

  return (
    <Box py={2} px={2}>
      <Stack display="flex" alignItems="center" justifyContent="center" py={1}>
        <Typography variant="h4" color={colors.blue[400]} gutterBottom>
          Books Collection
        </Typography>
      </Stack>
      <Stack
        py={2}
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Stack>

      <Box sx={{ height: "600px", width: "100%" }} p={2}>
        <DataGrid rows={books} columns={columns} sx={dataGridStyles} />
      </Box>
    </Box>
  );
};

export default Books;

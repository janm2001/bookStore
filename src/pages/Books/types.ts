export interface IBook {
  id: string;
  title: string;
  authors: string;
  publishedDate: string;
  pageCount: number;
  imageLinks: IImageLinks;
}

export interface IBooksResponse {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publishedDate: string;
    pageCount: number;
    imageLinks: IImageLinks;
  };
}

interface IImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5559/books/${id}`)
      .then((response) => {
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  console.log(book);

  return (
    <div className="p-8">
      <div className="flex items-center">
        <BackButton />
        <h1 className="text-xl font-semibold">Show Book Detail</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg">ID : </h1>
            <span>{book._id}</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Title : </h1>
            <span>{book.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Author : </h1>
            <span>{book.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Published Year : </h1>
            <span>{book.publishedYear}</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Create Time : </h1>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Last Update Time : </h1>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBooks;

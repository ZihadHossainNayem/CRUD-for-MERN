import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5559/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-3xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full mt-12">
          <thead>
            <tr className="border-b border-slate-200">
              <th>Number</th>
              <th>Title</th>
              <th>Author</th>
              <th>Published Year</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="border-b border-slate-200">
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{book.title}</td>
                <td className="text-center">{book.author}</td>
                <td className="text-center">{book.publishedYear}</td>
                <td className="flex justify-center gap-4 py-4">
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;

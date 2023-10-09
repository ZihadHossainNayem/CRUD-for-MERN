import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5559/books/${id}`)
      .then((response) => {
        setTitle(response.data.book.title);
        setAuthor(response.data.book.author);
        setPublishedYear(response.data.book.publishedYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("Error occurred, check the console");
        console.log(error);
      });
  }, []);

  const handleEditBooks = () => {
    const data = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5559/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check console");
        console.log(error);
      });
  };
  return (
    <div className="p-8">
      <div className="flex pb-12">
        <BackButton />
        <h1 className="text-2xl font-semibold">Edit Book</h1>
      </div>
      {loading ? <Spinner /> : ""}
      <div className="w-[80%] flex flex-col border p-4 rounded mx-auto">
        <div className="px-4 text-lg pt-2 w-full">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-400 px-2 py-1 w-full"
          />
        </div>
        <div className="px-4 text-lg pt-4 w-full">
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-400 px-2 py-1 w-full"
          />
        </div>
        <div className="px-4 text-lg pt-4 w-full">
          <label>Published Year:</label>
          <input
            type="text"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="border-2 border-gray-400 px-2 py-1 w-full"
          />
        </div>
        <button
          className="px-2 py-1 rounded border border-black mt-4 mx-auto"
          onClick={handleEditBooks}
        >
          Save Edit
        </button>
      </div>
    </div>
  );
};

export default EditBooks;

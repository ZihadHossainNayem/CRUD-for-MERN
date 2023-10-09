import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const handleSaveBooks = () => {
    const data = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5559/books", data)
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
        <h1 className="text-2xl font-semibold">Create Book</h1>
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
          onClick={handleSaveBooks}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;

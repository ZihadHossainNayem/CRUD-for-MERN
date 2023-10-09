import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5559/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("Error occurred. Check console");
        console.log(error);
      });
  };

  return (
    <div className="p-8">
      <div className="flex items-center ">
        <BackButton />
        <h1 className="text-lg font-semibold">Delete Book</h1>
      </div>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col justify-center mt-12 p-4 text-lg border-2 rounded-xl">
        <h1 className="mx-auto mb-4">
          Are you sure you want to to delete the book?
        </h1>
        <button
          className="mx-auto bg-white text-red-600 px-4 py-2 w-24 
        rounded-lg hover:bg-red-600 hover:text-white border border-red-600"
          onClick={handleDeleteBook}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;

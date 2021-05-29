import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import Axios from "axios";
import "./App.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("");

  const url="https://vsi5vy3ekc.execute-api.ap-south-1.amazonaws.com/sls-complete"

  useEffect(() => {
    Axios.get(url).then((response) => {
      console.log(response.data);
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post(url, {
      params:{
      movieName: movieName,
      movieReview: review,
    }
  });
    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(url, {
      params:{
      movieName: movie
    }
  });
    window.location.reload();
  };

  const updateReview = (movie) => {
    Axios.put(url, {
      params:{
      movieName: movie,
      movieReview: newReview,
    }
  });
    setNewReview("");
    window.location.reload();
  };

  return (
    <div className="App">
      <h1> CRUD APPLICATION </h1>
      <div className="form">
        <label>Movie Name</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        ></input>
        <label>Review</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        ></input>
        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>

              <button
                onClick={() => {
                  deleteReview(val.movieName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              ></input>
              <button
                onClick={() => {
                  updateReview(val.movieName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

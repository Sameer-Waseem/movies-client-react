import React from "react";

const ListGroup = ({ genres, onGenreSelect, selectedGenre }) => {
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          onClick={() => onGenreSelect(genre)}
          key={genre._id}
          style={{ cursor: "pointer" }}
          className={
            genre._id === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;

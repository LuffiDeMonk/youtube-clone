import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getPopularVideos,
  getVideoCategories,
  getVideosByCategory,
  setActiveCategory,
} from "../../Features/YoutubeSlice";
import "./Categories.css";

const Categories = () => {
  const [activeElement, setActiveElement] = useState("");
  const handleClick = ({ category }) => {
    setActiveElement(category);
    dispatch(setActiveCategory(activeElement));
    dispatch(getVideosByCategory(activeElement));
  };
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  useEffect(() => {
    dispatch(getVideoCategories());
  }, [dispatch]);
  return (
    <div className="d-flex categories">
      {categories ? (
        categories.map((item) => {
          return (
            <div
              key={item.id}
              className={`${
                activeElement === item.category
                  ? "item active mx-2"
                  : "item mx-2"
              }`}
              onClick={() => handleClick(item)}
            >
              {item.category}
            </div>
          );
        })
      ) : (
        <>...</>
      )}
    </div>
  );
};

export default Categories;

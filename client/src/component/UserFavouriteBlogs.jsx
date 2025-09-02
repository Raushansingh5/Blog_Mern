import React, { useContext, useEffect, useState } from "react";
import BlogCard from "../component/BlogCard";
import { AppContext } from "../context/AppContext";

function UserFavourites() {
  const { api } = useContext(AppContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api("/api/v1/user/fetchFavouriteBlog");
        setData(res.data.blogs || []);
      } catch {
        setData([]);
      }
    };
    fetch();
  }, [api]);

  return (
    <div className="mb-4 py-4">
      <h1 className="text-xl font-semibold mb-4">Favourite Blogs</h1>
      <div className="flex flex-col gap-8 lg:gap-4">
        {data.length > 0 ? (
          data.map((items, i) => (
            <div key={i} className="flex flex-col lg:flex-row gap-2 lg:gap-4">
              <BlogCard items={items} />
            </div>
          ))
        ) : (
          <p>No favourites yet.</p>
        )}
      </div>
    </div>
  );
}

export default UserFavourites;

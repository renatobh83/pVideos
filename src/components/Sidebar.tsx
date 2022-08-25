import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetVideoCategoriaQuery, useGetVideosQuery } from "../graphql/types";

export function Sidebar() {
  const [cat, setCat] = useState();

  const { data } = useGetVideoCategoriaQuery({
    variables: {
      categoria: cat,
    },
  });

  const handleChooseList = (cat) => {
    setCat(cat);
  };

  return (
    <aside className="overflow-y-auto 800:h-full h-80 p-3 text-zinc-500 800:w-[348px] border-gray-600">
      <ul className="flex justify-between items-center ">
        <li>
          <button
            className="py-2 px-4 border rounded hover:text-g1"
            onClick={() => handleChooseList("infantil")}
          >
            Infantil
          </button>
        </li>
        <li>
          <button
            className="py-2 px-4 border rounded hover:text-g1"
            onClick={() => handleChooseList("ingles")}
          >
            Aulas
          </button>
        </li>
      </ul>
      <div className="800:pt-10 gap-7 px-2 800:px-5 800:py-2 py-4 800:max-h-[60vh] grid grid-cols-2">
        {data?.videos.map((video) => (
          <Link
            key={video.id}
            to={`/video/${video.id}`}
            className="p-3 text-g1 rounded border-g9 border hover:bg-g1 hover:text-g9 text-center"
          >
            {video.categoria}
          </Link>
        ))}
      </div>
    </aside>
  );
}

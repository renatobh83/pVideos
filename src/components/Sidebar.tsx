import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetVideoCategoriaQuery } from "../graphql/types";

export function Sidebar() {
  const { slug } = useParams<{ slug: string }>();
  const [cat, setCat] = useState();
  console.log(slug);
  const { data } = useGetVideoCategoriaQuery({
    variables: {
      categoria: cat,
    },
  });

  const handleChooseList = (cat: any) => {
    setCat(cat);
  };

  return (
    <aside className="overflow-y-auto 800:h-full h-80 p-3 text-zinc-500 800:w-[348px] border-gray-600">
      <ul className="flex gap-5 items-center ">
        <li>
          <button
            className={classNames("py-2 px-4 border rounded hover:text-g1", {
              "bg-slate-50 text-black hover:text-black": cat === "infantil",
            })}
            onClick={() => handleChooseList("infantil")}
          >
            Infantil
          </button>
        </li>
        <li>
          <button
            className={classNames("py-2 px-4 border rounded hover:text-g1", {
              "bg-slate-50 text-black hover:text-black": cat === "ingles",
            })}
            onClick={() => handleChooseList("ingles")}
          >
            Aulas
          </button>
        </li>
      </ul>
      <div className="800:pt-10 uppercase tracking-wider gap-7 px-2 800:px-5 800:py-2 py-4 800:max-h-[60vh] grid grid-cols-2">
        {data?.videos.map((video) => (
          <Link
            key={video.id}
            to={`/video/${video.id}`}
            className={classNames(
              "p-3 text-g1 rounded border-g9 border hover:bg-g1 hover:text-g9 text-center",
              {
                "bg-slate-50 text-black hover:text-black": video.id === slug,
              }
            )}
          >
            {video.categoria}
          </Link>
        ))}
      </div>
    </aside>
  );
}

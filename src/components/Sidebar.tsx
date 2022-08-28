import classNames from "classnames";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetVideoCategoriaQuery } from "../graphql/types";

export function Sidebar() {
  const { slug } = useParams<{ slug: string }>();

  const [cat, setCat] = useState();
  const [userId] = useState(() => {
    if (localStorage.getItem("user")) {
      return localStorage.getItem("user");
    } else {
      return null;
    }
  });
  const { data } = useGetVideoCategoriaQuery({
    variables: {
      categoria: cat,
      id: userId ? userId : "0",
    },
  });

  const handleChooseList = (cat: any) => {
    setCat(cat);
  };

  return (
    <aside className="overflow-y-auto 800:h-full h-80 p-3 text-zinc-500 800:w-[348px] border-gray-600">
      <ul className="flex px-5 gap-2 items-center flex-wrap">
        <li>
          <button
            className={classNames("py-2 px-4 border rounded hover:text-g1", {
              "bg-slate-50 text-black hover:text-black": cat === "musicas",
            })}
            onClick={() => handleChooseList("musicas")}
          >
            Musicas
          </button>
        </li>
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
      <div className="800:pt-10 gap-2 px-2 800:px-5 800:py-2 py-4 800:max-h-[60vh] grid grid-cols-1">
        {data?.videos.map((video) => (
          <Link
            key={video.id}
            to={`/video/${video.id}`}
            className={classNames(
              "p-3 text-g1 rounded border-g9 border hover:bg-g1 hover:text-g9 text-center",
              {
                "bg-g9 border-none hover:text-black": video.id === slug,
              }
            )}
          >
            <div className="flex text-sm gap-2 ">
              <img src={video.thumbnail} className="w-[48px] h-[48px]" />
              <span className=""> {video.title.substring(0, 40)}</span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

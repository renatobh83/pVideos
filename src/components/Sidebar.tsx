import { Link } from "react-router-dom";
import { useGetVideosQuery } from "../graphql/types";

export function Sidebar() {
  const { data } = useGetVideosQuery();

  if (!data) {
    return <div>Carregando....</div>;
  }
  console.log(data);
  return (
    <aside className="overflow-y-auto 800:h-full h-80 p-3 text-zinc-500 800:w-[348px] border-gray-600">
      <div className="800:pt-10  gap-7 px-2 800:px-5 800:py-2 py-4 800:max-h-[60vh] grid grid-cols-2">
        {data.videos.map((video) => (
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

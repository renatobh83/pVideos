import { Link } from "react-router-dom";
import { useGetVideosQuery } from "../graphql/types";

export function Sidebar() {
  const { data } = useGetVideosQuery();
  if (!data) {
    return <div>Carregando....</div>;
  }

  return (
    <aside className="overflow-y-auto 800:h-full h-80 p-3 text-zinc-500 800:w-[348px] border-gray-600">
      <div className="800:pt-10 flex gap-7 flex-col px-2 800:px-5 800:py-2 py-4 800:max-h-[60vh]">
        {data.videos.map((video: { id: string; videoId: string }) => (
          <Link
            key={video.id}
            to={`/video/${video.id}`}
            className="p-3 rounded  border-g9 border hover:bg-g1 hover:text-g9"
          >
            Video 1
          </Link>
        ))}
      </div>
    </aside>
  );
}

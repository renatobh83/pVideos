import { DefaultUi, Player, Youtube } from "@vime/react";
import { useGetByIdQuery } from "../graphql/types";
import { useParams } from "react-router-dom";
import { useRef } from "react";

import "@vime/core/themes/default.css";
export function Video() {
  const { slug } = useParams<{ slug: string }>();
  const player = useRef<HTMLVmPlayerElement>(null);
  
  const { data } = useGetByIdQuery({
    variables: {
      id: slug,
    },
  });

  if (!data) {
    return <div className="flex-1 h-[40vh] text-g1 mx-auto">Carregando...</div>;
  }
  return (
    <div className="800:flex-1 overflow-y-auto">
      <div className="bg-g9 flex justify-center ">
        <div className="h-full w-full max-w-[1000px] max-h-[60vh] aspect-video">
          <Player ref={player}>
            <Youtube videoId={data.video.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>
      <div className="py-4 px-2">
        <p className="text-zinc-50">{data.video.title}</p>
      
      </div>
    </div>
  );
}

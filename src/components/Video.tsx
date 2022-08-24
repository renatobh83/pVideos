import { DefaultUi, Player, Youtube } from "@vime/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
interface VideoProps {
  videoSlug: string;
}

export function Video({ videoSlug }: VideoProps) {
  const [id, setId] = useState(videoSlug);
  useEffect(() => {
    setId(videoSlug);
    console.log(id);
  }, [videoSlug]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1000px] max-h-[60vh] aspect-video">
          <Player debug={true}>
            <Youtube videoId={id} />
            <DefaultUi />
          </Player>
        </div>
      </div>
      <div className="p-2 max-w-[1000px] mx-auto">
        <p className="text-zinc-50">Texto</p>
      </div>
    </div>
  );
}

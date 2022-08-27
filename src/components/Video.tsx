import { DefaultUi, Player, Youtube } from "@vime/react";
import { useGetByIdQuery } from "../graphql/types";
import "@vime/core/themes/default.css";
interface VideoProps {
  videoSlug: string;
}

export function Video({ videoSlug }: VideoProps) {
  const { data } = useGetByIdQuery({
    variables: {
      id: videoSlug,
    },
  });

  if (!data) {
    return <div></div>;
  }
  return (
    <div className="800:flex-1 overflow-y-auto">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1000px] max-h-[60vh] aspect-video">
          <Player controls>
            <Youtube videoId={data.video.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>
      {/* <div className="p-2 max-w-[1000px] mx-auto">
        <p className="text-zinc-50">Texto</p>
      </div> */}
    </div>
  );
}

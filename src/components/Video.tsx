import {
  DefaultUi,
  Player,
  Youtube,
  Ui,
  ClickToPlay,
  DblClickFullscreen,
  Spinner,
  Controls,
} from "@vime/react";
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
          <Player>
            <Youtube videoId={data.video.videoId} />
            <DefaultUi />
            <Ui>
              <ClickToPlay useOnMobile={true} />
              <DblClickFullscreen />
              <Spinner />
            </Ui>
          </Player>
        </div>
      </div>
      <div className="py-4">
        <p className="text-zinc-50">{data.video.title}</p>
      </div>
    </div>
  );
}

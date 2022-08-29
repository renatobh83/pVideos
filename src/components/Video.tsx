import {
  DefaultUi,
  Player,
  Youtube,
  Ui,
  ClickToPlay,
  DblClickFullscreen,
} from "@vime/react";
import { useGetByIdQuery } from "../graphql/types";
import "@vime/core/themes/default.css";
import { useParams } from "react-router-dom";
interface VideoProps {
  videoSlug: string;
}

export function Video() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useGetByIdQuery({
    variables: {
      id: slug,
    },
  });

  if (!data) {
    return <div></div>;
  }
  return (
    <div className="800:flex-1 overflow-y-auto">
      <div className="bg-g9 flex justify-center ">
        <div className="h-full w-full max-w-[1000px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.video.videoId} />
            <DefaultUi />
            <Ui>
              <ClickToPlay useOnMobile={true} />
              <DblClickFullscreen />
            </Ui>
          </Player>
        </div>
      </div>
      <div className="py-4 px-2">
        <p className="text-zinc-50">{data.video.title} </p>
      </div>
    </div>
  );
}

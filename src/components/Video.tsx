import {
  ClickToPlay,
  DefaultUi,
  Player,
  Spinner,
  Ui,
  Youtube,
} from "@vime/react";
import { useGetByIdQuery } from "../graphql/types";
import "@vime/core/themes/default.css";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

export function Video() {
  const { slug } = useParams<{ slug: string }>();
  const [isLoop, setIsLoop] = useState(true);
  const loop = useRef<HTMLInputElement>(null);

  const { data } = useGetByIdQuery({
    variables: {
      id: slug,
    },
  });
  const setLoop = () => {
    setIsLoop(loop.current.checked);
  };
  if (!data) {
    return <div></div>;
  }
  return (
    <div className="800:flex-1 overflow-y-auto">
      <div className="bg-g9 flex justify-center ">
        <div className="h-full w-full max-w-[1000px] max-h-[60vh] aspect-video">
          <Player loop={isLoop}>
            <Youtube videoId={data.video.videoId} />
            <DefaultUi />
            <Ui>
              <ClickToPlay useOnMobile={true} />
              <Spinner />
            </Ui>
          </Player>
        </div>
      </div>
      <div className="py-4 px-2">
        <p className="text-zinc-50">{data.video.title}</p>
        <label htmlFor="loop">
          <input
            className="hidden absolute pointer-events-none"
            type="checkbox"
            name="loop"
            id="loop"
            ref={loop}
            defaultChecked
            onChange={setLoop}
          />
          <span
            className={classNames("text-g1  cursor-pointer", {
              "text-orange-600": isLoop,
            })}
          >
            Loop
          </span>
        </label>
      </div>
    </div>
  );
}

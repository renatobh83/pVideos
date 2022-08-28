import { FormEvent, useRef, useState } from "react";

import Logo from "./Logo";
import {
  Categoria,
  useAddVideoMutation,
  usePublishMutation,
} from "../graphql/types";
import classNames from "classnames";

export function Header() {
  const linkRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [newVideo, setNewVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState(() => {
    if (localStorage.getItem("user")) {
      return localStorage.getItem("user");
    } else {
      return null;
    }
  });

  const [createVideo] = useAddVideoMutation();
  const [publishVideo] = usePublishMutation();

  const handleNewVideo = () => {
    setNewVideo(!newVideo);
  };
  const handleLogout = () => {
    localStorage.clear();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const link = linkRef.current.value;

    if (link.indexOf("youtube") === -1) {
      alert("Link invalido");
      return;
    }

    const cat = selectRef.current.value as Categoria;
    const videoId = link.split("v=")[1].substring(0, 11);

    const dadosLink = await fetch(
      `https://www.youtube.com/oembed?format=json&url=http%3A//youtube.com/watch%3Fv%3D${videoId}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { title, thumbnail_url } = await dadosLink.json();

    const data = await createVideo({
      variables: {
        categoria: cat,
        videoId: videoId,
        thumbnail: thumbnail_url,
        title: title,
        id: userId,
      },
    });

    await publishVideo({
      variables: {
        id: data.data.createVideo.id,
      },
    });
    setIsLoading(false);
    setNewVideo(!newVideo);
  };

  const ModalInput = () => {
    return (
      <div className="inset-0 bg-black opacity-80 absolute text-white max-w-[1160px] mx-auto z-[1000]">
        <div className="p-10 flex flex-col gap-3 w-full mx-auto">
          <button onClick={() => handleNewVideo()} className="text-end">
            Close
          </button>

          <form
            className="flex flex-col justify-center items-center gap-4 text-g9 "
            onSubmit={handleSubmit}
          >
            <select name="categoria" id="categoria" required ref={selectRef}>
              <option value="">Selecione uma categoria</option>
              <option value="musicas">Musicas</option>
              <option value="infantil">Infantil</option>
              <option value="ingles">Aula</option>
            </select>
            <input
              ref={linkRef}
              type="text"
              className="px-2 py-1 rounded"
              placeholder="Inserir link aqui"
            />
            <button
              type="submit"
              className={classNames(
                "py-2 px-4 rounded uppercase tracking-wide text-g9 bg-white",
                {
                  "opacity-10 cursor-not-allowed": isLoading,
                }
              )}
            >
              Gravar
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full justify-center items-center py-3 bg-g1 grid grid-cols-3">
        {newVideo}
        <div className="col-start-2 flex justify-center">
          <Logo />
        </div>
        <div className="place-self-end flex gap-5 items-center">
          <span
            className="material-symbols-outlined cursor-pointer px-1 py-2"
            onClick={() => handleNewVideo()}
          >
            add
          </span>

          <button onClick={handleLogout} className="pr-5 pt-2">
            <a href="/">
              <span className="material-symbols-outlined">logout</span>
            </a>
          </button>
        </div>
      </div>
      {newVideo && <ModalInput />}
    </>
  );
}

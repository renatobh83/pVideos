import { useRef, useState } from "react";
import {
  Categoria,
  useAddVideoMutation,
  usePublishMutation,
} from "../graphql/types";
import Logo from "./Logo";

export function Header() {
  const linkRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [newVideo, setNewVideo] = useState(false);
  const [createVideo] = useAddVideoMutation();
  const [publishVideo] = usePublishMutation();

  const handleNewVideo = () => {
    setNewVideo(!newVideo);
  };
  // 11
  const handleSubmit = async (e) => {
    const link = linkRef.current.value;
    if (link.indexOf("youtube") === -1) {
      alert("Link invalido");
      return;
    }
    const cat = selectRef.current.value as Categoria;
    const videoId = link.substring(
      link.indexOf("=") + 1,
      link.indexOf("=") + 12
    );

    const data = await createVideo({
      variables: {
        categoria: cat,
        videoId: videoId,
      },
    });

    await publishVideo({
      variables: {
        id: data.data.createVideo.id,
      },
    });
  };

  const ModalInput = () => {
    return (
      <div className="inset-0 bg-black absolute text-white opacity-80 max-w-[1160px] mx-auto z-[1000]">
        <div className="p-10 flex flex-col gap-3 w-full">
          <button onClick={() => handleNewVideo()} className="text-end">
            Close
          </button>
          <div className="">
            <form
              className="flex flex-col justify-center items-center gap-4 text-g9"
              onSubmit={handleSubmit}
            >
              <select name="categoria" id="categoria" required ref={selectRef}>
                <option value="">Selecione uma categoria</option>
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
                className="py-2 px-4 rounded uppercase tracking-wide text-g9 bg-white"
              >
                Gravar
              </button>
            </form>
          </div>
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
        <button className="place-self-end pr-3 flex items-center">
          <span
            className="material-symbols-outlined"
            onClick={() => handleNewVideo()}
          >
            add
          </span>
        </button>
      </div>
      {newVideo && <ModalInput />}
    </>
  );
}

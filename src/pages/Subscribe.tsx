import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  usePublishSubscribeMutation,
  useSubscribeMutation,
  useListSubscribeQuery,
} from "../graphql/types";

export function Subscribe() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [createSubscriber, { loading }] = useSubscribeMutation();
  const [publish] = usePublishSubscribeMutation();

  const { data: users } = useListSubscribeQuery();

  async function handleOnSubmit(event: FormEvent) {
    event?.preventDefault();

    if (!email) {
      return;
    }
    const userExist = users.subscribers.filter((user) => user.email === email);

    if (!userExist.length) {
      const { data } = await createSubscriber({
        variables: {
          email,
        },
      });
      await publish({
        variables: {
          id: data.createSubscriber.id,
        },
      });
      localStorage.setItem("user", data.createSubscriber.id);
      navigate("/video");
    } else {
      localStorage.setItem("user", userExist[0].id);
      navigate("/video");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      return navigate("/video");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center text-g1 p-2">
      <div className="w-full max-w-[1100px] flex justify-between  1100:flex-row flex-col-reverse items-center mt-20 mx-auto">
        <div className="1100:max-w-[640px] max-w-[300px] ">
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma <strong className="text-blue-500">playlist</strong> ,
            do YouTube, apenas com o
            <strong className="text-blue-500"> link do video</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Esta é uma aplicação desenvolvida para voce criar uma lista de
            videos preferidos do YouTube livre de Ad's
          </p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col gap-2 w-full"
          >
            <input
              type="text"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Digite seu email"
              className="bg-gray-900 rounded px-5 h-14"
            />
            <button
              type="submit"
              disabled={loading}
              className="uppercase mt-4 bg-green-500 py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50 tracking-wide"
            >
              Acessar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

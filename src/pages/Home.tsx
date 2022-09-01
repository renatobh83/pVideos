import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Sidebar } from "../components/Sidebar";
import {  useNavigate,useParams } from "react-router-dom";
import Icon from "../components/Marca";
import { useEffect } from "react";

export function Home() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate()


  useEffect(() => {
    if (!localStorage.getItem("user")) {
      return navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-screen max-w-[1160px] mx-auto ">
      <Header />
      <main className="flex flex-1 flex-col 800:flex-row">
        {slug ? <Video /> : <div className="flex-1 text-zinc-50 "></div>}
        <Sidebar />
      </main>
      <div className=" bg-g1 p-4 text-g9 hidden 800:flex items-center gap-2 tracking-widest">
        <div className="w-[20px] h-[20px]">
          <Icon />
        </div>
        Renato
      </div>
    </div>
  );
}

import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Sidebar } from "../components/Sidebar";
import { useParams } from "react-router-dom";

export function Home() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="flex flex-col min-h-screen w-screen max-w-[1160px] mx-auto ">
      <Header />
      <main className="flex flex-1 flex-col 800:flex-row">
        {slug ? <Video /> : <div className="flex-1 text-zinc-50"></div>}
        <Sidebar />
      </main>
      <div className="bg-g1 p-4 text-g9 hidden 800:block tracking-widest">
        ®Renato
      </div>
    </div>
  );
}

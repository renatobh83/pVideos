import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Sidebar } from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { useState } from "react";

export function Home() {
  const [slug, setSlug] = useState("");

  const handlechangeVideo = (id: string) => {
    setSlug(id);
  };
  return (
    <div className="flex flex-col min-h-screen w-screen max-w-[1160px] mx-auto ">
      <Header />
      <main className="flex flex-1 flex-col 800:flex-row">
        {slug ? <Video videoSlug={slug} /> : <div className="flex-1"></div>}
        <Sidebar changeVideo={handlechangeVideo} />
      </main>
      <div className="bg-g1 p-4 text-g9 hidden 800:block ">® Renato</div>
    </div>
  );
}

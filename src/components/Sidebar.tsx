import { Link, useParams } from "react-router-dom";
export function Sidebar({ changeVideo }) {
  return (
    <aside className="overflow-y-auto 800:h-full h-80 p-3 text-zinc-500 800:w-[348px] border-gray-600">
      <div className="800:pt-10 flex gap-7 flex-col px-2 800:px-5 800:py-2 py-4 800:max-h-[60vh]">
        <button
          onClick={() => changeVideo("jHXBqkdXjw0")}
          className="p-3 rounded  border-g9 border hover:bg-g1 hover:text-g9"
        >
          Video 1
        </button>
        <button
          onClick={() => changeVideo("S06VsWkK-VM")}
          className="p-3 rounded  border-g9 border hover:bg-g1 hover:text-g9"
        >
          Video 1
        </button>
      </div>
    </aside>
  );
}

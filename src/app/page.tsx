import Panel from "@/components/Panel";
import Scene from "@/components/webgl/Scene";
import Bottom from "@/components/Bottom";

export default function Home() {
  return (
    <div className="h-[100dvh] p-3 overflow-hidden">
      <div className="grid grid-cols-5 grid-rows-5 h-full gap-3">
        <main className="col-span-4 row-span-4 bg-gray-100 rounded-lg overflow-hidden">
          <Scene />
        </main>
        <aside className="col-span-1 row-span-4 bg-gray-100 rounded-lg overflow-hidden">
          <Panel />
        </aside>
        <footer className="col-span-5 row-span-1 bg-gray-100 rounded-lg overflow-hidden">
          <Bottom />
        </footer>
      </div>
    </div>
  );
}

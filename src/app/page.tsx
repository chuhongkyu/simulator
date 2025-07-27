import Panel from "@/components/Panel";
import Scene from "@/components/webgl/Scene";
import Bottom from "@/components/Bottom";

export default function Home() {
  return (
    <div className="h-[100dvh] p-3 overflow-hidden bg-gray-200">
      <main className="w-full h-[calc(100%-150px)]">
        <div className="flex gap-3 w-full h-full">
          <section className="w-[calc(100%-320px)] bg-white rounded-lg overflow-hidden">
            <Scene />
          </section>
          <aside className="w-[310px] bg-white rounded-lg overflow-hidden px-4">
            <Panel />
          </aside>
        </div>
    
        <footer className="min-h-[140px] mt-3 bg-white rounded-lg overflow-hidden">
          <Bottom />
        </footer>
      </main>
    </div>
  );
}

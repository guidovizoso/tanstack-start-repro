import { createFileRoute } from "@tanstack/react-router";
import { CallToAction } from "@/components/landing/cta";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="flex flex-col h-full w-full max-w-screen-xl mx-auto p-4 xl:p-0">
      <div className="mt-28" id="cta">
        <CallToAction />
      </div>
    </main>
  );
}

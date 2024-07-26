import Hero from "./components/Hero";
import { Globe } from "./components/Globe";
import { Input } from "./components/Input";

export default function Home() {
  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.03] overflow-x-hidden">
      <Hero />
      <div className="relative flex">
        {/* Flex container with equal width for children */}
        <div className="flex-1">
          <Input />
        </div>
        <div className="flex-1">
          <Globe />
        </div>
      </div>
    </div>
  );
}

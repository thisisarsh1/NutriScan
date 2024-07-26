import Hero from "./components/Hero";
import {Hero2} from "./components/Hero2";


export default function Home() {
  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.03] overflow-x-hidden">
      <Hero></Hero>
      <div className="relative">
  <div className="absolute right-0 w-[50vw] h-[50vw] ">
    <Hero2 />
  </div>
</div>

      
    </div>
  );
}

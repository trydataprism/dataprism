import { Loader2 } from "lucide-react";

import Image from "next/image";

export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
      
      <div className="flex items-center justify-center gap-3 pb-8">
        <Image src="/dark_logo.svg" alt="Dataprism" width={24} height={24} />
        <h1 className="text-2xl font-bold text-foreground">DATAPRISM</h1>
      </div>
    </div>
  );
}

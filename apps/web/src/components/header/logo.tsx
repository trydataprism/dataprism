import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/dark_logo.svg"
        width={18}
        height={18}
        alt="Dataprism"
        className="opacity-90"
      />
    </div>
  );
}
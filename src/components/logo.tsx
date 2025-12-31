import logoThree from "@/assets/logos/AdvisorLogo.png";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-26 max-w-[20.847rem]">
      <Image
        src={logoThree}
        fill
        className="dark:hidden"
        alt=" logo"
        role="presentation"
      />

      <Image
        src={logoThree}
        fill
        className="hidden dark:block"
        alt=" logo"
        role="presentation"
      />
    </div>
  );
}

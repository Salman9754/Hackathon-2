import Image from "next/image";
import { ModeToggle } from "./_components/theme-toogle";
import { Container } from "./container";
import { images } from "@/assets/images";
import LoggedBtn from "@/components/blocks/Logged-btn";

export function Header() {
  return (
    <Container>
      <header className="flex justify-between my-7">
        <div className="flex gap-2 items-center font-semibold text-xl">
          <Image
            src={images.MyLogo.src}
            alt={images.MyLogo.alt}
            height={50}
            width={50}
          />
          Lightnings
        </div>
        <div className="flex gap-4 items-center">
          <ModeToggle />
          <LoggedBtn />
        </div>
      </header>
    </Container>
  );
}

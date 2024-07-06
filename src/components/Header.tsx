import dynamic from "next/dynamic";
import Image from "next/image";
import logo from "../../public/wework-logo.svg";
import Link from "./link";

interface IHeaderProps {
  userName?: string;
}

export default function Header(props: IHeaderProps) {
  const { userName = "Username" } = props;

  return (
    <header className="border-border sticky top-0 z-10 border-b bg-white">
      <div className="wrapper wrapper-padding flex items-center justify-between p-4">
        <div className="flex items-center gap-x-6">
          <Link href={"/"} className="px-0">
            <Image
              priority
              src={logo}
              alt={`WeWork Indialogo`}
              width={162}
              height={48}
              className="-ml-[0.4rem] object-contain"
            />
          </Link>
          <p className="font-semibold">Location</p>
          <p className="font-semibold">Solutions</p>
          <p className="font-semibold">Enterprise</p>
          <p className="font-semibold">Ideas</p>
        </div>
        <div className="flex items-center">
          <span className="mr-3 text-a16 font-bold">{userName}</span>
          <Link
            href="/profile"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue font-bold text-white no-underline"
          >
            {userName.charAt(0)}
          </Link>
        </div>
      </div>
    </header>
  );
}

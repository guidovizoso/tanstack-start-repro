import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 xl:px-0 pt-4">
      <div className="flex flex-row items-center justify-between">
        <Link to="/" className="font-black text-xl">
          Company
        </Link>
      </div>
    </div>
  );
}

import { FaHeart } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="py-8 text-center text-navy">
      {/* <p className="flex items-center justify-center gap-2">
        Made with <FaHeart className="text-navy animate-pulse" /> by Ayushi
      </p> */}
      <p>© {new Date().getFullYear()} Ayushi Lathiya. All Rights Reserved.</p>
    </footer>
  );
}

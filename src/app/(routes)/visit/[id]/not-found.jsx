import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2 className="text-white">Not Found</h2>
      <p className="text-white">User not found</p>
      <Link href="/" className="text-white">
        Return to the homepage
      </Link>
    </div>
  );
}

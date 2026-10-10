import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-9xl font-bold text-primary-500 tracking-tighter">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-ink-900 font-display">
          Page Not Found
        </h2>
        <p className="text-lg text-ink-600">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition-colors duration-200"
          >
            Back to Homepage
            <MoveRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

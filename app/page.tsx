import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Welcome to Mtwin-User-Manager</h1>
        <Link href="/login" className="text-blue-600 hover:underline">
          Go to login
        </Link>
      </div>

    </div>
  );
}
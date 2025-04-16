import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-4 text-primary">
        Welcome to AuthFlow
      </h1>
      <div className="flex space-x-4">
        <Link href="/login" className="px-6 py-2 rounded-md bg-accent text-accent-foreground hover:bg-teal-700 transition-colors">
          Login
        </Link>
        <Link href="/register" className="px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-blue-800 transition-colors">
          Register
        </Link>
      </div>
    </div>
  );
}

import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">
      <div className="flex items-start justify-between gap-6">
        <h1 className="text-4xl font-semibold tracking-tight">Alysia</h1>
        <ThemeToggle />
      </div>
      <p className="mt-4 text-subtle">Site em construção.</p>
    </main>
  );
}

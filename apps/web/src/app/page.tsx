export default function HomePage() {
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold">Lernt</h1>
      <p className="text-sm text-gray-600">
        Next.js App Router + Tailwind. Import UI components from <code>@lernt/ui</code>.
      </p>
      {/* Example (uncomment when @lernt/ui is ready):
      <Button variant="primary">Hello</Button>
      */}
      <div className="rounded-lg border p-4">
        <pre className="text-xs">
{`GET /api/health -> { ok: true }`}
        </pre>
      </div>
    </main>
  );
}

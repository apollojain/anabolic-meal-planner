export default function OnboardingSuccessPage() {
  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Profile saved</h1>

      <p className="mb-6">
        Your nutrition profile has been created. Next, we’ll generate your meal
        plan.
      </p>

      <a
        href="/recipes"
        className="inline-block bg-black text-white rounded p-3"
      >
        View recipes
      </a>
    </main>
  );
}
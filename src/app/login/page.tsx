import { login } from "@/app/actions";
import { LogoMark } from "@/components/brand/logo";

export const metadata = { title: "Sign in · Lead desk" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form
        action={login}
        className="w-full max-w-sm rounded-xl border border-line bg-white p-8"
      >
        <LogoMark className="mb-4 h-10 w-10" />
        <h1 className="font-display text-3xl font-semibold tracking-tight">Lead desk</h1>
        <p className="mt-1 text-sm text-slate">Enter the team password to continue.</p>

        <input type="hidden" name="next" value={next ?? "/dashboard"} />

        <label htmlFor="password" className="mt-6 block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "password-error" : undefined}
          className="mt-1 w-full rounded-md border border-line bg-stone px-3 py-2 text-base"
        />
        {error ? (
          <p id="password-error" className="mt-2 text-sm text-clay-red">
            That password didn&apos;t match. Check it and try again.
          </p>
        ) : null}

        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-moss px-4 py-2.5 font-medium text-white hover:bg-ink"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}

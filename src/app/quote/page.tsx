import { redirect } from "next/navigation";

// The old single landing page now lives at /q/patios.
export default function QuoteRedirect() {
  redirect("/q/patios");
}

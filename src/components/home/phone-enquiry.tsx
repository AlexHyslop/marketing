// The product, shown rather than described: an enquiry arriving on a
// tradesperson's phone. No numbers anywhere, by design.

export function PhoneEnquiry() {
  return (
    <div className="relative mx-auto w-full max-w-[340px]" aria-label="Example of an enquiry arriving on your phone" role="img">
      <div className="rounded-[2.6rem] border-[10px] border-ink bg-ink shadow-[0_30px_60px_-30px_rgba(29,41,34,0.6)]">
        <div className="overflow-hidden rounded-[2rem] bg-[#f7f8f5]">
          <div className="flex items-center justify-between px-6 pt-4 text-[11px] font-semibold text-ink/70">
            <span>Kent Services</span>
            <span className="h-4 w-16 rounded-full bg-ink" aria-hidden="true" />
            <span>now</span>
          </div>

          <div className="space-y-3 px-4 pb-8 pt-6">
            <div className="enquiry-arrive rounded-2xl border border-line bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-moss" aria-hidden="true" />
                <p className="text-sm font-semibold">New enquiry, just for you</p>
              </div>
              <p className="mt-3 font-display text-xl font-semibold leading-tight">Sarah in Maidstone</p>
              <dl className="mt-3 space-y-1.5 text-sm">
                <Row label="Wants" value="A plumber" />
                <Row label="Job" value="Leaking kitchen tap" />
                <Row label="When" value="This week" />
                <Row label="Best time" value="Evenings" />
              </dl>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <span className="rounded-lg bg-moss px-3 py-2 text-center text-sm font-medium text-white">Call Sarah</span>
                <span className="rounded-lg border border-line px-3 py-2 text-center text-sm font-medium">Message</span>
              </div>
            </div>

            <div className="enquiry-arrive-late flex items-center gap-2 rounded-xl bg-moss-soft px-3 py-2.5 text-xs text-[#2f4a24]">
              <span aria-hidden="true">✓</span>
              Checked: real number, in your area, sent to nobody else
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-slate">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}

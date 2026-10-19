// How an enquiry actually arrives: a plain text message. No numbers.

export function SmsThread() {
  return (
    <div
      role="img"
      aria-label="A text message from Kent Services with a new enquiry from Sarah in Maidstone"
      className="mx-auto w-full max-w-[330px] rounded-[2.4rem] border-[9px] border-ink bg-white"
    >
      <div className="border-b border-line px-5 pb-3 pt-4 text-center">
        <span className="mx-auto mb-3 block h-1.5 w-14 rounded-full bg-ink/80" aria-hidden="true" />
        <p className="text-sm font-semibold">Kent Services</p>
        <p className="text-xs text-slate">Text message</p>
      </div>
      <div className="space-y-2.5 px-3.5 pb-6 pt-4 text-[15px] leading-snug">
        <p className="enquiry-arrive max-w-[88%] rounded-2xl rounded-bl-sm bg-[#e8ebe5] px-3.5 py-2.5">
          New enquiry for you from Sarah in Maidstone.
        </p>
        <p className="enquiry-arrive max-w-[88%] rounded-2xl rounded-bl-sm bg-[#e8ebe5] px-3.5 py-2.5">
          Ceramic coating on a BMW. Some swirls in the paint. Wants it done this month, at home. Best to call in
          the evening.
        </p>
        <p className="enquiry-arrive-late max-w-[88%] rounded-2xl rounded-bl-sm bg-[#e8ebe5] px-3.5 py-2.5">
          Tap to call Sarah. This one&apos;s just for you.
        </p>
        <p className="enquiry-arrive-late ml-auto max-w-[60%] rounded-2xl rounded-br-sm bg-moss px-3.5 py-2.5 text-white">
          Cheers, calling her now
        </p>
      </div>
    </div>
  );
}

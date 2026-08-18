import { Phone, LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Crisis-safety disclaimer (CI safety lock).
 * Amber is the ONLY approved use of amber per the WCMHCO CI — it must read as
 * a distinct safety signal, never as a brand accent. Do not restyle this to
 * the brand palette. Names no external partner organisations.
 */
const SafetyNote = ({ className, compact = false }: { className?: string; compact?: boolean }) => (
  <div
    role="note"
    aria-label="Mental health crisis support"
    className={cn(
      "rounded-xl border border-amber-300 bg-amber-50 text-amber-900",
      compact ? "px-4 py-3" : "px-5 py-4",
      className
    )}
  >
    <div className="flex items-start gap-3">
      <LifeBuoy className="w-5 h-5 shrink-0 mt-0.5 text-amber-700" aria-hidden="true" />
      <div className="text-sm leading-relaxed">
        <p className="font-semibold">In a crisis or emotional distress right now?</p>
        <p className="mt-1">
          World Changers offers <span className="font-medium">scheduled, appointment-based care — we are not a 24-hour emergency service</span>.
          If you or someone you know is in immediate danger, please act now:
        </p>
        <ul className="mt-2 space-y-1">
          <li className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-700" aria-hidden="true" />
            <span>
              Call <a href="tel:112" className="font-semibold underline underline-offset-2 hover:text-amber-950">112</a> (national emergency line) or{" "}
              <a href="tel:10177" className="font-semibold underline underline-offset-2 hover:text-amber-950">10177</a> (ambulance)
            </span>
          </li>
          <li className="flex items-center gap-2">
            <LifeBuoy className="w-4 h-4 text-amber-700" aria-hidden="true" />
            <span>Or go to your nearest hospital emergency department</span>
          </li>
        </ul>
        <p className="mt-3 font-medium">Free national mental-health helplines, available to everyone 24/7:</p>
        <ul className="mt-1 space-y-1">
          <li className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-700" aria-hidden="true" />
            <span>
              SADAG Suicide Crisis Helpline —{" "}
              <a href="tel:0800567567" className="font-semibold underline underline-offset-2 hover:text-amber-950">0800 567 567</a>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-700" aria-hidden="true" />
            <span>
              SADAG Mental Health Line —{" "}
              <a href="tel:0112344837" className="font-semibold underline underline-offset-2 hover:text-amber-950">011 234 4837</a>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-700" aria-hidden="true" />
            <span>
              Cipla 24hr Mental Health Helpline —{" "}
              <a href="tel:0800456789" className="font-semibold underline underline-offset-2 hover:text-amber-950">0800 456 789</a>{" "}
              (SMS 31393)
            </span>
          </li>
        </ul>
        <p className="mt-2 text-xs text-amber-800">
          SADAG (the South African Depression and Anxiety Group) and Cipla operate these public national helplines independently of World Changers.
        </p>
      </div>
    </div>
  </div>
);

export default SafetyNote;

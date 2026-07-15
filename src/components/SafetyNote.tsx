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
      </div>
    </div>
  </div>
);

export default SafetyNote;

import { Bluetooth, Radio, Wifi } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

/**
 * Offline nearby mesh chat deep dive (design §3.7, Requirement 5.1).
 *
 * Phrase contract: messages travel between nearby devices over Bluetooth and
 * Wi-Fi Direct with no internet connection, and relaying is multi-hop.
 *
 * Two-column above `md` (visual + prose), one column below (Requirement 11.4).
 */
export default function MeshChatSection() {
  return (
    <Section id="mesh" background="surface-alt">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div
          aria-hidden="true"
          className="rounded-xl border border-hairline bg-surface p-8 shadow-md"
        >
          <div className="flex items-center justify-between gap-4">
            {[Bluetooth, Radio, Wifi].map((Icon, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-brand text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="h-1 w-full rounded-pill bg-brand-light/40" />
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-body-sm text-ink-mid">
            Device to device, hop by hop
          </p>
        </div>

        <div className="max-w-prose">
          <SectionHeading sectionId="mesh">Chat with no internet at all</SectionHeading>
          <p className="mt-4 text-body-lg text-ink-high">
            When the network drops, GupShupGo keeps going. Your messages travel between nearby
            devices over Bluetooth and Wi-Fi Direct with no internet connection, no mobile data,
            and no Wi-Fi router in between.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">Multi-hop relaying</h3>
              <p className="mt-2 text-body text-ink-high">
                A friend out of direct range still hears from you. Nearby devices pass the message
                along through multi-hop relaying, so each phone in the chain carries it one step
                closer until it arrives.
              </p>
            </div>
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">Encrypted on the way</h3>
              <p className="mt-2 text-body text-ink-high">
                Relayed messages stay end-to-end encrypted. Devices in the middle move the traffic
                without being able to read it.
              </p>
            </div>
            <div>
              <h3 className="text-h3 font-semibold text-ink-high">Made for dead zones</h3>
              <p className="mt-2 text-body text-ink-high">
                Festivals, treks, basements, flights, power cuts, crowded stadiums. Anywhere a
                normal messenger stalls, nearby chat still connects the people around you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

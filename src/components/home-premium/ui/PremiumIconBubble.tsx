import type { PremiumIcon } from "@/content/home-premium/types";
import { premiumIconMap } from "../icons/premiumIcons";

type Props = {
  icon: PremiumIcon;
};

export function PremiumIconBubble({ icon }: Props) {
  const Icon = premiumIconMap[icon];

  return (
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#6b9f12]/35 bg-[#6b9f12]/10 text-[#9bc43a]">
      <Icon className="h-6 w-6" aria-hidden="true" />
    </div>
  );
}
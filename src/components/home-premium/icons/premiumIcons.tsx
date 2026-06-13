import type { ComponentType } from "react";
import {
  Award,
  BadgeCheck,
  Boxes,
  BriefcaseBusiness,
  Construction,
  FileCheck2,
  Globe2,
  MessageCircle,
  Network,
  ShieldCheck,
  Snowflake,
  Truck,
  Users,
} from "lucide-react";
import type { PremiumIcon } from "@/content/home-premium/types";

type IconProps = {
  className?: string;
};

export const premiumIconMap: Record<PremiumIcon, ComponentType<IconProps>> = {
  truck: Truck,
  boxes: Boxes,
  customs: FileCheck2,
  temperature: Snowflake,
  shield: ShieldCheck,
  crane: Construction,
  globe: Globe2,
  route: Globe2,
  experience: Award,
  network: Network,
  communication: MessageCircle,
  users: Users,
  career: BriefcaseBusiness,
  growth: BadgeCheck,
  security: ShieldCheck,
};
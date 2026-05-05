import { Header } from "@/components/layout/Header";
import { ScrollHandler } from "@/app/[locale]/SmothScroll"
type Props = {
  children: React.ReactNode;
};

export default function LocaleLayout({ children }: Props) {
  return (
    <>
      <Header />
      <ScrollHandler />
      {children}
    </>
  );
}
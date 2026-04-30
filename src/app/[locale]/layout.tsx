import { Header } from "@/components/layout/Header";

type Props = {
  children: React.ReactNode;
};

export default function LocaleLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
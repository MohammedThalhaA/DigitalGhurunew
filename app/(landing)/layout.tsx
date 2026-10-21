import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "88px" }} className="pt-[88px]">{children}</main>
      <Footer />
    </>
  );
}

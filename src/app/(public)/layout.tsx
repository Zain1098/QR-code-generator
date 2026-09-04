import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-canvas-paper dark:bg-dark-canvas text-ink-primary dark:text-dark-ink-primary transition-colors duration-200">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}

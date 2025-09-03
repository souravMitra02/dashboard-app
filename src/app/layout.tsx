import "../styles/globals.css";

export const metadata = {
  title: "Dashboard App",
  description: "User Dashboard built with Next.js & TailwindCSS",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="w-full flex h-full">
          <div className="w-2/12 bg-[#f7f7f8]" />
          <div className="w-10/12">{children}</div>
        </div>
      </body>
    </html>
  );
}

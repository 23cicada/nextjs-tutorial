import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* antialiased: 抗锯齿，使字体更加平滑 anti-aliasing /ˈænti ˈeɪliəsɪŋ/ */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

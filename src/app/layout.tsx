import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HireMe Simulator — Học giỏi có chắc thành công?",
  description: "Một thí nghiệm tuyển dụng dưới góc nhìn Triết học Mác-Lênin. Khám phá mối quan hệ giữa nhận thức và thực tiễn qua mô phỏng tuyển dụng.",
  keywords: ["Triết học Mác-Lênin", "phép biện chứng duy vật", "thực tiễn là tiêu chuẩn chân lý", "nhận thức", "game giáo dục"],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

import "./globals.css";
import { mediumFont } from "./fonts/fontWeigtht";
import Header from "@/components/header/Header";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { FilterProvider } from "@/providers/FilterProvider";

export const metadata = {
  title: "Momentum - Progress Tracking Software",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${mediumFont.className}  antialiased `}>
        <ReactQueryProvider>
          <FilterProvider>
            <Header />
            <main className="px-[120px]">{children}</main>
          </FilterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

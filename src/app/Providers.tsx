import { ThemeProvider as NextThemesProvider } from "next-themes";
import SessionProvider from "@/components/providers/SessionProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="theme-volt"
        enableSystem={false}
      >
        {children}
      </NextThemesProvider>
    </SessionProvider>
  );
};
export default Providers;

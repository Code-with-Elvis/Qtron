import { ThemeProvider as NextThemesProvider } from "next-themes";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="theme-volt"
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
};
export default Providers;

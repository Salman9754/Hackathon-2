import { Loader } from "@/components/blocks/loader";
import { ThemeProvider } from "@/providers/theme-provider";
import { Suspense } from "react";

export function RootProvider({
    children
}: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<Loader />} >
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </Suspense>
    )
}
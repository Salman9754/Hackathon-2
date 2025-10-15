import { PropsWithChildren } from "react";
import { Header } from "../_layout/header";
import { Footer } from "../_layout/footer";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )

}
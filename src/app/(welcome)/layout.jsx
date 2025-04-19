import "../globals.scss";

export const metadata = {
    title: "Welcome to my Blog",
    description: "Welcome to yoseR1cho's blog",
};

export default function RootLayout({children}) {
    return (
        <html lang="cn">
            <body>
                {children}
            </body>
        </html>
    );
}

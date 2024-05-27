import "../globals.scss";

export const metadata = {
    title: "welcome my Blog",
    description: "welcome to yoseR1cho's blog",
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

import "@/app/globals.scss";
import ReduxProvider from "@/store";
import AntdStyleRegistry from "@/components/AntdStyleRegistry";
import PublicComponents from "@/components/PublicComponents";


export const metadata = {
    title: "NEXT Blog",
    description: "yoseR1cho's blog",
};

export default function RootLayout({children}) {
    return (
        <html lang="cn">
        <body>
        <ReduxProvider>
            <AntdStyleRegistry>
                <PublicComponents>
                    {children}
                </PublicComponents>
            </AntdStyleRegistry>
        </ReduxProvider>
        </body>
        </html>
    );
}

import { Logo } from "./_components/Logo";

export default function AuthLayout({children}:{children:React.ReactNode}) {
    return(
        <>
        <div className="flex flex-col h-full items-center justify-center space-y-6">
            <Logo />
            {children}
        </div>
        </>
    )
}
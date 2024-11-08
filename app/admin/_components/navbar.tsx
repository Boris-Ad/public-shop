import { ExitButton } from "./exit-button"
import { NavNavbar } from "./nav-navbar"


export const Navbar = () => {
    return (
        <header className="hidden lg:flex min-h-16 px-6 justify-between items-center bg-primary text-primary-foreground">
            <NavNavbar />
            <ExitButton />
        </header>
    )
}
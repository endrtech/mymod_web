import { UserProfile } from "@clerk/nextjs";

export default function MyAccount() {
    return (
        <div className="w-full h-screen text-foreground flex flex-row items-start justify-center">
            <div className="mt-12">
                <UserProfile />
            </div>
        </div>
    )
}
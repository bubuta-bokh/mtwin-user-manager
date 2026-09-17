const AVATAR_COLORS = [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-rose-500",
];

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function getAvatarColor(seed: string): string {
    return AVATAR_COLORS[hashString(seed) % AVATAR_COLORS.length];
}

function getInitials(firstName: string, lastName: string): string {
    
    const a = firstName?.trim()[0] ?? "";
    const b = lastName?.trim()[0] ?? "";
    const initials = (a + b).toUpperCase() || "?";
    //console.log('initials=', initials)
    return initials;
}

interface UserAvatarProps {
    firstName: string;
    lastName: string;
    seed: string;
}

export default function useAvatar({ firstName, lastName, seed }: UserAvatarProps) {
    //console.log('firstname=',firstName,'lastname=',lastName,'seed=',seed);
    return (
        <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-white text-sm font-semibold shrink-0 ${getAvatarColor(seed)}`}>
            {getInitials(firstName, lastName)}
        </span>
    );

}
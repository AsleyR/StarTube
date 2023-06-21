export interface BaseComponentProps {
    text?: string;
    className?: string;
}

interface LinkComponentProps extends BaseComponentProps {
    link: string;
}

export interface ContainerProps extends BaseComponentProps {
    children: React.ReactNode
}

export interface NavbarLogoProps extends LinkComponentProps {
}

export interface SearchBarProps extends BaseComponentProps {
    placeholder?: string;
}

// Types

export type PrismaOptions = {
    contains?: string;
    mode?: "insensitive" | "default"
} | string | number
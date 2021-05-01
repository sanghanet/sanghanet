type MenuItem = {
    path: string;
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    label: string;
    isEnabled?: boolean;
};

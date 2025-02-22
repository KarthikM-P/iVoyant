import React from "react";

interface LabelProps {
    children: React.ReactNode;
    className?: string;
}
export const Label:React.FC<LabelProps> = ({ children, className }) => (
    <label className={className}>{children}</label>
);
import React from "react";

export default function TwoCol({ children }) {
    return (
        <div className="flex gap-4 border border-ff0">
            {React.Children.map(children, (child) => (
                <div className="flex-1">{child}</div>
            ))}
        </div>
    );
}

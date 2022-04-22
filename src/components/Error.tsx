import React from "react";
export default function ErrorComponent({ children }: { children: any }) {
    return <div className="Error">
        <h1>{children}</h1>
    </div>
}
import React from "react";
function Layout({children}) {
    return (
        <div>
            <main className="h-100">
                {children}
            </main>
        </div>
    );
}
export default Layout;

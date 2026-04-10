import { SupportProvider } from "../../../../../../lib/context/supportContext"

function SupportLayout ({ children }) {

    return (
        <main>
            <SupportProvider>
                {children}
            </SupportProvider>
        </main>
    )
}

export default SupportLayout
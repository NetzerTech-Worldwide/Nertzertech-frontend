import { ExamProvider } from "../../../../../../../lib/context/examContext"

function ExaminationsLayout ({ children }) {
    return (
        <main>
            <ExamProvider>
                {children}
            </ExamProvider>
        </main>
    )
}

export default ExaminationsLayout

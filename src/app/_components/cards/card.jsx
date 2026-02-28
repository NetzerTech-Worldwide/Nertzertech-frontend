import { Analysis } from "./analysis"
import { Dates } from "./date"
import { Detail } from "./detail"
import { Duration } from "./duration"
import { Icon } from "./icon"
import { Info } from "./info"
import { Status } from "./status"
import { Time } from "./time"
import { Title } from "./title"

export const Card = ({ children, cardStyle, backGround }) => {

    return (
        <main className={`${cardStyle} ${backGround}`} >
            {children}
        </main>
    )
}

Card.Title = Title
Card.Icon = Icon
Card.Info = Info
Card.Time = Time
Card.Date = Dates
Card.Status = Status
Card.Duration = Duration
Card.Analysis = Analysis
Card.Detail = Detail
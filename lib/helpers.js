export const getDueDate = (date) => {
    const format = {day: "numeric", month: "short", year: "numeric"}
    const formattedDate = new Intl.DateTimeFormat("en-GB", format).format(date)
    return formattedDate
}

export const getDueTime = (time) => {
    const format = {hour: "numeric", minute: "2-digit", hour12: true}
    const timeString = time.toLocaleTimeString("en-US", format)
    const formattedTime = timeString.replace(" ", "")
    return formattedTime
  }

export const handleOnAnswer = (label, option, questionId, selected, setSelected) => {
    setSelected({...selected, answers: {
        ...selected.answers, [questionId] : [label, option]
    }})    
}
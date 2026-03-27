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

export const showProgress = (progress, totalQuestions) => {
    if (progress === 0) {
        return
    }
    return Math.floor((progress / totalQuestions) * 100)
}

export const sum = (array) => {
    return array.reduce((total, number) => total + number, 0)
}

export const checkDraggedFilesSize = (e, fileSizeLimit, totalFilesSize, setState) => {
    const desiredFileSize = Array.from(e.dataTransfer.files).filter((file) => file.size/(1024 * 1024) <= fileSizeLimit)
    const allSizes = desiredFileSize.map((file) => file.size/(1024 * 1024))
    return desiredFileSize && (totalFilesSize(allSizes) <= fileSizeLimit) ? setState(desiredFileSize) : alert("File size too large")
}

export const checkFilesSize = (e, fileSizeLimit, totalFilesSize, setState) => {
    const desiredFileSize = Array.from(e.target.files).filter((file) => file.size/(1024 * 1024) <= fileSizeLimit)
    const allSizes = desiredFileSize.map((file) => file.size/(1024 * 1024))
    return desiredFileSize && (totalFilesSize(allSizes) <= fileSizeLimit) ? setState(desiredFileSize) : alert("File size too large")
}
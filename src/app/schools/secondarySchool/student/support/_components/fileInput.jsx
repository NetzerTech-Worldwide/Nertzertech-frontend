import { FileTextIcon, Image, Upload, X } from "lucide-react"
import { useRef } from "react"
import { checkDraggedFilesSize, checkFilesSize, sum } from "../../../../../../../lib/helpers"

export const FileInput = ({ name, files, setFiles }) => {
    const fileSizeLimit = 10 //10MB
    const fileRef = useRef(null)

    const handleOnDrop = (e) => {
        e.preventDefault()
        return checkDraggedFilesSize(e, fileSizeLimit, sum, setFiles)
    }

    const handleOnChange = (e) => {
        e.preventDefault()
        return checkFilesSize(e, fileSizeLimit, sum, setFiles)
    }

    const removeFile = (fileName) => {
        const newFiles = files.filter((file) => file.name !== fileName)
        setFiles(newFiles)
    }

    return (
        <main>
            <label htmlFor="files" className="text-xl font-medium">Attach File (Optional)</label>
            {files?.length === 0 ?
                <section onDragOver={(e) => e.preventDefault()} onDrop={handleOnDrop}
                    className={`w-full h-auto py-8 px-6 flex flex-col gap-x-[16px] justify-center items-center text-lg text-[#ACADAF] text-center border-2 border-dashed border-black mt-[10px] rounded-[7px]`}
                >
                   <div className="flex gap-x-[16px] text-center items-center cursor-pointer mb-[7px]">
                        <Upload/>
                        <p>
                            <span onClick={() => fileRef.current.click()}
                                className="text-[#2A7EAF] font-semibold mr-1">
                                Click to upload
                            </span>or drag and drop
                        </p> 
                    </div>
                    <p>PNG, JPG, PDF up to 10 MB</p>
                    <input id="files" name={name} type="file" accept=".png, .jpg, .jpeg, .pdf" multiple
                        onChange={(e) => handleOnChange(e)}
                        ref={fileRef}
                        hidden
                    />
                </section> 
                : 
                <section className="w-full mt-4 grid grid-cols-2 gap-x-5">
                    {files?.length > 0 && Array.from(files).map((file, index) =>
                        <div key={index} className="w-full h-auto flex items-center justify-between py-3 px-4 mb-4 bg-white border border-[#DCDEE1] rounded-[9px]">
                            <div className="flex items-center gap-x-[16px]">
                                <div className="w-9 h-9 p-2 flex justify-center items-center text-[#2A7EAF] bg-[#EAF3F9] rounded-[9px] ">
                                {
                                    file.type.startsWith("image") ? <Image size={18}/>  
                                    : <FileTextIcon size={18} />
                                }
                                </div>
                                <div>
                                    <p>{file.name}</p>
                                    <p className="text-[#5D5C5C] ">
                                        {(file.size/1024).toFixed(2)} KB
                                    </p>
                                </div>
                            </div>
                            <X onClick={() => removeFile(file.name)} 
                                size={15}
                                className="cursor-pointer hover:scale-120 hover:text-[#E63B2E]"
                            />
                        </div>
                    ) }
                </section>
            }
        </main>
    )
}
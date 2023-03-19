import { useEffect, useState } from "react"

export const TextInput = ({placeHolder, name, type, onChange, value}: {placeHolder: string, name?: string, type?: string, onChange?: Function, value?: string | undefined}) => {
    const [innerVal, setInnerVal] = useState('')
    useEffect(() => {
        if(onChange) {
            onChange(innerVal)
        }
    }, [innerVal])
    return <div className="w-full mb-[10px]">
        <input type={type || 'text'} value={value !== undefined ? value: innerVal} onChange={(e) => setInnerVal(e.target.value)} name={name} className="w-full py-[10px] text-dark-blue-grey border-b focus:border-[#4a77e5] outline-transparent" placeholder={placeHolder}/>
    </div>
}
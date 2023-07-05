import React, { useEffect, useRef, useState } from 'react'

const Select = ({options, onChange, value, placeholder}) => {

    const [isSelected, setIsSelected] = useState(false)
    const [highlightedInd, setHighlightedInd] = useState(-1)
    const keyRef = useRef()

    console.log("value", value);

    // useEffect(() => {
    //     onChange(value)
    // },[value])

    const onSelect = () => {
        setIsSelected(!isSelected)
    }

    const onBlurHandler = () => {
        setIsSelected(false)
    }

    const calculateSelected = () => {
        if(value !== "" || isSelected){
            return true
        }
    }

    const onChangeHandler = (value, ind) => {
        onChange(value)
        setHighlightedInd(ind)
    }

    const onPlaceholderClick = () => {
        onChange('')
    }


    useEffect(() => {
        
        const handler = e => {
            if(e.target != keyRef.current) return 
            switch(e.code){
                case "Enter":
                case "Space":
                    setIsSelected(prev => !prev)
                    if(isSelected) onChange(options[highlightedInd])
                    break
                // case "ArrowUp":
                case "ArrowDown":{
                    setHighlightedInd(prev => prev + 1)
                    if(!isSelected){
                        setIsSelected(true)
                        break
                    }
                    if(highlightedInd >= options?.length -1){
                        setHighlightedInd(0)
                    }
                    
                    onChange(options[highlightedInd+1])
                }
                break
                case "ArrowUp":{
                    setHighlightedInd(prev => prev - 1)
                    if(!isSelected){
                        setIsSelected(true)
                        break
                    }
                    if(highlightedInd ===0){
                        setHighlightedInd(options?.length -1)
                    }
                    onChange(options[highlightedInd-1])
                }
                break
                
                case "Escape":
                case "ControlLeft":
                case "ControlRight":
                    setIsSelected(false)
                    break
            }
        }

        keyRef?.current?.addEventListener("keydown", handler)
        return () => {
            keyRef?.current?.removeEventListener("keydown", handler)
        }
    },[isSelected, highlightedInd, options])

    const modalRef = useRef()

    const [customPOsition, setCustomPOsition] = useState()

    useEffect(() => {
        const modalRect = modalRef.current.getBoundingClientRect()
        if(modalRect?.bottom > window.innerHeight){
            setCustomPOsition({top: `calc(-${modalRect?.height}px - 10px)`, minHeight: 'fit-content', borderRadius:" 10px 10px 3px 3px", 
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"})
        }
    },[isSelected])

  return (
    <div ref={keyRef} onBlur={onBlurHandler} tabIndex={0} className='select-wraper' onClick={onSelect}>
        <div className="select" name='customSelect'>{value?.label}</div>
        <label className={`select-label ${calculateSelected() ? 'selected' : ''}`} htmlFor="customSelect">{placeholder}</label>
        <div ref={modalRef} className={`options ${isSelected ? 'selected' : ''}`} style={customPOsition}>
            <ul className='select-ul flex-column'>
                <li className='option placeholder' onClick={onPlaceholderClick}>{placeholder}</li>
                {
                    options?.map((value, ind) => <li className={`option ${highlightedInd === ind ? 'highlighted' : ''}`} key={ind} value={value.value} onClick={() => onChangeHandler(value, ind)}>{value?.label} </li>)
                }
            </ul>
        </div>
    </div>
  )
}

export default Select
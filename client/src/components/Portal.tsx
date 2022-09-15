import {useEffect, useState} from "react"
import {createPortal} from "react-dom"

const Portal = ({children, visible}) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        return () => setMounted(false)
    }, [])

    return mounted && visible
        ? createPortal(children,
            document.querySelector("#my-portal"))
        : null
}

export default Portal
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
// import FormHedling from "./Components/FormHedling"
// import FormHedlingClass from "./Components/FormHedlingClass"
// import NewCrud from "./Components/NewCrud"
import ChildToPerent from "./Components/ChildToPerent"
import { useState } from "react"

function App() {
    let [name, setname] = useState("Ajay Agravat")

    const childToParentData = (value) => {
        name = value
        setname(name)
    }
    // const [isShow, setisShow] = useState(false)

    return (
        <>
            {/* <FormHedling /> */}
            {/* <FormHedlingClass/> */}
            {/* <NewCrud /> */}
            <ChildToPerent name={name} data={childToParentData} />
            {/* 
            {isShow && <h1>hello</h1>}
            <button onClick={() => setisShow(!isShow)}>{!isShow ? "show" : "hide"}</button> */}
        </>
    )
}

export default App

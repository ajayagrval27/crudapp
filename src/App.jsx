import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { createContext } from "react"
import FormHedlingClass from "./Components/FormHedlingClass"
// import FormHedling from "./Components/FormHedling"
// import ClassComp1 from "./Components/ClassComp1"
// import NewCrud from "./Components/NewCrud"
// import ChildToPerent from "./Components/ChildToPerent"
// import { useState } from "react"

export const NameContext = createContext()

function App() {
    // let [name, setname] = useState("Ajay Agravat")

    // const childToParentData = (value) => {
    //     name = value
    //     setname(name)
    // }
    // const [isShow, setisShow] = useState(false)

    return (
        <>
            <FormHedlingClass/>
            {/* <NewCrud /> */}
            {/* <ChildToPerent name={name} data={childToParentData} />
            {isShow && <h1>hello</h1>}
            <button onClick={() => setisShow(!isShow)}>{!isShow ? "show" : "hide"}</button> */}
            {/* <NameContext.Provider value={"Ajay Agravat"}>
                <ClassComp1 />
            </NameContext.Provider> */}
            {/* <FormHedling />  */}
        </> 
    )
}

export default App

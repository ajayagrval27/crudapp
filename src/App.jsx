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

    return (
        <>
            {/* <FormHedling /> */}
            {/* <FormHedlingClass/> */}
            {/* <NewCrud /> */}
            <ChildToPerent name={name} data={childToParentData} />
        </>
    )
}

export default App

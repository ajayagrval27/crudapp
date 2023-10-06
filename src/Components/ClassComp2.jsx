import React, { Component } from "react"
import ClassComp3 from "./ClassComp3"

export class ClassComp2 extends Component {
    render() {
        return (
            <div>
                <h2>Componet-2 :</h2>
                <ClassComp3 />
            </div>
        )
    }
}

export default ClassComp2

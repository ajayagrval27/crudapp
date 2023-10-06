import React, { Component } from "react"
import { NameContext } from "../App"

export class ClassComp3 extends Component {


    render() {

        return (
            <>
                <NameContext.Consumer>
                    {(x) => {
                        return <h2>Componet-3 : {x}</h2>
                    }}
                </NameContext.Consumer>
            </>
        )
    }
}

export default ClassComp3

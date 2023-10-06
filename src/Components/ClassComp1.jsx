import React, { Component } from "react"
import ClassComp2 from "./ClassComp2"



export class ClassComp1 extends Component {

    render() {

        return (
            <div>
                {/* <NameContext.Consumer>
                    {
                        (x) => {
                            return <h2>Componet-1 : {x}</h2>
                        }
                    }
                </NameContext.Consumer> */}
                    <ClassComp2 />
            </div>
        )
    }
}

export default ClassComp1

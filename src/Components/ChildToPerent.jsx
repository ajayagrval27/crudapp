import React from "react"

const ChildToPerent = (props) => {

    console.log(props);

    return (
        <div>
            <h2>child to parent data : {props.name}</h2>
            <button onClick={() => props.data("updated New Name")}>Click</button>
        </div>
    )
}

export default ChildToPerent

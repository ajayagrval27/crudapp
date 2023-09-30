import React, { useState } from "react"
import { Button, Card, Form, ListGroup } from "react-bootstrap"

const NewCrud = () => {
    let [userObj, setuserObj] = useState({})
    let [userArr, setuserArr] = useState([])
    let [blankObj, setblankObj] = useState({})
    let [countId, setcountId] = useState(0)

    const saveUserData = async (e) => {
        if (e.target.type === "checkbox") {
            userObj[e.target.name] = userObj[e.target.name] ?? []
            blankObj[e.target.name] = ""
            if (e.target.checked) {
                userObj[e.target.name] = [
                    ...userObj[e.target.name],
                    e.target.value,
                ]
            } else {
                userObj[e.target.name] = userObj[e.target.name].filter(
                    (x) => x !== e.target.value
                )
            }
        } else if (e.target.type === "file") {
            console.log(e.target)
            userObj[e.target.name] = await toBase64(e.target.files[0])
            blankObj[e.target.name] = ""
        } else {
            userObj[e.target.name] = e.target.value
            blankObj[e.target.name] = ""
        }
        setuserObj({ ...userObj })
        setblankObj({ ...blankObj })
    }

    const submitData = () => {
        if (userObj.id === undefined) {
            countId++
            setcountId(countId)
            userObj.id = countId
            userArr.push(userObj)
        } else {
            let index = userArr.findIndex((item) => item.id === userObj.id)
            userArr.splice(index, 1, userObj)
        }

        setuserArr([...userArr])
        userObj = blankObj
        setuserObj({ ...userObj })
    }

    const deleteData = (id) => {
        let filteredArr = userArr.filter((item) => item.id !== id)
        setuserArr(filteredArr)
    }

    const editData = (id) => {
        let filteredArr = userArr.filter((item) => item.id === id)
        setuserObj(filteredArr[0])
    }

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = reject
        })

    console.log(userArr)

    return (
        <div>
            <Form className="form w-50 mx-auto shadow p-4">
                <h2 className="mb-4">Registration Form</h2>
                <Form.Label className="mt-3">Full Name</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="fname"
                    name="fname"
                    value={userObj.fname ?? ""}
                    onChange={saveUserData}
                    placeholder="Enter Name"
                />
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="email"
                    name="email"
                    value={userObj.email ?? ""}
                    onChange={saveUserData}
                    placeholder="Enter email"
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="password"
                    name="password"
                    value={userObj.password ?? ""}
                    onChange={saveUserData}
                    placeholder="Enter Password"
                />
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="tel"
                    name="mobileNo"
                    value={userObj.mobileNo ?? ""}
                    onChange={saveUserData}
                    placeholder="Mobile No"
                />
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="date"
                    name="dateOfBirth"
                    value={userObj.dateOfBirth ?? ""}
                    onChange={saveUserData}
                    placeholder="Date Of Birth"
                />
                <Form.Label className="d-block">Gender</Form.Label>
                <Form.Check
                    className="d-inline-block me-2"
                    type="radio"
                    name="gender"
                    checked={userObj.gender === "male"}
                    onChange={saveUserData}
                    label="Male"
                    value={"male"}
                />
                <Form.Check
                    className="d-inline-block me-2"
                    type="radio"
                    name="gender"
                    checked={userObj.gender === "female"}
                    onChange={saveUserData}
                    label="Female"
                    value={"female"}
                />
                <Form.Label className="d-block mt-3">Hobbies</Form.Label>
                <Form.Check
                    className="d-inline-block me-2"
                    type="checkbox"
                    name="hobbies"
                    checked={userObj.hobbies?.includes("travelling") === true}
                    onChange={saveUserData}
                    label="Travelling"
                    value={"travelling"}
                />
                <Form.Check
                    className="d-inline-block me-2"
                    type="checkbox"
                    name="hobbies"
                    checked={userObj.hobbies?.includes("reading") === true}
                    onChange={saveUserData}
                    label="Reading"
                    value={"reading"}
                />
                <Form.Check
                    className="d-inline-block me-2"
                    type="checkbox"
                    name="hobbies"
                    checked={userObj.hobbies?.includes("coding") === true}
                    onChange={saveUserData}
                    label="Coding"
                    value={"coding"}
                />
                <br />
                <Form.Label className="mt-2">Profile Image</Form.Label>
                <Form.Control
                    className="mt-2"
                    type="file"
                    name="profileImg"
                    onChange={saveUserData}
                    style={{ width: "auto", height: "auto" }}
                    placeholder="Profile Image"
                />
                <img
                    src={userObj.profileImg}
                    alt=""
                    style={{
                        margin: "10px 0",
                        width: "auto",
                        height: "auto",
                        maxWidth: "100px",
                        maxHeight: "100px",
                    }}
                />
                <br />
                <Button
                    variant="info"
                    onClick={submitData}
                    type="button"
                    className="mt-2">
                    Submit
                </Button>
            </Form>

            {userArr.map((item, index) => {
                return (
                    <Card
                        bg="info"
                        className="d-inline-block mt-4"
                        style={{ width: "16.9rem", fontSize: "0.8rem" }}
                        key={index}>
                        <Card.Header className="fs-6">User Data</Card.Header>
                        <Card.Img
                            className="ms-5 img-fluid"
                            variant="top"
                            src={item.profileImg}
                            style={{ width: "150px", height: "auto" }}
                        />
                        <ListGroup variant="flush">
                            <ListGroup.Item className="list-group-item-info">
                                Id : {item.id}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item-warning">
                                Full Name : {item.fname}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item-info">
                                Email : {item.email}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item-warning">
                                Password : {item.password}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item-info">
                                Mobile No : {item.mobileNo}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item-warning">
                                Date Of Birth : {item.dateOfBirth}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item-info">
                                Gender : {item.gender}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item-warning">
                                Hobbies : {item.hobbies?.join("," ?? "")}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item-warning">
                                <Button
                                    variant="info"
                                    className="me-5"
                                    onClick={() => editData(item.id)}>
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    className="ms-5"
                                    onClick={() => deleteData(item.id)}>
                                    Delete
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                )
            })}
        </div>
    )
}

export default NewCrud

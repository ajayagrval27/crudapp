import React, { useEffect, useState } from "react"
import { Button, Card, Form, ListGroup } from "react-bootstrap"
import "../Assets/css/FormHedling.css"


const FormHedling = () => {
    let [userObj, setuserObj] = useState({})
    let [userArr, setuserArr] = useState(JSON.parse(localStorage.getItem("userArr")) || [])
    let [countId, setcountId] = useState(JSON.parse(localStorage.getItem("countID")) || 0)
    const [blankObj, setblankObj] = useState({})

    // life cycle method

    useEffect(() => {
        localStorage.setItem("userArr", JSON.stringify(userArr))
        localStorage.setItem("countID", JSON.stringify(countId))
        console.log("useEffect", userArr);
        console.log("useEffect", countId);
    } , [userArr, countId])

    const saveData = async (e) => {
        if (e.target.type === "checkbox") {
            userObj[e.target.name] = userObj[e.target.name] ?? []
            blankObj[e.target.name] = []
            if (e.target.checked) {
                userObj[e.target.name] = [
                    ...userObj[e.target.name],
                    e.target.value,
                ]
            } else {
                userObj[e.target.name] = userObj[e.target.name]?.filter(
                    (x) => x !== e.target.value
                )
            }
        } else if (e.target.type === "file") {
            // console.log(e.target)
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
            // localStorage.setItem("countID", JSON.stringify(countId))
        } else {
            let index = userArr.findIndex((x) => x.id === userObj.id)
            userArr.splice(index, 1, userObj)
        }
        setuserArr([...userArr])
        // localStorage.setItem("userArr", JSON.stringify(userArr))
        userObj = blankObj
        setuserObj({ ...userObj })
    }

    const editData = (id) => {
        let editObj = userArr.find((x) => x.id === id)
        userObj = editObj
        setuserObj({ ...editObj })
    }

    const deleteData = (id) => {
        let filterArr = userArr.filter((x) => x.id !== id)
        setuserArr([...filterArr])
    }

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = reject
        })

    return (
        <>
            <Form className="form mx-auto shadow p-4">
                <h1 className="mb-4">Registration Form</h1>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="fname"
                        value={userObj.fname ?? ""}
                        onChange={saveData}
                        placeholder="Enter your Name"
                    />
                </Form.Group>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={userObj.email ?? ""}
                        onChange={saveData}
                        placeholder="Enter your Email"
                    />
                </Form.Group>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={userObj.password ?? ""}
                        onChange={saveData}
                        placeholder="Enter your Password"
                    />
                </Form.Group>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Mobile No.</Form.Label>
                    <Form.Control
                        type="tel"
                        name="mobileNo"
                        value={userObj.mobileNo ?? ""}
                        onChange={saveData}
                        placeholder="Enter your Mobile No."
                    />
                </Form.Group>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={userObj.dateOfBirth ?? ""}
                        onChange={saveData}
                        placeholder="Enter your Date of Birth"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="d-block">Gender</Form.Label>
                    <Form.Check
                        className="d-inline-block me-2"
                        type="radio"
                        name="gender"
                        checked={userObj.gender === "Male"}
                        onChange={saveData}
                        label="Male"
                        value={"Male"}
                    />
                    <Form.Check
                        className="d-inline-block me-2"
                        type="radio"
                        name="gender"
                        checked={userObj.gender === "Female"}
                        onChange={saveData}
                        label="Female"
                        value={"Female"}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="d-block my-2">Hobbies</Form.Label>
                    <Form.Check
                        className="d-inline-block me-2"
                        type="checkbox"
                        name="hobbies"
                        checked={
                            userObj.hobbies?.includes("Traveling") === true
                        }
                        onChange={saveData}
                        label="Traveling"
                        value="Traveling"
                    />
                    <Form.Check
                        className="d-inline-block me-2"
                        type="checkbox"
                        name="hobbies"
                        checked={userObj.hobbies?.includes("Gaming") === true}
                        onChange={saveData}
                        label="Gaming"
                        value="Gaming"
                    />
                    <Form.Check
                        className="d-inline-block me-2"
                        type="checkbox"
                        name="hobbies"
                        checked={userObj.hobbies?.includes("Coding") === true}
                        onChange={saveData}
                        label="Coding"
                        value="Coding"
                    />
                </Form.Group>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="profileImg"
                        onChange={saveData}
                        style={{width:"auto", height:"auto"}}
                    />
                </Form.Group>
                <img
                    src={userObj.profileImg}
                    style={{
                        width: "auto",
                        height: "auto",
                        maxWidth: "100px",
                        maxHeight: "100px",
                    }}
                    alt=""
                />
                <br />
                <Button
                    onClick={submitData}
                    type="button"
                    className="mt-4"
                    variant="info">
                    Submit
                </Button>
            </Form>

            {/* <Table
                    className="mt-5 text-center shadow border-info "
                    striped
                    bordered
                    variant="info"
                    responsive
                    hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Mobile No.</th>
                            <th>Date Of Birth</th>
                            <th>Gender</th>
                            <th>Agree</th>
                            <th>Hobbies</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userArr.map((item, index) => {
                            return (
                                <tr className="table-row" key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.fname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.password}</td>
                                    <td>{item.mobileNo}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.dateOfBirth}</td>
                                    <td>{item.agree}</td>
                                    <td>{item.hobbies?.join(",")}</td>
                                    <td>
                                        <Button
                                            variant="info"
                                            onClick={() => editData(item.id)}>
                                            Edit
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => deleteData(item.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table> */}

            {userArr.map((item, index) => {
                return (
                    <Card
                        bg="info"
                        className="d-inline-block mt-4"
                        style={{ width: "16.9rem", fontSize: "0.8rem" }}
                        key={index}>
                        <Card.Header className="fs-6" >User Data</Card.Header>
                        <Card.Img
                            className="ms-5 img-fluid"
                            variant="top"
                            src={item.profileImg}
                            style={{ width: "150px", height: "auto" }}
                        />
                        <ListGroup variant="flush">
                            <ListGroup.Item className="list-group-item-warning">
                                Id : {item.id}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item-info">
                                Full Name : {item.fname}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item-warning">
                                Email : {item.email}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item-info">
                                Password : {item.password}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item-warning">
                                Mobile No : {item.mobileNo}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item-info">
                                Gender : {item.gender}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item-warning">
                                Date Of Birth : {item.dateOfBirth}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-item-info">
                                Hobbies : {item.hobbies?.join(",")}
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
        </>
    )
}

export default FormHedling

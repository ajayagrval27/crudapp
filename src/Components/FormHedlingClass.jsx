import React, { Component } from "react"
import { Form, Button, Card, ListGroup } from "react-bootstrap"
import "../Assets/css/FormHedlingClass.css"

export default class FormHedlingClass extends Component {
    constructor(props) {
        super(props)

        this.state = {
            obj: {},
            count: 0,
            userArray: [],
            blankObj: {},
        }
    }

    getData = (e) => {
        if (e.target.type == "checkbox") {
            this.state.obj[e.target.name] = this.state.obj[e.target.name] ?? []
            this.state.blankObj[e.target.name] = []
            if (e.target.checked) {
                this.state.obj[e.target.name] = [
                    ...this.state.obj[e.target.name],
                    e.target.value,
                ]
            } else {
                this.state.obj[e.target.name] = this.state.obj[
                    e.target.name
                ].filter((x) => x != e.target.value)
            }
        } else {
            this.state.obj[e.target.name] = e.target.value
            this.state.blankObj[e.target.name] = ""
        }
        this.setState({ ...this.state })
    }
    saveData = () => {
        if (this.state.obj.id == undefined) {
            this.state.count = this.state.count + 1
            this.state.obj.id = this.state.count
            this.state.userArray.push(this.state.obj)
        } else {
            let index = this.state.userArray.findIndex(
                (x) => x.id == this.state.obj.id
            )
            this.state.userArray.splice(index, 1, this.state.obj)
        }
        this.state.obj = { ...this.state.blankObj }
        this.setState({ ...this.state })
    }

    editData = (id) => {
        let editObj = this.state.userArray.find((x) => x.id == id)
        this.state.obj = editObj
        this.setState({ ...this.state })
    }

    deleteData = (id) => {
        let index = this.state.userArray.findIndex((x) => x.id == id)
        this.state.userArray.splice(index, 1)
        this.setState({ ...this.state })
    }

    render() {
        return (
            <>
                <Form className="form mx-auto shadow p-4">
                    <h1 className="mb-4">Registration Form</h1>
                    <Form.Group className="mb-3 mt-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="fname"
                            value={this.state.obj.fname ?? ""}
                            onChange={this.getData}
                            placeholder="Enter your Name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={this.state.obj.email ?? ""}
                            onChange={this.getData}
                            placeholder="Enter your Email"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={this.state.obj.password ?? ""}
                            onChange={this.getData}
                            placeholder="Enter your Password"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <Form.Label>Mobile No.</Form.Label>
                        <Form.Control
                            type="tel"
                            name="mobileNo"
                            value={this.state.obj.mobileNo ?? ""}
                            onChange={this.getData}
                            placeholder="Enter your Mobile No."
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateOfBirth"
                            value={this.state.obj.dateOfBirth ?? ""}
                            onChange={this.getData}
                            placeholder="Enter your Date of Birth"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="d-block">Gender</Form.Label>
                        <Form.Check
                            className="d-inline-block me-2"
                            type="radio"
                            name="gender"
                            checked={this.state.obj.gender === "Male"}
                            onChange={this.getData}
                            label="Male"
                            value={"Male"}
                        />
                        <Form.Check
                            className="d-inline-block me-2"
                            type="radio"
                            name="gender"
                            checked={this.state.obj.gender === "Female"}
                            onChange={this.getData}
                            label="Female"
                            value={"Female"}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="d-block my-2">
                            Hobbies
                        </Form.Label>
                        <Form.Check
                            className="d-inline-block me-2"
                            type="checkbox"
                            name="hobbies"
                            checked={
                                this.state.obj.hobbies?.includes(
                                    "Traveling"
                                ) === true
                            }
                            onChange={this.getData}
                            label="Traveling"
                            value="Traveling"
                        />
                        <Form.Check
                            className="d-inline-block me-2"
                            type="checkbox"
                            name="hobbies"
                            checked={
                                this.state.obj.hobbies?.includes("Gaming") ===
                                true
                            }
                            onChange={this.getData}
                            label="Gaming"
                            value="Gaming"
                        />
                        <Form.Check
                            className="d-inline-block me-2"
                            type="checkbox"
                            name="hobbies"
                            checked={
                                this.state.obj.hobbies?.includes("Coding") ===
                                true
                            }
                            onChange={this.getData}
                            label="Coding"
                            value="Coding"
                        />
                    </Form.Group>

                    <Button
                        onClick={this.saveData}
                        type="button"
                        className="mt-4"
                        variant="info">
                        Submit
                    </Button>
                </Form>

                {this.state.userArray.map((item, index) => {
                    return (
                        <Card
                            bg="info"
                            className="d-inline-block mt-4"
                            style={{ width: "16.9rem", fontSize: "0.8rem" }}
                            key={index}>
                            <Card.Header className="fs-6">
                                User Data
                            </Card.Header>
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
                                        onClick={() => this.editData(item.id)}
                                        className="me-5">
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => this.deleteData(item.id)}
                                        className="ms-5">
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
}

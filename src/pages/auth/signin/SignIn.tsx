import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import ApiClient from "../../../utils/ApiClient";
import { NavLink } from "react-router";

interface SignInForm{
    email : string,
    password : string
}



function SignIn(){
    const [form, setForm] = useState<SignInForm>({
        email : "",
        password : ""
    })

    const onHandleChange = (event : ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target

    setForm({
        ...form,
        [name] : value
    })
}

    const onSubmit = async (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
        const response = await ApiClient.post("/singin", form)

        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}
    return <div className="container mx-auto">
        <h1>Sign In</h1>
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    name="email" 
                    value={form.email}
                    onChange={onHandleChange}
                    type="email"
                    placeholder="email"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    name="password"
                    type="password"
                    placeholder="password"/>
            </Form.Group>
            <br></br>
            <Button type="submit" variant="primary">Simpan</Button>
            {/* <NavLink to="/signup">SignUp</NavLink> */}
        </Form>
    </div>

}
export default SignIn
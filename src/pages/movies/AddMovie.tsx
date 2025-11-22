import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { NavLink } from "react-router"
import ApiClient from "../../utils/ApiClient"

interface FormMovie {
    judul : string,
    tahunRilis : string,
    sutradara : string
}

function AddMovie() {
    const [form, setForm] = useState<FormMovie>({
        judul : " ",
        tahunRilis : " ",
        sutradara : " "
    })

    const handInputChange = (event : ChangeEvent <HTMLInputElement>) => {
        const {name, value} = event.target

        setForm ({
            ...form,
            [name] : value
        })
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await ApiClient.post('/movie', form)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return <div className="container mx-auto">
        <div className ="d-flex justify-content-between mb-3">
            <h2> Add Movie Page </h2>
            <NavLink to="/" className="btn btn-primary"> List Movie </NavLink>
        </div>
        <div>
            <Form onChange={handleSubmit}>
                <Form.Group className= "mb-3" controlId="formJudul">
                    <Form.Label>Judul</Form.Label>
                    <Form.Control
                        value = {form.judul}
                        onChange={handInputChange}
                        name="judul" 
                        type="text" 
                        placeholder="Judul Film"/> 
                        <br></br>
                </Form.Group>
                <Form.Group controlId="formJudul">
                    <Form.Label>Tahun Rilis</Form.Label>
                    <Form.Control 
                        value = {form.tahunRilis}
                        onChange={handInputChange}
                        name="tahunRilis" 
                        type="text" 
                        placeholder="Tahun Rilis"/> 
                        <br></br>
                </Form.Group>
                <Form.Group controlId="formJudul">
                    <Form.Label>Sutradara</Form.Label>
                    <Form.Control 
                        value = {form.sutradara}
                        onChange={handInputChange}
                        name="sutradara" 
                        type="text" 
                        placeholder="Sutradara"/> 
                        <br></br>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Simpan
                </Button>               
            </Form>
        </div>
    </div>
}

export default AddMovie
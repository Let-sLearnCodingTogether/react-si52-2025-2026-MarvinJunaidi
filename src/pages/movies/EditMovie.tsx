import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { NavLink, replace, useNavigate, useParams } from "react-router"
import ApiClient from "../../utils/ApiClient"

interface FormMovie {
    judul : string,
    tahunRilis : string,
    sutradara : string
}

interface ResponseData{
    data : {
        _id : string,
        judul : string,
        sutradara : string,
        tahunRilis : string,
        createdAt : string,
        createdBy : string,
        updateAt : string,
        __v : string
    },
    message : string
}

function EditMovie() {
    const params = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState<FormMovie>({
        judul :"",
        tahunRilis :"",
        sutradara :""
    })

    const fetchMovies = useCallback(async () => {
        const response = await ApiClient.get(`/movie/${params.id}`)

        if(response.status === 200) {
            const ResponseData : ResponseData = response.data
            setForm({
                judul : ResponseData.data.judul,
                tahunRilis : ResponseData.data.tahunRilis,
                sutradara : ResponseData.data.sutradara
            })
        }
    }, [params])

    const handInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target

        setForm ({
            ...form,
            [name] : value
        })
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await ApiClient.put(`/movie/${params.id}`, form)
            navigate("/movie", {replace : true})
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {fetchMovies()}, [fetchMovies])

    return <div className="container mx-auto">
        <div className ="d-flex justify-content-between mb-3">
            <h2> Edit Movie Page </h2>
            <NavLink to="/" className="btn btn-primary"> List Movie </NavLink>
        </div>
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className= "mb-3" controlId="formJudul">
                    <Form.Label>Judul</Form.Label>
                    <Form.Control
                        value = {form.judul}
                        onChange={handInputChange}
                        name="judul" 
                        type="text" 
                        placeholder="Judul Film"/>
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

export default EditMovie
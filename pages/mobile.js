import {MusicScore} from '../components/Music'
import {Button} from 'antd'
import 'antd/dist/antd.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Component, useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Form, Loader } from 'semantic-ui-react';

const Mobile = ({score}) => {
    const [form, setForm] = useState({ title: score.title, description: score.description });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateNote();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const updateMusic = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/scores/${router.query.id}', {
                method: 'PUT',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            });
            // set state
            console.log("put fetch updateMusic")

            // reload the page
            // router.push("/");
        } catch (error) {
            console.log("updateMusic error")
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.title) {
            err.title = 'Title is required';
        }
        if (!form.description) {
            err.description = 'Description is required';
        }

        return err;
    }

    const add_C4 = (e) => {
        console.log("_add_C4 pressed")
        e.preventDefault()
        _putData()
    }

    const add_note = () => {
        console.log("_add_note pressed")

    }

	return (<div>
        <div> This is the mobile interface</div>
        <Button type='primary' onClick={this._add_C4}> Add C4 </Button>
        <Button type='secondary' onClick={this._add_note}> Add Note </Button>

        <div className="form-container">
            <h1>Update Music</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                label='Title'
                                placeholder='Title'
                                name='title'
                                value={form.title}
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                fluid
                                label='Descriprtion'
                                placeholder='Description'
                                name='description'
                                error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                value={form.description}
                                onChange={handleChange}
                            />
                            <Button type='submit'>Update</Button>
                        </Form>
                }
            </div>
        </div>
    </div>)
}

Mobile.getInitialProps = async ({ query: { id } }) => {
    console.log("mobile initial props")

    const res = await fetch('http://localhost:3000/api/scores/${id}');
    console.log(await res.json())

    const { data } = await res.json();
    console.log(data)
    console.log({score: data})

    return { score: data }
}

export default Mobile

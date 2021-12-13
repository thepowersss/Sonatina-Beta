import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { server } from '../config';

const NewNote = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        composer: '',
        header: `%abc-2.2
%%pagewidth 14cm
%%bgcolor white
%%topspace 0
%%leftmargin 0.8cm
%%rightmargin 0.8cm
%%fullsvg 1

X:1
L:1/8
M:4/4
T:Ode to Joy
K:C
`,
        music: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createNote();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const createNote = async () => {
        try {
            const res = await fetch(`${server}/api/scores`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            console.log(JSON.stringify(form))
            router.push("/");
        } catch (error) {
            console.log(error);
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
        if (!form.composer) {
            err.composer = 'Composer is required';
        }
        if (!form.header) {
            err.header = 'Header is required';
        }
        if (!form.music) {
            err.music = 'Music is required';
        }

        return err;
    }

    return (
        <div className="form-container">
            <h1>Create Note</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input

                                error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                label='Title'
                                placeholder='Title'
                                name='title'
                                onChange={handleChange}
                            />
                            <Form.TextArea

                                label='Description'
                                placeholder='Description'
                                name='description'
                                error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Form.TextArea

                                label='Composer'
                                placeholder='Composer'
                                name='composer'
                                error={errors.composer ? { content: 'Please enter a composer', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Form.TextArea

                                label='ABCMusicHeader'
                                placeholder='ABCMusicHeader'
                                name='header'
                                error={errors.header ? { content: 'Please enter abc header', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Form.TextArea

                                label='ABCMusic'
                                placeholder='ABCMusic'
                                name='music'
                                error={errors.music ? { content: 'Please enter abc music', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Button type='submit'>Create</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

export default NewNote;

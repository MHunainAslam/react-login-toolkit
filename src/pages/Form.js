import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../redux/useAuth';
import { Link } from 'react-router-dom';


const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Must be at least 8"),
});

const Form = () => {
    const { data, isLoading, isError, loginUser } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const submitHandler = (data) => {
        console.log(data);
        loginUser(data)  // Pass form data to the parent component or perform further actions
    };
    return (
        <form onSubmit={handleSubmit(submitHandler)}>

            <div>
                <label>Email</label>
                <input {...register("email")} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
                <label>Age</label>
                <input  {...register("password")} />
                {errors.password && <p>{errors.password.message}</p>}
            </div>

            <button type="submit">Submit</button>
            <Link to="/">GO</Link>
        </form>
    )
}

export default Form
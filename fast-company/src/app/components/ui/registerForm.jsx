import React, { useEffect, useState } from "react"
import { validator } from "../../utils/validator"
import TextFiled from "../common/form/textField"

const RegisterForm = () => {
    const [data, setData] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }))
        console.log(name)
    }

    const validatorConfig = {
        email: {
            isRequired: { message: "Почта обязательна для заполнения" },
            isEmail: { message: "Email введён некорректно" }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValidButton = Object.keys(errors).length === 0
    useEffect(() => {
        validate()
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextFiled
                label={"Электронная почта"}
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextFiled
                label={"Пароль"}
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <button
                type="submit"
                disabled={!isValidButton}
                className="btn btn-primary w-100 mx-auto"
            >
                Send
            </button>
        </form>
    )
}

export default RegisterForm

import React, { useState, useEffect } from "react"
import TextField from "../common/form/textField"
import { validator } from "../../utils/validator"
import CheckBoxField from "../common/form/checkBoxField"
import { useAuth } from "../../hooks/useAuth"
import { useHistory } from "react-router-dom"
// import * as yup from "yup"

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false })
    const history = useHistory()
    const { signIn } = useAuth()
    const [errors, setErrors] = useState({})

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    /* const validateScheme = yup.object().shape({
        password: yup
            .string()
            .required(" Пароль обязателен для заполнения ")
            .matches(
                /(?=.*[A-Z])/,
                "Пароль должен содержать хотя бы одну заглавную букву"
            )
            .matches(
                /(?=.*[0-9])/,
                "Пароль должен содержать хотя бы одно число "
            )
            .matches(
                /(?=.*[!@#$%^&*])/,
                "Пароль должен содержать один из специальных символов !@#$%^&* "
            )
            .matches(
                /(?=.{8,})/,
                "Пароль должен состоять минимум из 8 символов "
            ),
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
            .email("Email введен некорректно")
    }) */

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },

        password: {
            isRequired: { message: " Пароль обязателен для заполнения " },

            isCapitalSimbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число "
            },
            minSimbol: {
                message: "Пароль должен состоять минимум из 8 символов ",
                value: 8
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)
        /* validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message })) */
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValidBtn = Object.keys(errors).length === 0

    const handleSubmit = async (event) => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return

        try {
            await signIn(data)
            history.push(
                history.location.state
                    ? history.location.state.from.pathname
                    : "/"
            )
        } catch (error) {
            setErrors(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                <a> Оставатся в системе </a>
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValidBtn}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    )
}

export default LoginForm

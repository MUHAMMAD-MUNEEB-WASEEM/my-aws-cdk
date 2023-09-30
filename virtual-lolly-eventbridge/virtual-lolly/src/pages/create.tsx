import React, { useState, useRef } from "react";
import { Field, Form, Formik} from "formik"
import { Lolly } from "../components/Lollies"
import "../styles/Create.css"
import Header from "../components/Header"
import * as yup from 'yup';
import { useFormik } from 'formik';
import { addLolly} from "../graphql/mutations"
import { API } from "aws-amplify"
import { randomBytes } from "crypto"
import { Grid } from "@material-ui/core";
import "../styles/Create.css"
import * as Yup from "yup"
import gql from "graphql-tag"
import Result from "../components/Final"
import axios from "axios";
import Footer from "../components/Footer"
import shortid from 'shortid'

export default function Create() {

    const [color1, setColor1] = useState("#d52358")
    const [color2, setColor2] = useState("#e95946")
    const [color3, setColor3] = useState("#daea43")
    const recRef = useRef<any>("")
    const senderRef = useRef<any>("")
    const messageRef = useRef<any>("")
    const [link, getlink] = useState("")

    // FORMIK
    const formik = useFormik({
        initialValues: {
            rec: "",
            message: "",
            sender: "",
        },
        onSubmit: (values) => {
            console.log(values)
        },
        validationSchema: yup.object({
            rec: yup.string().required("This field is required"),
            message: yup.string().required("This field is required"),
            sender: yup.string().required("This field is required"),
        })
    })

    const handleFire = async () => {

        if (!recRef || !messageRef || !senderRef) {
            return false
        }

        const link = randomBytes(5).toString("hex")
        getlink(link)
        try {
            const lolly = {
                color1,
                color2,
                color3,
                sender: senderRef.current.value,
                reciever: recRef.current.value,
                message: messageRef.current.value,
                link: getlink,
                id: shortid.generate()
            }

            await API.graphql({
                query: addLolly,
                variables: {
                    lolly: {
                        color1:color1,
                        color2:color2,
                        color3:color3,
                        sender: senderRef.current.value,
                        reciever: recRef.current.value,
                        message: messageRef.current.value,
                        link: getlink,
                        id: shortid.generate()

                    }
                }
            })
        }
        catch (err) {
            console.log
        }
    }

    return (
        <div className="create">
            <Header />
            <div className="lollyFormDiv">
                <div>
                    <Lolly top={color1} middle={color2} bottom={color3} />
                </div>
            {
                !link ? <> <div className="lollyFlavourDiv">
                        <label htmlFor="flavourTop" className="colorPickerLabel">
                            <input
                                type="color"
                                value={color1}
                                className="colorPicker"
                                name="flavourTop"
                                id="flavourTop"
                                onChange={e => {
                                    setColor1(e.target.value)
                                }}
                            />
                        </label>
    
                        <label htmlFor="flavourTop" className="colorPickerLabel">
                            <input
                                type="color"
                                value={color2}
                                className="colorPicker"
                                name="flavourTop"
                                id="flavourTop"
                                onChange={e => {
                                    setColor2(e.target.value)
                                }}
                            />
                        </label>
                        <label htmlFor="flavourTop" className="colorPickerLabel">
                            <input
                                type="color"
                                value={color3}
                                className="colorPicker"
                                name="flavourTop"
                                id="flavourTop"
                                onChange={e => {
                                    setColor3(e.target.value)
                                }}
                            />
                        </label>
                    </div>
    
                        <form className="form-container" onSubmit={formik.handleSubmit}>
                            <label htmlFor="firstName">To</label>
                            <br /> <input
                                id="rec"
                                ref={recRef} 
                                autoComplete="off"
                                type="text"
                                onChange={formik.handleChange}
                            />
    
                            {formik.errors.rec ? <div className="error">{formik.errors.rec}</div> : null}
                            <br /> <label htmlFor="message">Message</label>
                            <br /> <textarea
                                id="message"
                                name="message"
                                placeholder="Say something nice..."
    
                                onChange={formik.handleChange}
                                ref={messageRef}
                            />
                            <br />
                            {formik.errors.message ? <div className="error">{formik.errors.message}</div> : null}
                            <label htmlFor="sender">From</label>
                            <br />
                            <input
                                id="sender"
                                name="sender"
                                type="sender"
                                onChange={formik.handleChange}
                                ref={senderRef}
                                placeholder="From your friend.."
                            />
                            {formik.errors.sender ? <div className="error">{formik.errors.sender}</div> : null}
                            <div className="space-mob">
    
                            </div>
                            <button onClick={() => handleFire()} type="submit">Freeze this lolly and get a link</button>
                        </form></> : <Result link={link} reciever={recRef.current.value} sender={senderRef.current.value} message={messageRef.current.value} />}
                </div>
                <Footer />
                </div >
                )
            }

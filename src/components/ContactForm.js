import React, { useState } from "react";

const ContactForm = () => {
    const [status, setStatus] = useState("Submit")
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        const { name, email, message } = e.target.elements
        let details = {
            name: name.value,
            email: email.value,
            message: message.value
        }
        let response = await fetch("http://localhost:3000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(details)
        })
        setStatus("Submit");
        let result = await response.json();
        alert(result.status);
    }
    return (
        <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", marginTop:"200px",marginLeft:"600px" }}>
            <h1>contact form</h1>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" required/> 
            </div>
            <div>
                <label htmlFor="name">Email:</label>
                <input type="email" id="email" required/> 
            </div>
            <div>
                <label htmlFor="message">Message:</label>
                <textarea id="message" required/> 
            </div>
            <button style={{width:"300px"}} type="submit">{status}</button>
        </form>
    )
}

export default ContactForm;
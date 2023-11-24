import React, { useState } from "react";

const ContactForm = () => {
    const [status, setStatus] = useState("Submit")
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        const { name, email, number, subject, message } = e.target.elements
        let details = {
            name: name.value,
            email: email.value,
            number: number.value,
            subject: subject.value,
            message: message.value
        }
        let response = await fetch("http://localhost:8080/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(details)
        })
        setStatus("Submit");
        let result = await response.json();
        alert(result.status);
        window.location.reload();
    }
    return (
        <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", marginTop:"200px",marginLeft:"600px" }}>
            <h1>contact form</h1>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" required/> 
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" required/> 
            </div>
            <div>
                <label htmlFor="phone">phone number</label>
                <input type="tel" id="number" required/> 
            </div>
            <div>
                <label htmlFor="subject">subject</label>
                <input type="text" id="subject" required/> 
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
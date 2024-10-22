import React, {useState} from 'react';

export const SendMail = () => {
    const [id, setId] = useState('');
    const [value, setValue] = useState('');
    const [fromEmail, setFromEmail] = useState('');
    const [toEmail, setToEmail] = useState('');
    const [files, setFiles] = useState([]); // Support multiple files
    const [subject, setSubject] = useState('');
    const [messageType, setMessageType] = useState('text');
    const [messageBody, setMessageBody] = useState('');
    const [msgType, setMsgType] = useState('primary'); // Dynamic msgType
    const [attachmentPath, setAttachmentPath] = useState(''); // Add this line


    const handleFileUpload = async () => {
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('files', file); // Append multiple files
        });

        try {
            const response = await fetch('http://localhost:7000/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log('Response Data:', JSON.stringify(data));
            if (response.ok && data.filePath) {
                console.log('File path received from server:', data.filePath); // Debugging log
                setAttachmentPath(data.filePath); // Set the ZIP file path
            } else {
                console.error('Error uploading file: No filePath received');
                alert('Error uploading file: Invalid response');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file.');
        }
    };

    const handleSubmit = async () => {
        const htmlMessage = messageType === 'html' ? `<div>${messageBody}</div>` : '';
        const textMessage = messageType === 'text' ? messageBody : '';

        try {
            const response = await fetch('http://localhost:9000/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    value,
                    fromEmail,
                    toEmail,
                    attachmentPath, // Send the uploaded ZIP file path
                    messageSubject: subject,
                    bodyText: textMessage,
                    htmlBody: htmlMessage,
                    msgType, // Dynamic msgType
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Email sent successfully!');

                // Only try to delete the file if an attachment was uploaded
                if (attachmentPath) {
                    try {
                        await fetch(`http://localhost:7000/api/delete-file?path=${attachmentPath}`, {
                            method: 'DELETE',
                        });
                        setAttachmentPath(''); // Clear attachment path after deletion
                    } catch (deleteError) {
                        console.error('Error deleting file:', deleteError);
                    }
                }
            } else {
                console.error('Error sending email:', data.message);
                alert('Error sending email.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Error sending email.');
        }
    };


    return (
        <div className="container mt-5">
            <h1 className="badge text-wrap text-bg-primary fw-bold fst-italic font-monospace text-center mx-auto d-block"
                style={{fontSize: "1rem", padding: "1rem"}}>
                Send Email
            </h1>
            <div className="card mx-auto shadow-lg p-4 bg-body-tertiary rounded"
                 style={{width: "51rem", marginTop: "2rem"}}>
                {/* Dynamic ID Input */}
                <div className="input-group mb-3 mx-auto shadow-lg p-4 bg-body-tertiary rounded">
                    <label htmlFor="id" className="form-label" style={{padding: "1rem"}}>ID</label>
                    <input type="text" className="form-control" id="id" placeholder="ID"
                           value={id} onChange={e => setId(e.target.value)}/>
                </div>
                {/* Dynamic Value Input */}
                <div className="input-group mb-3 mx-auto shadow-lg p-4 bg-body-tertiary rounded">
                    <label htmlFor="value" className="form-label" style={{padding: "1rem"}}>Value</label>
                    <input type="text" className="form-control" id="value" placeholder="Value"
                           value={value} onChange={e => setValue(e.target.value)}/>
                </div>
                <div className="input-group mb-3 mx-auto shadow-lg p-4 bg-body-tertiary rounded">
                    <label htmlFor="fromEmail" className="form-label" style={{padding: "1rem"}}>From</label>
                    <input type="email" className="form-control" id="fromEmail" placeholder="name@example.com"
                           value={fromEmail} onChange={e => setFromEmail(e.target.value)}/>
                </div>
                <div className="input-group mb-3 mx-auto shadow-lg p-4 bg-body-tertiary rounded">
                    <label htmlFor="toEmail" className="form-label" style={{padding: "1rem"}}>To</label>
                    <input type="email" className="form-control" id="toEmail" placeholder="name@example.com"
                           value={toEmail} onChange={e => setToEmail(e.target.value)}/>
                </div>
                {/* File Upload */}
                <div className="input-group mb-3 mx-auto shadow-lg p-4 bg-body-tertiary rounded">
                    <label htmlFor="files" className="form-label" style={{padding: "1rem"}}>Upload Files</label>
                    <input type="file" className="form-control" id="files" multiple
                           onChange={e => setFiles(e.target.files)}/>
                    <button type="button" className="btn btn-info mt-2" onClick={handleFileUpload}>Upload</button>
                </div>
                <div className="input-group mb-3 mx-auto shadow-lg p-4 bg-body-tertiary rounded">
                    <label htmlFor="subject" className="form-label" style={{padding: "1rem"}}>Subject</label>
                    <input className="form-control" id="subject" placeholder="Subject"
                           value={subject} onChange={e => setSubject(e.target.value)}/>
                </div>
                <div className="input-group mb-3 mx-auto shadow-lg p-4 bg-body-tertiary rounded">
                    <textarea className="form-control" placeholder="Message" rows="4"
                              value={messageBody} onChange={e => setMessageBody(e.target.value)}/>
                </div>
                <div className="input-group mb-3 mx-auto shadow-lg p-4 bg-body-tertiary rounded">
                    <div className="form-check" style={{padding: "1rem"}}>
                        <input className="form-check-input" type="radio" name="messageType" id="textRadio"
                               value="text" checked={messageType === 'text'} onChange={() => setMessageType('text')}/>
                        <label className="form-check-label" htmlFor="textRadio">
                            Text Message
                        </label>
                    </div>
                    <div className="form-check" style={{padding: "1rem"}}>
                        <input className="form-check-input" type="radio" name="messageType" id="htmlRadio"
                               value="html" checked={messageType === 'html'} onChange={() => setMessageType('html')}/>
                        <label className="form-check-label" htmlFor="htmlRadio">
                            HTML Message
                        </label>
                    </div>
                </div>
                {/* Dynamic Message Type Selection */}
                <div className="input-group mb-3 mx-auto shadow-lg p-4 bg-body-tertiary rounded">
                    <label htmlFor="msgType" className="form-label" style={{padding: "1rem"}}>Message Type</label>
                    <select className="form-control" id="msgType" value={msgType}
                            onChange={e => setMsgType(e.target.value)}>
                        <option value="primary">Primary</option>
                        <option value="social">Social</option>
                        <option value="updates">Updates</option>
                        <option value="promotions">Promotions</option>
                    </select>
                </div>
                <div className="input-group mb-3 mx-auto shadow-lg p-4 bg-body-tertiary rounded">
                    <button type="button" className="btn btn-success align-items-center mx-auto"
                            style={{fontSize: "1.5rem"}} onClick={handleSubmit}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

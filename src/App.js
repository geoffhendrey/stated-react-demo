import React, { useState, useEffect } from 'react';
import TemplateProcessor  from 'stated-js'; // Ensure this is the correct import

function App() {
    const [message, setMessage] = useState('');
    const [templateProcessor, setTemplateProcessor] = useState(null);

    useEffect(() => {
        const template = {
            "a": "--",
            "b": "${function($e){$set('/a', $e)}}"
        };

        const tp = new TemplateProcessor(template);
        tp.initialize().then(() => {
            setTemplateProcessor(tp);
            setMessage(tp.output.a); // Initially set message to the value of 'a'
        });
    }, []);

    const handleClick = async () => {
        if (templateProcessor && templateProcessor.output.b) {
            await templateProcessor.output.b('Clicked! @ '+ Math.random());
            setMessage(templateProcessor.output.a); // Update the message after 'b' has updated 'a'
        }
    };

    return (
        <div className="App">
            <p>{message}</p>
            <button onClick={handleClick}>Click Me</button>
        </div>
    );
}

export default App;

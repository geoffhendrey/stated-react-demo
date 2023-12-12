# 'stated-react-demo': a demonstration of sourcemap debugging with stated-js
![debugging](https://raw.githubusercontent.com/geoffhendrey/jsonataplay/main/debug-stated-screenshot.png)
This app teachesw ow to webpack an application, which uses state-js, so you can step into stated-js's sourcecode from the chrome debugger

1. clone this repo (https://github.com/geoffhendrey/stated-react-demo)
```shell
git clone git@github.com:geoffhendrey/stated-react-demo.git
```
2. cd into the project
```shell
cd stated-react-demo
````
3. install the project's dependencies (if necessary, update package.json to lastest stated-js)
```shell
yarn install
```
4. start webpack server (will open browser on [localhost:8080](localhost:8080))
```shell 
yarn start
```

This application's App.js is very minimal. It will use stated once when it starts, and again
each time the "click me" button is pressed: 

```js
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
```

5. Place a breakpoint on this line of App.js and RELOAD (CTRL-R), and you will enter stated-js'
`TemplateProcessor.initialize()` method. You can then step line by line through the typescript
```js
    tp.initialize().then(() => {
```
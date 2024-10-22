import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Calculator} from "./components/calculator.jsx";
import {Nav} from "./components/Nav.jsx";
import {Emoji_Search} from "./components/emoji_search.jsx";
import {Snap_Shot} from "./components/Snap_Shot.jsx";
import {BMI_Calculator} from "./components/BMI_Calculator.jsx"
import {Image_Compressor} from "./components/image_compressor.jsx"
import {Counter} from "./components/Counter.jsx"
import {Countimer} from "./components/Counter@.jsx"
import SearchComponent from "./components/SearchComponent.jsx";
import {SendMail} from "./components/SendEmail.jsx"
import {SheetSystem} from "./components/sheetSystem"

function App() {
    const family1 = ["AC", "DEL", "%", "/"];
    const family2 = [7, 8, 9, "*"];
    const family3 = [4, 5, 6, "-"];
    const family4 = [1, 2, 3, "+"];
    const family5 = [0, ".", "="];

    return (
        <Router>
            <Nav/>
            <Routes>
                <Route exact path="/" element={<h1>Welcome to my project! Please go to any tab.</h1>}/>
                <Route
                    path="/calculator"
                    element={
                        <Calculator
                            family1={family1}
                            family2={family2}
                            family3={family3}
                            family4={family4}
                            family5={family5}
                        />}
                />
                <Route path="/emoji-search" element={<Emoji_Search/>}/>
                <Route path="/Snap_shot" element={<Snap_Shot/>}/>
                <Route path="/BMI_Calculator" element={<BMI_Calculator/>}/>
                <Route path="/Image_Compressor" element={<Image_Compressor/>}/>
                <Route path="/Counter" element={<Counter/>}/>
                <Route path="/Counter@" element={<Countimer/>}/>
                <Route path="/GSA" element={<SearchComponent/>}/>
                <Route path="/sendMail" element={<SendMail/>}/>
                <Route path="/sheetSystem" element={<SheetSystem/>}/>
            </Routes>
        </Router>
    );
}

export default App;

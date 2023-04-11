import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./HomePage";
import AddCustomerPage from "./AddCustomerPage";
import EditCustomerPage from "./EditCustomerPage";
function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/add" element={<AddCustomerPage/>}/>
                <Route path="/edit/:name" element={<EditCustomerPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;

import React from 'react'
import Main from '../components/main/Main';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import { Container } from "react-bootstrap"
function Dashboard() {
    return (
        <Container style={{maxWidth:'100%',padding:0}}>
            <Navbar />
            <Main />
            <Sidebar />
        </Container>
    );
}
export default Dashboard



// import React from 'react'
// import {Table} from 'react-bootstrap'

// function Hospital (){
//     return(
//         <div>
//             <h1>THis is hospital page</h1>
//         </div>
//     );
// }
// export default Hospital
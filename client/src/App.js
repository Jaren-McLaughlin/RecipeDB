import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PageContainer from './components/layout/PageContainer';
import DashboardPage from './pages/DashboardPage';
import RecipePage from './pages/RecipePage';
import ApiTestPage from './pages/ApiTestPage';
import EditRecipePage from './pages/EditRecipePage';
import SignInPage from './pages/SignupPage';

function App() {
  return (
    <Router>
      <div className="App">
        <PageContainer>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/api" element={<ApiTestPage />} />
            {/* You can add more routes here as your app grows */}
            <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
            <Route path="/signup" element={<SignInPage />} />
          </Routes>
        </PageContainer>
      </div>
    </Router>
  );
}

export default App;

// function App() {
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(true);

//   //Dummy Hander Functions
//   const handleEdit = (id) => {
//     console.log(`Edit recipe with id of ${id}`)
//   }
  
//   const handleDelete = (id) => {
//     console.log(`Delete recipe with id of ${id}`)
//   }
//   useEffect(() => {
//     // Test connection to backend
//     fetch('/api/test')
//       .then(response => response.json())
//       .then(data => {
//         setMessage(data.message);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error connecting to backend:', error);
//         setLoading(false);
//       });
//   }, []);
  
//   return (
//     <div className="App">
//       <PageContainer>
//         <Container maxWidth="lg">
//           <Box sx={{ my: 4, textAlign: 'center' }}>
//             <Typography variant="h3" component="h1" gutterBottom>
//               Welcome to Recipe Management Suite
//             </Typography>
//             <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
//               Your personal recipe organization system
//             </Typography>
            
//             {loading ? (
//               <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                 <CircularProgress />
//               </Box>
//             ) : (
//               message && (
//                 <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
//                   <Typography variant="body1">
//                     Backend connection: {message}
//                   </Typography>
//                 </Box>
//               )
//             )}

//             {/* Recipe Dashboard Section */}
//             <Box sx={{ mt: 6, mb: 4, textAlign: 'left' }}>
//               <Typography variant="h4" component="h2" gutterBottom>
//                 My Recipes
//               </Typography>
//               <RecipeGrid />
//             </Box>
//           </Box>
//         </Container>
//       </PageContainer>
//     </div>
//   );
// }

// export default App;
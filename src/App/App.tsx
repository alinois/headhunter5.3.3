import './App.css';
import AboutMe from './Page/AboutMe/AboutMe';
import Layout from './Layout';
import NotFound from './Page/NotFound/NotFound';
import OpenVacancy from './Page/OpenVacancy/OpenVacancy';
import Vacancy from './Page/Vacancy/Vacancy';
import '@mantine/core/styles.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path="/" element={<Navigate to="/vacancy" replace />} />
        <Route path="vacancy" element={<Vacancy />} />
        <Route path="vacancy/:city" element={<Vacancy />} />
        <Route path="vacancy/id/:id"element={<OpenVacancy />}/>
        <Route path="about"element={<AboutMe />}/>
        <Route path="*"element={<NotFound />}/>
      </Route>
    </Routes>
  </BrowserRouter>

  );
}

export default App

import { Header } from "./layout"
import { Footer } from "./layout"
import { MovieDetails } from "./layout/MovieDetails"
import { MovieGrid } from "./layout/MovieGrid"
import{ BrowserRouter as Router, Routes, Route} from 'react-router'
function App() {

  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="films/" element={<MovieGrid/>}/>
        <Route path="films/movie/:id" element={<MovieDetails/>}/>
      </Routes>

      <Footer />
      </Router>
    </>
  )
}

export default App

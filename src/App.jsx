import Header from './components/Header';
import Footer from './components/footer';
import CategoryList from './category/CategoryList';
import CourseList from './cours/CoursList';
import TagList from './tag/TagList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import './App.css'

function PageCat() {
  return <CategoryList />;
}
function PageCours() {
  return <CourseList />;
}
function PageTag(){
  return <TagList/>;
}
function App() {
  return (
    <Router>
      <Header/>
      <nav className='flex gap-4 justify-center'>
        <Link to="/">Cours</Link>
        <Link to="/categories">Category</Link>
        <Link to ="/tags">Tag</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CourseList/>} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path='/tags' element={<TagList/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

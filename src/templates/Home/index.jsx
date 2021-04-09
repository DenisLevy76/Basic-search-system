import './styles.css';
import { useEffect, useState } from 'react';
import { Posts } from '../../components/Posts';
import getPosts from '../../scripts/getPosts';


export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState([]);
  const [endOfPages, setEndOfPages] = useState(false);
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const nElementsPerPage = 10;

  const handlePages = () => {
    const maxPage = Math.ceil(posts.length / nElementsPerPage);
    if (page <= maxPage){
      const newPage = posts.slice(0, page * nElementsPerPage)
      setPostsPerPage(newPage)

      setPage(page + 1)

      if(page >= maxPage){
        setEndOfPages(true)
      }
    }

  }

  const handleSearch = (e) => {
    const {value} = e.target
    setSearch(value)
  }

  const componentDidMount = async () => {
    const postsAndPhotos = await getPosts();
    setPosts( postsAndPhotos )
  }

  useEffect(() => {
    componentDidMount();
  },[]);

  useEffect(() => {
    handlePages();
  }, [posts]);

  const filterPosts = search ? postsPerPage.filter( a => a.title.toLowerCase().includes(search.toLowerCase()) 
    || a.body.toLowerCase().includes(search.toLowerCase())) : postsPerPage;

  return (
    <div className="Home">
      <div className="container">
        <input type="search" placeholder="Search" onChange={handleSearch}/>
        <Posts posts={filterPosts}/>
        {!search && (<button disabled={endOfPages} onClick={() => {handlePages(posts)}}>Ver mais</button>)}
      </div>
    </div>
  );
}

export default Home;

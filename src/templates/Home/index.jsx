import './styles.css';
import { Component } from 'react';
// import { getData } from '../../scripts/getData';
import { Posts } from '../../components/Posts';
import getPosts from '../../scripts/getPosts';

export class Home extends Component {
  state = {
    posts: [],
    postsPerPage: [],
    endOfPages: false,
    search: ''
  };

  page = 1;
  nElementsPerPage = 10;

  handlePages(){
    const maxPage = Math.ceil(this.state.posts.length / this.nElementsPerPage);
    if (this.page <= maxPage){
      const vect = this.state.posts;
      const newPage = this.state.posts.slice(0, this.page * this.nElementsPerPage)
      this.setState( { posts: vect, postsPerPage: newPage})
      console.log(maxPage, this.page);
      this.page++
      if(this.page > maxPage){
        this.setState( { posts: vect, postsPerPage: newPage, endOfPages: true } )
      }
    }else{

    }
  }

  handleSearch = (e) => {
    const {value} = e.target
    this.setState({search: value})
  }

  componentDidMount = async () => {
    const postsAndPhotos = await getPosts();
    
    this.setState( { posts: postsAndPhotos } );
    this.handlePages();
  }

  render() {
    const {postsPerPage, search} = this.state;
    const filterPosts = search ? postsPerPage.filter( a => a.title.toLowerCase().includes(search.toLocaleLowerCase()) 
      || a.body.toLowerCase().includes(search.toLocaleLowerCase())) : postsPerPage;

    return (
      <div className="Home">
        <div className="container">
          <input type="search" placeholder="Search" onChange={this.handleSearch}/>
          <Posts posts={filterPosts}/>
          {!search && (<button disabled={this.state.endOfPages} onClick={() => {this.handlePages()}}>Ver mais</button>)}
        </div>
      </div>
    );
  }
}

export default Home;

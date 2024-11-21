import {CardV2} from '../../../../components';
import Preloader from './components/Preloader';
import NoPost from './components/NoPost';

const Pagination = ({getPost}) => {
  return (<div className="flex items-center justify-center mb-3">
    <button type="button" onClick={() => getPost()} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
      Load More
    </button>
  </div>);
}

const Post = (props) => {
  const {
    content,
    getPost,
    postLoaded,
    noPost,
    switchPage,
    paginationEnd
  } = props;

  const type = {
    type: 'POST'
  }

  const renderPost = () => {
    return content.map(props => {
      const includeFn = {
        ...props,
        switchPage
      }
      const combined = {...type, ...includeFn};
      return (<CardV2 {...combined} />)
    })
  }

  return(<>
    {postLoaded && renderPost()}
    {!postLoaded && (<Preloader/>)}
    {noPost && (<NoPost/>)}
    {(postLoaded && !paginationEnd) && (<Pagination getPost={getPost}/>)}
  </>)
}
  
export default Post;
import { useSelector } from 'react-redux';
import { appState } from '../../../app/appSlice';
import {
  Root,
  Tag,
  Post
} from './type';

const CardContainer = (props) => {
  const currentAppState = useSelector(appState);
  const {cardComponent} = currentAppState;
  const {type} = cardComponent;

  const renderComponent = () => {
    switch(type) {
      case 'ROOT':
        return <Root {...props}/>
      case 'TAG':
        return <Tag {...props}/>
      case 'POST':
        return <Post {...props}/>
      default:
        return null;
    }
  }

  return(renderComponent())
}
  
export default CardContainer
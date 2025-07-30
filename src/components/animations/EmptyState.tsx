import { Player } from '@lottiefiles/react-lottie-player';
import EmptyStateJSON from '@/assets/animations/empty_state.json';

const EmptyState = () => {
  return <Player autoplay loop src={EmptyStateJSON} style={{ height: '250px', width: '250px' }} />;
};

export default EmptyState;

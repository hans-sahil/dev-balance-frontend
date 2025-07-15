import Sidebar from '../Sidebar';
import FullScreenLayout from './FullScreen';

interface propTypes {
  children: React.ReactNode;
}
const CommonPage = ({ children }: propTypes) => {
  return (
    <FullScreenLayout>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </FullScreenLayout>
  );
};

export default CommonPage;

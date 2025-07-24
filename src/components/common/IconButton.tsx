interface IconButtonProps {
  children: React.ReactElement;
}
const IconButton: React.FC<IconButtonProps> = ({ children }) => {
  return (
    <div className="p-2 rounded-md hover:bg-gray-100 cursor-pointer active:bg-gray-200">
      {children}
    </div>
  );
};

export default IconButton;

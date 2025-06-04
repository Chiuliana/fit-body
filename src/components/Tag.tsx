export interface TagProps extends React.PropsWithChildren {
  className?: string;
}

const Tag: React.FC<TagProps> = ({ className = '', children }) => {
  return (
    <div
      className={`text-xs px-2 py-1 font-medium rounded-full w-fit h-fit ${className}`}
    >
      {children}
    </div>
  );
};

export default Tag;

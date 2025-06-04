import { FiSearch } from 'react-icons/fi';

export interface SearchProps extends React.HTMLProps<HTMLInputElement> {
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
}

const Search: React.FC<SearchProps> = ({
  className,
  style,
  inputClassName,
  inputStyle,
  ...rest
}) => {
  return (
    <div
      className={`flex items-center gap-3 p-3 dark:bg-neutral-700 dark:text-white/50 rounded-xl shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)] ${className}`}
      style={style}
    >
      <FiSearch />
      <input
        {...rest}
        className={`dark:text-white text-black placeholder:text-black/50 dark:placeholder:text-white/50 w-full focus:outline-0 ${inputClassName}`}
        style={inputStyle}
      />
    </div>
  );
};

export default Search;

const Button = ({ onClick, icon: Icon, positionClasses, additionalClasses }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute ${positionClasses} transform bottom-5 text-black bg-white bg-opacity-50 p-[1vw] rounded-full hover:bg-opacity-80 transition duration-300 ${additionalClasses}`}
    >
      {Icon && <Icon />}
    </button>
  );
};

export default Button;

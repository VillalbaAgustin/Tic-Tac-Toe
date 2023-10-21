export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  const hadleClick = () => {
    updateBoard(index);
  };
fun
  return (
    <div className={className} onClick={hadleClick}>
      {children}
    </div>
  );
};

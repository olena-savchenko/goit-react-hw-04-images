import { RotatingLines } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <RotatingLines
      strokeColor="rgba(63, 81, 181, 0.7)"
      strokeWidth="9"
      animationDuration="1"
      width="70"
      visible={true}
    />
  );
};

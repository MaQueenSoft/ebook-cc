import { FallingLines } from "react-loader-spinner";

const FallingLinesLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <FallingLines color="#4338CA" width="100" visible={true} />
    </div>
  );
};

export { FallingLinesLoader };

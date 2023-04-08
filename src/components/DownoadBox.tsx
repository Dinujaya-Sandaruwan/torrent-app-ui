import { IoMdClose } from "react-icons/io";
import { BsCloudArrowDownFill } from "react-icons/bs";
import {humanBytes} from "../utils/Functions";

interface Props {
  name: string;
  status: string;
  current: number;
  total: number;
  speed: string;
}

const DownloadBox = ({ name, status, current, total, speed }: Props) => {
  const p = (current / total) * 100;
  let progress = p.toFixed(2) + "%";
  if (progress === "NaN%") progress = "100%";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-900 text-white border border-gray-800 rounded-md p-2 my-2">
      <div className="flex items-center">
        <div className="h-10 w-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
          <BsCloudArrowDownFill className="text-2xl text-white" />
        </div>
        <div className="ml-2">
          <p className="text-base">{name}</p>
          <p className="text-sm text-blue-400">{status} ({progress})</p>
        </div>
      </div>
      <div className="flex items-center">
        <ProgressBar progress={progress} />
        <div className="ml-2">
          <p className="text-sm">
            {humanBytes(current)} / {humanBytes(total)}
          </p>
          <p className="text-sm">{speed}</p>
          {/* <p className="text-sm">{eta} remaining</p> */}
        </div>
      </div>
      <div className="ml-2">
        {status.toLowerCase() === "downloading" && (
          <button
            className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-500"
            // onClick={stopDownload}
          >
            <IoMdClose />
          </button>
        )}
      </div>
    </div>
  );

};

export default DownloadBox;


interface ProgressBarProps {
  progress: string;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="relative w-32 h-2 bg-gray-800 rounded-md overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-green-500"
        style={{ width: `${progress}` }}
      ></div>
    </div>
  );
};

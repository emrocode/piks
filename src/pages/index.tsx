import { usePiks } from "@/contexts";
import { PiksPreview, PiksUpload } from "@/components";

const Home: React.FC = () => {
  const { publicId } = usePiks();

  return (
    <div className="grid size-full place-items-center">
      {publicId ? <PiksPreview /> : <PiksUpload />}
    </div>
  );
};

export default Home;

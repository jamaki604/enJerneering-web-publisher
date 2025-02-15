import { TextBoxData } from "./types/TextBoxData";
import TextBoxType from "./_TextBox";

interface TextBoxProps {
    type: number;
    data: TextBoxData;
  }

const TextBox: React.FC<TextBoxProps> = ({ type, data }) => {
    const renderTextBoxComponent = (type: number) => {
      switch (type) {
        case 1:
          return <TextBoxType data={data} />;
        default:
          throw new Error(`Footer type ${type} is not supported`);
      }
    };
  
    return <>{renderTextBoxComponent(type)}</>;
  };
  
  export default TextBox;
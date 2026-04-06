import RichTextEditor from "../../../../components/common/RichTextEditor";
import FileInput from "../../../../components/common/FileInput";

const FormSection = ({ 
    title, 
    description, 
    richTextProps, 
    fileInputProps 
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-[15px] font-bold">{title}</h3>
            <p className='text-[12px] text-gray-500'>{description}</p>
            <hr className='border-[#D9D9D9]/80 my-6'/>
            
            <RichTextEditor {...richTextProps} />
            {fileInputProps && <FileInput {...fileInputProps} />}
        </div>
    );
};

export default FormSection;

import React, {useEffect, useRef, useState} from 'react';
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import JoditEditor from "jodit-react";
import {IoIosAddCircleOutline, IoIosRemoveCircleOutline, IoIosTrash} from "react-icons/io";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getSubjects} from "../../redux/subjectsSlice/subjectsSlice";

const CreateTest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch()

  const {subjects} = useSelector((state) => state.subject)

  useEffect(() => {
    dispatch(getSubjects())
  }, []);

  const editor = useRef(null);
  const correctAnswerRef = useRef(null);

  const [showRequired, setShowRequired] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // variables
  const variants = [
    { value: "a", label: "A" },
    { value: "b", label: "B" },
    { value: "c", label: "C" },
    { value: "d", label: "D" },
    { value: "e", label: "E" },
    { value: "f", label: "F" },
    { value: "g", label: "G" },
    { value: "h", label: "H" },
  ];

  const [data, setData] = useState({
    id: null,
    modul_id: null,
    sistema_id: null,
    image: '',
    image2: '',
    image3: '',
    question: "",
    correct_answer: "",
    correct_answer_key: "",
    options: [{ key: "", answer: "" }],
    modul_name: "",
    modul_unique_name: "",
  });

  const handleSelectChange = (selectedOption, index) => {
    const newFormData = JSON.parse(JSON.stringify(data.options));
    newFormData[index].key = selectedOption.value;
    setData({ ...data, options: newFormData });
  };

  const handleInputChange = ({ target: { value } }, index) => {
    const newFormData = JSON.parse(JSON.stringify(data.options));
    newFormData[index].answer = value;
    setData({ ...data, options: newFormData });
  };

  const handleAddForm = () => {
    setData({ ...data, options: [...data.options, { key: "", answer: "" }] });
  };

  const handleDeleteForm = (index) => {
    const newFormData = [...data.options];
    newFormData.splice(index, 1);
    setData({ ...data, options: newFormData });
  };

  console.log(data)

  return (
    <form className="card">
      <div className="my-5 flex flex-wrap lg:flex-nowrap items-start gap-5">
        <div className="w-full lg:w-1/2">
          <div className='flex items-center flex-wrap lg:flex-nowrap gap-5'>
            <div className='w-full'>
              <label htmlFor="moduleName">Select Subject</label>
              <Select
                required={true}
                options={subjects}
                getOptionLabel={(subject) => subject.subject}
                getOptionValue={(subject) => subject.id}
                onChange={(e) => setData({...data, subject: e.id})}
                styles={{menuPortal: (base) => ({...base, zIndex: 9999})}} // << menuPortal uchun z-index
              />
              <p className="text-danger">
                {showRequired && !data.subject && "required"}
              </p>
            </div>
          </div>
          {data.options &&
            data.options.map((section, index) => (
              <div key={index} className="flex items-center flex-wrap lg:flex-nowrap gap-5 mt-5">
                <label className="w-full lg:w-2/12">
                  Key
                  <Select
                    placeholder=""
                    options={variants}
                    value={
                      variants.find((option) => option.value === data.key) || {
                        value: section.key,
                        label: section.key.toUpperCase(),
                      }
                    }
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, index)
                    }
                    styles={{
                      menuPortal: (base) => ({...base, zIndex: 19}), // Increase zIndex value
                      menu: (base) => ({...base, zIndex: 19}), // Ensure the dropdown menu has a high zIndex
                    }}
                    menuPortalTarget={document.body} // Render the dropdown outside the current DOM hierarchy
                    menuPosition="fixed"
                  />
                  <p className="text-danger">
                    {showRequired && !section.key && "required"}
                  </p>
                </label>
                <label className="w-10/12 lg:w-9/12">
                  Answer
                  <input
                    type="text"
                    className="form-input"
                    value={section.answer}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <p className="text-danger">
                    {showRequired && !section.answer && "required"}
                  </p>
                </label>

                <div className="w-1/12 flex justify-between items-center mt-8">
                  {index === data.options.length - 1 && (
                    <button
                      type="button"
                      className="text-primary"
                      onClick={handleAddForm}
                    >
                      <IoIosAddCircleOutline size="20px"/>
                    </button>
                  )}
                  {data.options.length !== 1 && (
                    <button
                      type="button"
                      className="text-danger"
                      onClick={() => handleDeleteForm(index)}
                    >
                      <IoIosRemoveCircleOutline size="20px"/>
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>

        <div className="w-full lg:w-1/2">
          <label htmlFor="testQuestion">Test question</label>
          <JoditEditor
            className="mt-1 mb-3"
            ref={editor}
            value={data.question}
            onChange={(newContent) => {
              setData({...data, question: newContent});
            }}
          />

          <p className="text-danger">
            {showRequired && !data.question ? "required field" : ""}
          </p>

          <label htmlFor="fileUpload" className="mt-3 ">
            Image
          </label>
          <div className={'flex items-center gap-1'}>
            <input
              id="fileUpload"
              type="file"
              className="form-file-input"
              accept={'image/png, image/jpeg, image/jpg, image/svg'}
              // onChange={uploadSecondImage}
            />
            <div
              className={'bg-red-500 rounded flex items-center px-2 py-1 cursor-pointer'}
              onClick={() => {
                // setImageName2('');
                // setIsUploaded2(false);
                // setData({...data, image2: id ? 'delete' : ''});
              }}
            >
              <IoIosTrash size={30} color={'#fff'}/>
            </div>
          </div>

          <span className="bg-primary text-white py-1 px-3 mt-2 inline-block rounded">
            {/*{(imageName2 === 'delete' || imageName2 === '' || imageName2 === null) ? 'No photo' : imageName2}*/}
          </span>
        </div>
      </div>

      <hr/>
      <div className="mt-5">
        <h1>Correct answer</h1>
        <div className="mt-10 flex gap-5 flex-wrap lg:flex-nowrap">
          <div className="relative z-10 w-full lg:w-3/12">
            <label className="w-full lg:w-1/12">
              Key
              <Select
                className="w-full"
                placeholder=""
                options={variants}
                value={{
                  value: data.correct_answer_key,
                  label: data.correct_answer_key.toUpperCase(),
                }}
                onChange={(e) =>
                  setData({...data, correct_answer_key: e.value})
                }
              />
              <p className="text-danger">
                {showRequired && !data.correct_answer_key
                  ? "required field"
                  : ""}
              </p>
            </label>

            <label htmlFor="fileUpload" className="mt-3 inline-block">
              Image
            </label>
            <div className={'flex items-center gap-2'}>
              <input
                id="fileUpload"
                type="file"
                accept={'image/png, image/jpeg, image/jpg, image/svg'}
                className="form-file-input"
                // onChange={uploadImage}
              />
              <div
                className={'bg-red-500 rounded flex items-center px-2 py-1 cursor-pointer'}
                onClick={() => {
                  // setImageName('');
                  // setIsUploaded(false);
                  // setData({...data, image: id ? 'delete' : ''});
                }}
              >
                <IoIosTrash size={30} color={'#fff'}/>
              </div>
            </div>

            <span className="bg-primary text-white py-1 px-3 mt-2 inline-block rounded">
              {/*{(imageName === 'delete' || imageName === '' || imageName === null) ? 'No photo' : imageName}*/}
            </span>

            <div className="mt-5">
              <label htmlFor="fileUpload" className="inline-block">
                Image 2
              </label>
              <div className={'flex items-center gap-2'}>
                <input
                  id="fileUpload"
                  type="file"
                  accept={'image/png, image/jpeg, image/jpg, image/svg'}
                  className="form-file-input"
                  // onChange={uploadThirdImage}
                />
                <div
                  className={'bg-red-500 rounded flex items-center px-2 py-1 cursor-pointer'}
                  onClick={() => {
                    // setImageName3('');
                    // setIsUploaded3(false);
                    // setData({...data, image3: id ? 'delete' : ''});
                  }}
                >
                  <IoIosTrash size={30} color={'#fff'}/>
                </div>
              </div>

              <span className="bg-primary text-white py-1 px-3 mt-2 inline-block rounded">
                {/*{(imageName3 === 'delete' || imageName3 === '' || imageName3 === null) ? 'No photo' : imageName3}*/}
              </span>
            </div>
          </div>

          <label className="relative z-10 w-full lg:w-11/12">
            Answer
            <JoditEditor
              // ref={correctAnswerRef}
              // value={data.correct_answer}
              // onChange={(newContent) => {
              //   setData({...data, correct_answer: newContent});
              //}}
            />
            <p className="text-danger">
              {/*{showRequired && !data.correct_answer ? "required field" : ""}*/}
            </p>
          </label>
        </div>
      </div>

      <div className="flex justify-end mt-10 mb-5">
        {isSubmitted ? (
          <button
            type="button"
            disabled
            className="btn-primary flex gap-3 items-center justify-between"
          >
            <AiOutlineLoading3Quarters className="animate-spin"/>
            Processing...
          </button>
        ) : (
          <button type="submit" className="btn-primary">
            Save
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateTest;
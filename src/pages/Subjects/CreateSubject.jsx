import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {createSubject, getSubjects, updateSubject} from "../../redux/subjectsSlice/subjectsSlice";
import {toast} from "react-toastify";

const CreateSubject = ({isModalOpen, subjectId, closeModal, nameProps}) => {

  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("")

  useEffect(() => {
    setName(nameProps)
  }, [nameProps]);

  const createOrUpdateSubject = () => {
    if (subjectId) {
      if (isSubmitted) return;
      dispatch(updateSubject({name, id: subjectId})).then(({payload}) => {
        if (payload?.data?.success) {
          toast.success("Updated successfully!")
          closeModal()
          dispatch(getSubjects())
          setIsSubmitted(false)
        }
      })
      setIsSubmitted(true)
      setName("")
    } else {
      if (isSubmitted) return;
      dispatch(createSubject({name})).then(({payload}) => {
        if (payload?._id) {
          toast.success("Created successfully!")
          closeModal()
          dispatch(getSubjects())
          setIsSubmitted(false)
        }
      })
      setIsSubmitted(true)
      setName("")
    }
  }

  return (
    <>
      <div
        className={
          isModalOpen
            ? "fixed z-50 inset-0 overflow-y-auto"
            : "opacity-0 pointer-events-none"
        }
      >
        <div
          className={
            isModalOpen
              ? "flex items-center justify-center min-h-screen"
              : "hidden"
          }
        >
          <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-gray-100 p-4">
              <h3 className="text-lg font-medium text-gray-900">{subjectId ? "Update Subject" : "Create Subject"}</h3>
            </div>
            <div className="p-4">
              <div className="w-full">
                <label htmlFor="moduleName">Subject name</label>
                <input
                  required
                  id="moduleName"
                  type="text"
                  className="form-input focus:outline-none"
                  placeholder="Subject name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="bg-gray-100 p-4 flex gap-5 justify-end">
              <button className="btn-secondary" onClick={closeModal}>
                Cancel
              </button>
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
                <button
                  type="submit"
                  className={`${subjectId ? "btn-warning" : "btn-primary"} disabled:opacity-25`}
                  disabled={!name}
                  onClick={createOrUpdateSubject}
                >
                  {subjectId ? "Update" : "Create"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSubject;
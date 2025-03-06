import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteSubject, getSubjects} from "../../redux/subjectsSlice/subjectsSlice";
import LoadingPage from "../../components/LoadingPage";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import CreateSubject from "./CreateSubject";
import {toast} from "react-toastify";
import DeleteModal from "../../components/DeleteModal";

const Subjects = () => {
  const dispatch = useDispatch()
  const {loading, subjects} = useSelector((state) => state.subject)
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [subjectId, setSubjectId] = useState(undefined)
  const [subjectName, setSubjectName] = useState("")

  useEffect(() => {
    dispatch(getSubjects())
    setSubjectName("")
    setSubjectId("")
  }, [dispatch]);

  useEffect(() => {
    if (!modal) {
      setSubjectId("")
      setSubjectName("")
    }
  }, [modal]);

  const handleCloseModal = () => {
    setModal(false)
    setDeleteModal(false)
    setSubjectId(undefined)
  }

  const handleDelete = () => {
    return dispatch(deleteSubject(subjectId)).then(() => {
      toast.success("Deleted successfully!")
      dispatch(getSubjects())
      handleCloseModal()
    })
  }

  if (loading) return <LoadingPage/>

  return (
    <div className="card">
      <div className="flex justify-center flex-col overflow-y-auto lg:flex-row lg:justify-between">
        <div className={'flex items-center ml-auto gap-5 flex-col lg:flex-row'}>
          <button
            className="btn-primary mt-1 inline-block text-sm lg:text-lg"
            onClick={() => {
              setSubjectId(undefined)
              setModal(true)
            }}
          >
            Create Subject
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-3 overflow-y-auto">
        <div className="my-2">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Subject name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Test count
                  </th>

                  <th
                    scope="col"
                    className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {subjects?.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-2 py-4 whitespace-nowrap text-center">
                      {index + 1}
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-center">
                      {item?.subject}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {item?.count}
                    </td>

                    <td
                      className="flex items-center justify-center px-4 py-4 whitespace-nowrap text-center text-sm font-medium"
                    >
                      <button
                        className="btn-warning btn-sm inline-block"
                        onClick={() => {
                          setSubjectId(item?.id)
                          setSubjectName(item?.subject)
                          setModal(true)
                        }}
                      >
                        <span>
                          <AiFillEdit/>
                        </span>
                      </button>

                      <button
                        className="btn-danger btn-sm ml-3"
                        onClick={() => {
                          setSubjectId(item?.id)
                          setDeleteModal(true)
                        }}
                      >
                        <AiFillDelete/>
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <CreateSubject isModalOpen={modal} subjectId={subjectId} closeModal={handleCloseModal} nameProps={subjectName}/>
      <DeleteModal isModalOpen={deleteModal} closeModal={handleCloseModal} confirm={handleDelete}/>
    </div>
  );
};

export default Subjects;
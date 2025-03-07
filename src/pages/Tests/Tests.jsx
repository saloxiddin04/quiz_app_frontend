import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {deleteTest, getAllTests} from "../../redux/testSlice/testSlice";
import Pagination from "../../components/Pagination";
import instance from "../../plugins/axios";
import DeleteModal from "../../components/DeleteModal";
import {toast} from "react-toastify";

const Tests = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {loading, tests} = useSelector(state => state.test)

  const [removeModal, setRemoveModal] = useState(false)
  const [id, setId] = useState(null)

  useEffect(() => {
    dispatch(getAllTests({limit: 10, page: 1}))
  }, []);

  const handlePageChange = (page) => {
    dispatch(getAllTests({limit: 10, page}))
  }

  const closeRemoveModal = () => {
    setId(null)
    setRemoveModal(false)
  }

  const removeTest = () => {
    return dispatch(deleteTest(id)).then(({payload}) => {
      if (payload?.success) {
        toast.success(payload?.message)
        closeRemoveModal()
        dispatch(getAllTests({limit: 10, page: 1}))
      }
    })
  }

  return (
    <div className="card">
      <div className="flex justify-center flex-col overflow-y-auto lg:flex-row lg:justify-between">
        <div className={'flex items-center gap-5 flex-col lg:flex-row'}>
          <button
            className="btn-primary mt-1 inline-block text-sm lg:text-lg"
            onClick={() => {
            }}
          >
            Create Test
          </button>
        </div>
        <Pagination
          totalItems={tests?.count}
          itemsPerPage={10}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="flex flex-col mt-3 overflow-y-auto">
        <div className="my-2">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              {loading
                ?
                <LoadingPage/>
                :
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
                      Question
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Correct Answer
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Subject name
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Answer Image
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Correct Answer Image
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Explanation
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
                  {tests?.data?.map((item, index) => (
                    <tr key={item?._id}>
                      <td className="px-2 py-4 whitespace-nowrap text-center">
                        {index + 1}
                      </td>
                      <td className="px-1 py-4 whitespace-nowrap text-center">
                        <div dangerouslySetInnerHTML={{__html: item?.text}}/>
                      </td>
                      <td className="px-1 py-4 whitespace-nowrap text-center">
                        {item?.correctAnswer}
                      </td>
                      <td className="px-1 py-4 whitespace-nowrap text-center">
                        {item?.subject?.name}
                      </td>
                      <td className="px-2 py-4 text-center text-sm text-gray-500">
                        {item?.imagePath && (
                          <img className="w-[100px] h-[40px] object-cover m-auto"
                               src={`${instance.defaults.baseURL}/${item?.imagePath}`} alt="image"
                          />
                        )}
                      </td>
                      <td className="px-2 py-4 text-center text-sm text-gray-500">
                        {item?.correctAnswerImg && (
                          <img className="w-[100px] h-[40px] object-cover m-auto"
                               src={`${instance.defaults.baseURL}/${item?.correctAnswerImg}`} alt="image"
                          />
                        )}
                      </td>
                      <td className="px-1 py-4 whitespace-nowrap text-center">
                        <div dangerouslySetInnerHTML={{__html: item?.explanation}}/>
                      </td>

                      <td
                        className="flex items-center justify-center px-4 py-4 whitespace-nowrap text-center text-sm font-medium"
                      >
                        <button
                          className="btn-warning btn-sm inline-block"
                          onClick={() => {

                          }}
                        >
                        <span>
                          <AiFillEdit/>
                        </span>
                        </button>

                        <button
                          className="btn-danger btn-sm ml-3"
                          onClick={() => {
                            setId(item?._id)
                            setRemoveModal(true)
                          }}
                        >
                          <AiFillDelete/>
                        </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              }
            </div>
          </div>
        </div>
      </div>
      <DeleteModal isModalOpen={removeModal} closeModal={closeRemoveModal} confirm={removeTest} />
    </div>
  );
};

export default Tests;
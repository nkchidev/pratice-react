import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModelEditUser from './ModelEditUser';
import ModalDelete from './ModalConfirm';
import _ from 'lodash';
import "./TableUsers.scss"

const TableUsers = (props) => {
  const [listUser, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [sortBy, setSortBy] = useState('asc');
  const [fieldSort, setFieldSort] = useState('id');

  useEffect(() => {
    getUsers(1);
  }, [])

  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  }

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setListUser(res.data);
      setTotalPages(res.total_pages);
      setTotalUsers(res.total);
    }
  }

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  }

  const handleEditUser = (user) => {
    setIsShowModalEditUser(true);
    setDataUserEdit(user);
  }

  const handleEditUserFromModal = (userEdit) => {
    let cloneListUser = _.cloneDeep(listUser);
    let index = listUser.findIndex(item => item.id === userEdit.id);
    cloneListUser[index].first_name = userEdit.first_name;
    setListUser(cloneListUser);
  }

  const handleDeleteUser = (userDelete) => {
    setIsShowModalDeleteUser(true);
    setDataUserDelete(userDelete);
  }

  const handleDeleteUserFromMoal = (userDelete) => {
    let cloneListUser = _.clone(listUser);
    cloneListUser = cloneListUser.filter(item => item.id !== userDelete.id);
    setListUser(cloneListUser);
  }

  const handleSort = (sortBy, fieldSort) => {
    setSortBy(sortBy);
    setFieldSort(fieldSort);
    let cloneListUser = _.clone(listUser);
    cloneListUser = _.orderBy(cloneListUser, [fieldSort], [sortBy]);
    setListUser(cloneListUser);
  }

  return (
    <>
      <div className='my-3 add-new'>
        <span><b>List users</b></span>
        <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add new user</button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='sort-header'>
              <span>ID</span>
              <span>
                <i className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("desc", "id")}>
                </i>
                <i className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("asc", "id")}>
                </i>
              </span>
            </th>
            <th>Email</th>
            <th className='sort-header'>
              <span>First Name</span>
              <span>
                <i className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("desc", "first_name")}>
                </i>
                <i className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("asc", "first_name")}>
                </i>
              </span>
            </th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length > 0 &&
            listUser.map((item, index) => (
              <tr key={`user-${index}`}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>
                  <button
                    className='btn btn-warning mx-3'
                    onClick={() => handleEditUser(item)}
                  >Edit
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDeleteUser(item)}
                  >Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}

        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='paeg-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
      />

      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={() => setIsShowModalAddNew(false)}
        handleUpdateTable={handleUpdateTable}
      />
      <ModelEditUser
        show={isShowModalEditUser}
        handleClose={() => setIsShowModalEditUser(false)}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalDelete
        show={isShowModalDeleteUser}
        handleClose={() => setIsShowModalDeleteUser(false)}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromMoal={handleDeleteUserFromMoal}
      />
    </>)
}

export default TableUsers;
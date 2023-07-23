import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModelEditUser from './ModelEditUser';
import ModalDelete from './ModalConfirm';
import _, { debounce } from 'lodash';
import "./TableUsers.scss"
import { CSVLink } from "react-csv";
import Papa from 'papaparse';
import { toast } from 'react-toastify';


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
  const [dataExport, setDataExport] = useState([]);

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

  const handleSearch = debounce((keyword) => {
    if (keyword) {
      let cloneListUser = _.clone(listUser);
      cloneListUser = cloneListUser.filter(item => item.email.includes(keyword));
      setListUser(cloneListUser);
    } else {
      getUsers(1);
    }
  }, 500);

  const getUsersExport = (event, done) => {
    let result = [];
    if (listUser && listUser.length > 0) {
      result.push(["Id", "Email", "First name", "Last name"]);
      listUser.forEach((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      })
      setDataExport(result);
      done();
    }
  }

  const handleImport = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept csv file...");
        return;
      }
      Papa.parse(file, {
        // header: true,
        complete: function(results) {
          let rawCSV = results.data;
          if(rawCSV.length > 0){
            if(rawCSV[0] && rawCSV[0].length === 3){
              if(rawCSV[0][0] !== "email" || rawCSV[0][1] !== "first_name" || rawCSV[0][2] !== "last_name"){
                toast.error("Wrong format Header CSV file");
              }else{
                let result = [];
                rawCSV.forEach((item,index) => {
                  if(index > 0 && item.length === 3){
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                })
                setListUser(result);
                toast.success("Import users succeed!");
              }
            }else{
              toast.error("Wrong format CSV file");
            }
          }else{
            toast.error("Not found data on CSV file");
          }
        }
      });
    }

  }

  return (
    <>
      <div className='my-3 add-new'>
        <span><b>List users</b></span>
        <div className="group-btns">
          <label className='btn btn-warning' htmlFor="import">
            <i className="fa-solid fa-file-import"></i> Import
          </label>
          <input type="file" id='import' hidden
            onChange={(event) => handleImport(event)} />
          <CSVLink
            data={dataExport}
            filename={"users.csv"}
            className="btn btn-primary"
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-file-arrow-down"></i> Export
          </CSVLink>
          <button
            className='btn btn-success'
            onClick={() => setIsShowModalAddNew(true)}
          >
            <i className="fa-solid fa-circle-plus"></i> Add new user
          </button>
        </div>
      </div>
      <input
        type="text"
        className='col-4 mb-3'
        placeholder='Search user by email'
        onChange={(e) => handleSearch(e.target.value)}
      />
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
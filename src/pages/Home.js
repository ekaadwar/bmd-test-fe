import React from "react";
import qs from "query-string";
import { connect } from "react-redux";
import {
  ButtonAction,
  ButtonActionImportant as ButtonImportant,
  ButtonActionWarning as ButtonWarning,
  ButtonPrimary,
} from "../components/Button";
import { Container } from "../components/Container";
import { TitleModal, TitlePage } from "../components/Title";
import { authLogout } from "../redux/actions/auth";
import { FiEdit2 as Edit } from "react-icons/fi";
import {
  BiCaretLeft as Back,
  BiCaretRight as Forward,
  BiSearchAlt as Search,
} from "react-icons/bi";
import { kelas } from "../dummies";

import { MdDeleteOutline as Delete } from "react-icons/md";
import {
  FirstHeader,
  Footer,
  Header,
  LastHeader,
  TableData,
} from "../components/Table";
import Modal from "../components/Modal";
import { InputModal } from "../components/Input";
import { getData, deleteKelas } from "../redux/actions/kelas";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addModal: false,
      data: [],
      pageInfo: {},
      nextPage: `${URL}/items?page=2`,
      prevPage: null,
      token: "",
      params: {},
      deleteModal: false,
      deleteData: {},
    };
  }

  componentDidMount() {
    const { token } = this.props.auth;
    let params = {};
    if (this.props.location.search) {
      params = this.parseQuery(this.props.location.search);
    }
    this.getData(token, "", params);
  }

  componentDidUpdate(prevProps) {
    const { token } = this.props.auth;
    const { params } = this.state;

    if (prevProps.location.search !== this.props.location.search) {
      this.props.getData(token, "", params).then(() => {
        this.setState({
          items: this.props.data.data,
          pageInfo: this.props.data.pageInfo,
          params,
        });
      });
    }
  }

  getData = (token, page, params) => {
    this.props.getData(token, page, params).then(() => {
      this.setState({
        data: this.props.kelas.data,
        pageInfo: this.props.kelas.pageInfo,
        token: this.props.auth.token,
      });
    });
  };

  parseQuery = (str) => {
    return qs.parse(str.slice("1"));
  };

  onDelete = (id, name) => {
    this.setState((prevState) => ({
      ...prevState,
      deleteData: {
        ...prevState.deleteData,
        id,
        name,
      },
      deleteModal: true,
    }));
  };

  deleteKelas = () => {
    this.setState({ deleteModal: false });
    this.props
      .deleteKelas(this.state.deleteData.id, this.state.token)
      .then(() => {
        this.props.getData(this.state.token);
      });
  };

  getDetail = () => {
    this.props.history.push("/siswa");
  };

  render() {
    return (
      <section className="pt-20">
        <Container
          content={
            <div className="space-y-5">
              <TitlePage text="Data Kelas" />

              <div className="flex flex-row space-x-2">
                <ButtonPrimary
                  onClick={() => this.props.history.push("/add-kelas")}
                  text="Tambah Data"
                />
                <ButtonPrimary text="Copy" />
                <ButtonPrimary text="Excel" />
                <ButtonPrimary text="PDF" />
                <ButtonPrimary text="Column Visibility" />
                <div className="flex-1 flex flex-row items-center">
                  <input
                    placeholder="search"
                    className="flex flex-row items-center h-10 w-full px-2 focus:outline-none border border-blue-500 rounded-l-md text-gray-700"
                  />
                  <button className="flex flex-row items-center justify-center bg-blue-500 active:bg-blue-700 rounded-r-md h-10 px-3">
                    <Search color="white" size={20} />
                  </button>
                </div>
              </div>
            </div>
          }
        />

        <div className="overflow-x-auto mt-5">
          <table className="table-data mx-auto text-xs">
            <thead>
              <tr className="text-sm">
                <FirstHeader text="No" />
                <Header text="Nama Kelas" />
                <Header text="Jumlah Siswa" />
                <Header text="Tahun Ajaran" />
                <LastHeader text="Status" />
                <th />
              </tr>
            </thead>
            {this.props.kelas.data.map((row, idx) => (
              <tbody key={idx} className="text-xs text-gray-700">
                <tr>
                  {Object.values(row).map((item, id) => (
                    <TableData
                      key={id}
                      column={Object.keys(row)[id]}
                      isEven={idx % 2 === 0 && true}
                      text={
                        Object.keys(row)[id] === "id"
                          ? (kelas.pageInfo.currentPage - 1) * 20 + (idx + 1)
                          : item
                      }
                    />
                  ))}
                  <td>
                    <div className="flex flex-row w-full space-x-2 px-2 items-center justify-center">
                      <ButtonAction
                        // onClick={() => this.onDelete(row.id, row.nama)}
                        content={<Edit size={16} />}
                      />
                      <ButtonImportant
                        value={row.id}
                        content={<Search size={16} />}
                        onClick={this.getDetail}
                      />
                      <ButtonWarning
                        onClick={() => this.onDelete(row.id, row.nama)}
                        content={<Delete size={20} />}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
            <tbody>
              <tr>
                <Footer colspan={5} />
              </tr>
            </tbody>
          </table>
        </div>

        <Container
          content={
            <div className="flex flex-row items-center justify-center py-4">
              <button className={"text-gray-800 cursor-default"}>
                <Back size={24} />
              </button>
              <p>1</p>
              <button className={"text-blue-900 cursor-pointer"}>
                <Forward size={24} />
              </button>
            </div>
          }
        />

        {this.state.addModal && (
          <Modal
            setOpenModal={() => this.setState({ addModal: false })}
            content={
              <div className="space-y-10">
                <TitleModal text="Tambah Data Kelas" />

                <div className="grid grid-cols-2 gap-3">
                  <InputModal label="Nama Kelas" />
                  <InputModal label="Tahun Ajaran" />
                  <InputModal label="Jenjang Kelas" />
                  <div>
                    <label className="text-sm text-gray-700">
                      Status Kelas
                    </label>
                    <div className="flex items-center space-x-3 text-sm text-gray-700 mt-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="status"
                          name="status"
                          value="aktif"
                        />
                        <label htmlFor="html">Aktif</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="inaktif"
                          name="status"
                          value="tidak aktif"
                        />
                        <label htmlFor="inaktif">Tidak Aktif</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row w-full space-x-2 items-center text-sm">
                  <ButtonImportant content={<p>Tambah</p>} />
                  <ButtonWarning content={<p>Reset</p>} />
                  <ButtonAction content={<p>Kembali</p>} />
                </div>
              </div>
            }
          />
        )}
        {this.state.deleteModal === true && (
          <Modal
            setOpenModal={() => this.setState({ deleteModal: false })}
            content={
              <div>
                <p className="align-center pb-5">
                  Apakah Anda yakin ingin menghapus data{" "}
                  {this.state.deleteData.name} ?
                </p>
                <div className="flex justify-end space-x-2">
                  <ButtonWarning
                    onClick={() => this.setState({ deleteModal: false })}
                    content={"Batal"}
                  />
                  <ButtonAction onClick={this.deleteKelas} content={"Ya"} />
                </div>
              </div>
            }
          />
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  kelas: state.kelas,
});

const mapDispatchToProps = { authLogout, getData, deleteKelas };

export default connect(mapStateToProps, mapDispatchToProps)(Home);

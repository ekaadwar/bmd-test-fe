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
import { TitlePage } from "../components/Title";
import { authLogout } from "../redux/actions/auth";
import { FiEdit2 as Edit } from "react-icons/fi";

import { MdDeleteOutline as Delete } from "react-icons/md";
import {
  FirstHeader,
  Footer,
  Header,
  LastHeader,
  TableData,
} from "../components/Table";
import {
  BiCaretLeft as Back,
  BiCaretRight as Forward,
  BiSearchAlt as Search,
} from "react-icons/bi";
import Modal from "../components/Modal";
import { getSiswa, deleteSiswa } from "../redux/actions/siswa";

class Siswa extends React.Component {
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
      this.props.getSiswa(token, "", params).then(() => {
        this.setState({
          items: this.props.siswa.data,
          pageInfo: this.props.siswa.pageInfo,
          params,
        });
      });
    }
  }

  getData = (token, page, params) => {
    this.props.getSiswa(token, page, params).then(() => {
      this.setState({
        data: this.props.siswa.data,
        pageInfo: this.props.siswa.pageInfo,
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
      .deleteSiswa(this.state.deleteData.id, this.state.token)
      .then(() => {
        this.props.getSiswa(this.state.token);
      });
  };

  render() {
    return (
      <section className="pt-20">
        <Container
          content={
            <div className="space-y-5">
              <TitlePage text="Data Siswa Kelas XX" />

              <div className="flex flex-row space-x-2">
                <ButtonPrimary
                  onClick={() => this.setState({ addModal: true })}
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
                <FirstHeader text="NIS" />
                <Header text="Nama Siswa" />
                <Header text="Kelas" />
                <Header text="Jenis Kelamin" />
                <Header text="Nama Ayah" />
                <Header text="Nama Ibu" />
                <LastHeader text="Alamat" />
                <th />
              </tr>
            </thead>
            {this.props.siswa.data.map((row, idx) => (
              <tbody key={idx} className="text-xs text-gray-700">
                <tr>
                  {Object.values(row).map(
                    (item, id) =>
                      Object.keys(row)[id] !== "id" && (
                        <TableData
                          key={id}
                          column={Object.keys(row)[id]}
                          isEven={idx % 2 === 0 && true}
                          text={item}
                        />
                      )
                  )}
                  <td>
                    <div className="flex flex-row w-full space-x-2 px-2 items-center justify-center">
                      <ButtonAction content={<Edit size={16} />} />
                      <ButtonImportant
                        value={row.id}
                        content={<Search size={16} />}
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
                <Footer colspan={7} />
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
  siswa: state.siswa,
});

const mapDispatchToProps = { authLogout, getSiswa, deleteSiswa };

export default connect(mapStateToProps, mapDispatchToProps)(Siswa);

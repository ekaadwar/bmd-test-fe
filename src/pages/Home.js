import React from "react";
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

class Home extends React.Component {
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
                <ButtonPrimary text="Tambah Data" />
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
            {kelas.data.map((row, idx) => (
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
                        onClick={() => this.onDelete(row.id, row.nama)}
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
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { authLogout };

export default connect(mapStateToProps, mapDispatchToProps)(Home);

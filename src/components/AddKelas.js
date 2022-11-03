import React from "react";
import { connect } from "react-redux";
import {
  ButtonAction,
  ButtonActionImportant as ButtonImportant,
  ButtonActionWarning as ButtonWarning,
} from "../components/Button";
import { Container } from "../components/Container";
import { TitleModal, TitlePage } from "../components/Title";
import { InputModal } from "../components/Input";
import { ErrAlert } from "../components/Alert";
import { addKelas } from "../redux/actions/kelas";

class AddKelas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: "",
      jenjangKelas: "",
      tahunAjaran: "",
      status: "",
      errAlert: "",
    };
  }
  submit = () => {
    const token = this.props.auth.token;
    const history = this.props.history;
    if (
      this.state.nama &&
      this.state.jenjangKelas &&
      this.state.tahunAjaran &&
      this.state.status
    ) {
      this.props.addKelas(this.state, token, history);
    } else {
      console.log(this.state);
      this.setState({ errAlert: "Kolon isian tidak boleh kosong" });
    }
  };
  render() {
    return (
      <section className="pt-20">
        <Container
          content={
            <div className="space-y-5">
              <TitlePage text="Data Kelas" />

              <div className="space-y-10">
                <TitleModal text="Tambah Data Kelas" />

                <div className="grid grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    {this.state.errAlert && (
                      <ErrAlert
                        text={this.state.errAlert}
                        onClick={this.closeAlert}
                      />
                    )}
                  </div>
                  <InputModal
                    label="Nama Kelas"
                    value={this.state.nama}
                    onChange={(e) => this.setState({ nama: e.target.value })}
                  />
                  <InputModal
                    label="Tahun Ajaran"
                    value={this.state.tahunAjaran}
                    onChange={(e) =>
                      this.setState({ tahunAjaran: e.target.value })
                    }
                  />
                  {/* <InputModal
                    label="Jenjang Kelas"
                    value={this.state.jenjangKelas}
                    onChange={(e) =>
                      this.setState({ jenjangKelas: e.target.value })
                    }
                  /> */}

                  <div>
                    <p className="text-gray-700">Jenjang Kelas</p>
                    <select
                      className="block bg-white pt-2 focus:outline-none w-full"
                      onChange={(event) =>
                        this.setState({ jenjangKelas: event.target.value })
                      }
                    >
                      <option className="text-black" value="">
                        Pilih
                      </option>
                      {[...Array(12)].map((item, id) => (
                        <option key={id} className="text-black" value={id + 1}>
                          {id + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-700">
                      Status Kelas
                    </label>
                    <div className="flex items-center space-x-3 text-sm text-gray-700 mt-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="aktif"
                          name="status"
                          value="aktif"
                          onChange={(e) =>
                            this.setState({ status: e.currentTarget.value })
                          }
                        />
                        <label htmlFor="aktif">Aktif</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="inaktif"
                          name="status"
                          value="tidak aktif"
                          onChange={(e) =>
                            this.setState({ status: e.currentTarget.value })
                          }
                        />
                        <label htmlFor="inaktif">Tidak Aktif</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row w-full space-x-2 items-center text-sm">
                  <ButtonImportant
                    content={<p>Tambah</p>}
                    onClick={this.submit}
                  />
                  <ButtonWarning
                    onClick={() =>
                      this.setState({
                        nama: "",
                        jenjangKelas: "",
                        tahunAjaran: "",
                        status: "",
                      })
                    }
                    content={<p>Reset</p>}
                  />
                  <ButtonAction content={<p>Kembali</p>} />
                </div>
              </div>
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

const mapDispatchToProps = {
  addKelas,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddKelas);

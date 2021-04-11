import React from "react";
import Bg from "../../assets/InsuranceDetail.png";
import FormBg from "../../assets/SignupForm.png";
import LastBg from "../../assets/ContractConcluded.png";
import WalletObject from "../../wallet/wallet";
export default class InsuranceDetail extends React.Component<
  {},
  {
    isHidden: boolean;
    isHidden2: boolean;
    confirmationCode: string;
    insurantName: string;
    dueDate: string;
    walletAccount: string;
  }
> {
  constructor(props: any) {
    console.log(WalletObject);
    super(props);
    this.state = {
      isHidden: true,
      isHidden2: true,
      confirmationCode: "",
      insurantName: "",
      dueDate: "",
      walletAccount: "",
    };
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }
  toggleHidden2() {
    this.setState({
      isHidden2: !this.state.isHidden2,
    });
  }
  handleCodeChange(event: any) {
    this.setState({ confirmationCode: event.target.value });
  }
  handleNameChange(event: any) {
    this.setState({ insurantName: event.target.value });
  }
  handleDateChange(event: any) {
    this.setState({ dueDate: event.target.value });
  }
  async signUp() {
    let insurance = await WalletObject.purchaseInsurance();
    console.log(insurance);
    await this.toggleHidden2();
  }
  quit() {
    document.location.href = "/insuranceList";
  }
  render() {
    return (
      <>
        <img
          src={Bg}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "1920px",
            height: "4042px",
          }}
          alt="Background"
        />
        <div
          className="Button"
          style={{ position: "absolute", left: "878px", top: "363px" }}
          onClick={this.toggleHidden.bind(this)}
        >
          SIGN UP
        </div>
        {!this.state.isHidden && (
          <>
            <img
              src={FormBg}
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "1920px",
                height: "1031px",
              }}
              alt="Background"
            />
            <input
              style={{
                position: "absolute",
                top: "343px",
                left: "827px",
                width: "277px",
                height: "23px",
              }}
              type="text"
              value={this.state.confirmationCode}
              onChange={this.handleCodeChange}
            />
            <input
              style={{
                position: "absolute",
                top: "414px",
                left: "827px",
                width: "277px",
                height: "23px",
              }}
              type="text"
              value={this.state.insurantName}
              onChange={this.handleNameChange}
            />
            <input
              style={{
                position: "absolute",
                top: "485px",
                left: "827px",
                width: "277px",
                height: "23px",
              }}
              type="text"
              value={this.state.dueDate}
              onChange={this.handleDateChange}
            />
            <div
              onClick={this.signUp.bind(this)}
              className="Button"
              style={{
                position: "absolute",
                left: "884px",
                top: "597px",
              }}
            >
              SUBMIT
            </div>
          </>
        )}
        {!this.state.isHidden2 && (
          <>
            <img
              src={LastBg}
              style={{
                position: "absolute",
                top: "135px",
                left: "725px",
                width: "481px",
                height: "547px",
              }}
              alt="Background"
            />
            <div
              onClick={this.quit.bind(this)}
              className="Button"
              style={{
                position: "absolute",
                left: "884px",
                top: "597px",
              }}
            >
              EXIT
            </div>
          </>
        )}
      </>
    );
  }
}

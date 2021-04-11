import React from "react";
import Bg from "../../assets/InsuranceDetail.png";
import FormBg from "../../assets/SignupForm.png";
import WalletObject from "../../wallet/wallet";
export default class InsuranceDetail extends React.Component<
  {},
  {
    isHidden: boolean;
    confirmationCode: string;
    insurantName: string;
    dueDate: string;
  }
> {
  constructor(props: any) {
    console.log(WalletObject);
    super(props);
    this.state = {
      isHidden: true,
      confirmationCode: "",
      insurantName: "",
      dueDate: "",
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
  handleCodeChange(event: any) {
    this.setState({ confirmationCode: event.target.value });
  }
  handleNameChange(event: any) {
    this.setState({ insurantName: event.target.value });
  }
  handleDateChange(event: any) {
    this.setState({ dueDate: event.target.value });
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
        )}
        <input
          type="text"
          value={this.state.confirmationCode}
          onChange={this.handleCodeChange}
        />
      </>
    );
  }
}

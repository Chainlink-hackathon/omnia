import React from "react";
import Bg from "../../assets/Insurance_List.png";
import Accommodation from "../../assets/AccommodationInsurance.png";
interface State {}

export default class InsuranceList extends React.Component<State> {
  next() {
    document.location.href = "/insuranceDetail";
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
            height: "2248px",
          }}
          alt="Background"
        />
        <img
          src={Accommodation}
          style={{
            position: "absolute",
            top: "531.13px",
            left: "546px",
            width: "275.98px",
            height: "219.65px",
            cursor: "pointer",
          }}
          alt="Accommodation"
          onClick={this.next.bind(this)}
        />
        <div
          className="Button"
          style={{
            position: "absolute",
            left: "878px",
            top: "1309px",
          }}
        >
          SUGGEST
        </div>
      </>
    );
  }
}

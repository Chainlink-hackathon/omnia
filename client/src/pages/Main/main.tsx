import React from "react";
import MainBackground from "../../assets/Main_Background.png";
import WatchVideo from "../../assets/WatchVideo.png";
import "../../styles.scss";
interface State{
}

export default class Main extends React.Component<State> {
  externalLink() {
    document.location.href = "/about-project";
  }
  next() {
    document.location.href = "/insuranceList";
  }
  render() {
    
    return (
      <>
        <img
          src={MainBackground}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "1920px",
            height: "4820px",
          }}
          alt="Background"
        />
        <img
          src={WatchVideo}
          style={{
            position: "absolute",
            top: "271px",
            left: "960px",
            width: "200px",
            height: "42px",
          }}
          alt="WatchVideo"
          onClick={this.externalLink.bind(this)}
        />
        <div
          className="Button"
          style={{ position: "absolute", left: "752px", top: "271px" }}
          onClick={this.next.bind(this)}
        >
          START
        </div>
      </>
    );
  }
}

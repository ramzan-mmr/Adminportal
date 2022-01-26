import "./Main.css";
import hello from "../../assets/hello.svg";
import Chart from "../charts/Chart";
import axios from "axios";
import { useEffect, useState } from "react";
import { AsyncStorage } from 'AsyncStorage';
import { Card, CardGroup, Row, Col } from 'react-bootstrap'

const Main = () => {
  const [data, setData] = useState("")
  const [hospitaldata, sethospitaldata] = useState("")
  const dataLength = data.length
  const hospitallength = hospitaldata.length
  const [Role, setRole] = useState("")

  const getOrganData = (() => {
    const url = 'https://mydonatmeapi.herokuapp.com/organ';
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== 'SUCCESS') {
          console.log(status)
        } else {
          setData(data)
        }
        // setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  });
  const getHospitalData = (() => {
    const url = 'https://mydonatmeapi.herokuapp.com/hospital';
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== 'SUCCESS') {
          console.log(status)
        } else {
          sethospitaldata(data)
        }
        // setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  });
  useEffect(() => {
    getOrganData()
    getHospitalData()
  }, [])
  useEffect(() => {
    AsyncStorage.getItem('Role', (err, result) => {
      setRole(result)
    })
  })
  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}

        <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Donate Me App</h1>
            <p>Welcome to your {Role === "Admin" ? "Admin" : "Hospital"} Portal</p>
          </div>
        </div>

        {/* <!-- MAIN TITLE ENDS HERE --> */}

        {/* <!-- MAIN CARDS STARTS HERE --> */}
        {(Role==="Admin")&&(
          <div className="main__cards"style={{gridTemplateColumns:"1fr 1fr 1fr 1fr"}}>
          <div className="card">
            <i
              className="fa fa-user-o fa-2x text-lightblue"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number Of Donar's</p>
              <span className="font-bold text-title">{dataLength}</span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-calendar fa-2x text-red" aria-hidden="true"></i>
            <div className="card_inner">
              <p className="text-primary-p">Number Of Organ's</p>
              <span className="font-bold text-title">{dataLength}</span>
            </div>
          </div>

          <div className="card">
            <i
              className="fa fa-video-camera fa-2x text-yellow"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number Of Hospital's</p>
              <span className="font-bold text-title">{hospitallength}</span>
            </div>
          </div>

          <div className="card">
            <i
              className="fa fa-thumbs-up fa-2x text-green"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Report's</p>
              <span className="font-bold text-title">645</span>
            </div>
          </div>
        </div>
        )}
        {(Role==="Hospital")&&(
          <div className="main__cards" style={{gridTemplateColumns:"1fr 1fr 1fr"}}>
          <div className="card">
            <i
              className="fa fa-user-o fa-2x text-lightblue"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number Of Donar's</p>
              <span className="font-bold text-title">{dataLength}</span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-calendar fa-2x text-red" aria-hidden="true"></i>
            <div className="card_inner">
              <p className="text-primary-p">Number Of Organ's</p>
              <span className="font-bold text-title">{dataLength}</span>
            </div>
          </div>
          <div className="card">
            <i
              className="fa fa-thumbs-up fa-2x text-green"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Report's</p>
              <span className="font-bold text-title">645</span>
            </div>
          </div>
        </div>
        )}
      
        {/* <!-- MAIN CARDS ENDS HERE --> */}

        {/* <!-- CHARTS STARTS HERE --> */}
        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Daily Reports</h1>
                <p>Pakistan</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>
            <Chart />
          </div>

          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Stats Reports</h1>
                <p>Pakistan</p>
              </div>
              <i className="fa fa-heart" aria-hidden="true"></i>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <h1>Organ</h1>
                <p>{dataLength}</p>
              </div>

              <div className="card2">
                <h1>Hospital's</h1>
                <p>{hospitallength}</p>
              </div>

              <div className="card3">
                <h1>Donar's</h1>
                <p>{dataLength}</p>
              </div>

              <div className="card4">
                <h1>Report's</h1>
                <p>18</p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- CHARTS ENDS HERE --> */}
      </div>
    </main>
  );
};

export default Main;

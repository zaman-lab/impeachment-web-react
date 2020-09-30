import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Sidebar from '../layouts/Sidebar';
import WelcomeAlert from "../alerts/WelcomeAlert"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import Spinner from 'react-bootstrap/Spinner';
import { orderBy } from 'lodash';

//dotenv.config()



var API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"


class DasbhoardOne extends React.Component {
  constructor(props) {
    super(props)
    this.state = { metric: "retweet_count", parsedResponse: null }; // metric should be "retweet_count" or "retweeter_count" (see API docs). keep track of what it is so we can chart appropriately. use can update via a dropdown if desired
    this.fetchData = this.fetchData.bind(this);
  }

  render() {
    var spinIntoCharts;
    if (this.state.parsedResponse) {
      console.log("Raw data");
      var rawdata = this.state.parsedResponse;
      console.log(typeof (rawdata));

      var users = this.state.parsedResponse;

      var metric = this.state.metric


      var community0 = orderBy(users.filter(function (u) { return u["community_id"] === 0 }), metric, "desc")
      console.table("community0", community0);
      var community1 = orderBy(users.filter(function (u) { return u["community_id"] === 1 }), metric, "desc")
      console.table("community1", community1);

      var x0 = community0.map(function (u) { return u[metric] })
      console.log("x0", x0);
      var x1 = community1.map(function (u) { return u[metric] })
      console.log("x1", x0);
     

      spinIntoCharts =
        <Container fluid>
          <h3 className='m-5'>Users Most Retweeted by Community </h3>
          <Row>
            <Col>
              <Card>
                <BarChart
                  width={650}
                  height={500}
                  data={community0}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <XAxis type="number" dataKey="retweet_count" />
                  <YAxis type="category" dataKey="retweeted_user_screen_name" />
                  <CartesianGrid strokeDasharray="1 1" />
                  <Tooltip />
                  <Legend />
                <Bar dataKey="retweet_count" fill="#3C3B6E" />

                </BarChart>
                <Card.Body>
                  <Card.Text>
                    Users Most Retweeted by Community 0
                    </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <BarChart
                  width={650}
                  height={500}
                  data={community1}
                  layout="vertical"
                   margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <XAxis type="number" dataKey="retweet_count" />
                  <YAxis type="category" dataKey="retweeted_user_screen_name" />
                  <CartesianGrid strokeDasharray="1 1" />
                  <Tooltip />
                  <Legend />
                <Bar dataKey="retweet_count" fill="#B22234" />

                </BarChart>

                <Card.Body>
                  <Card.Text>
                    Users Most Retweeted by Community 1
                    </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>



    } else {
      spinIntoCharts = <Container fluid className="mt-70">
        <Spinner className="my-auto" animation="grow" />
      </Container>
       
    };

    return (
      <Container fluid className="no-padding">
        <Row>
          <Col sm={2}>

            <Sidebar />

          </Col>
          <Col sm={10}>

            <Container fluid className="mt-70">
              <WelcomeAlert />
              <h3 className="herotitle">Dashboard One</h3>


              {spinIntoCharts}


            </Container>

          </Col>
        </Row>

      </Container>
    );
  }

  componentDidMount() {
    // https://reactjs.org/docs/react-component.html#componentdidmount
    // invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    console.log("DASHBOARD DID MOUNT")
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    // https://reactjs.org/docs/react-component.html#componentdidupdate
    // invoked immediately after updating occurs. This method is not called for the initial render

    // Typical usage (don't forget to compare props):
    //if (this.props.userID !== prevProps.userID) {
    //  this.fetchData(this.props.userID);
    //}

    console.log("DASHBOARD DID UPDATE")
  }

  fetchData() {
    var requestUrl = `${API_URL}/api/v0/users_most_retweeted?limit=10&metric=${this.state.metric}`
    console.log("REQUEST URL:", requestUrl)
    fetch(requestUrl)
      .then(function (response) {
        //console.log("RAW RESPONSE", "STATUS", response.status, response.statusText, response.ok, "HEADERS", response.headers, response.url)
        return response.json()
      })
      .then(function (json) {
        console.log("FETCHED", json.length, "ITEMS")
        this.setState({ parsedResponse: json })
      }.bind(this))
      .catch(function (err) {
        console.error("FETCH ERR", err)
      })
  }

}



export default DasbhoardOne;

import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom'

export default function welcome() {
  return (
    <div className="bg-lite" style={{ height: "300vh" }}>
      <Card className="text-center text-white bg-dark mx-auto mt-5" style={{width:'20rem'}}>
      <Card.Title>Welcome to yoloxide web</Card.Title>
      <Card.Subtitle>A Cylon sponsored project.</Card.Subtitle>
      <Card.Text>To get started make your first  <Link to="/networks"><i>Device </i></Link>.
      <p class="text-danger">Note that there is currently no backend so nothing will save when you reload the page!</p>
      </Card.Text>
      <Card.Footer>
        The react app is being maintained at <a href="https://github.com/levmckinney/yoloxide-web.git"> yoloxide-web </a>.
      </Card.Footer>
      <Card.Footer>
        The yoloxide interpreter is at <a href="https://github.com/Jerald/yoloxide"> yoloxide </a>.
      </Card.Footer>
      </Card>
    </div>
  );
}

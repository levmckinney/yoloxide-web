import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom'

export default function welcome() {
  return (
    <div className="bg-lite" style={{ height: "300vh" }}>
      <Card className="text-center text-white bg-dark mx-auto mt-5" style={{width:'20rem'}}>
      <Card.Title>Welcome to yoloxide web</Card.Title>
      <Card.Subtitle>A cylon sponsored project.</Card.Subtitle>
      <Card.Text>To get started make your first  <Link to="/networks"><i>Device </i></Link>.
      </Card.Text>
      <Card.Footer>
        The react app is being maintained at <a href="https://github.com/levmckinney/yoloxide-web.git"> yoloxide-web </a>.
      </Card.Footer>
      <Card.Footer>
        The yoloxide interrupter is at <a href="https://github.com/Jerald/yoloxide"> yoloxide </a>.
      </Card.Footer>
      </Card>
    </div>
  );
}

import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom'

export default function welcome() {
  return (
    <div className="bg-lite" style={{ height: "200vh" }}>
      <Card className="text-center text-white bg-dark mx-auto mt-5" style={{width:'20rem'}}>
      <Card.Title>Welcome to yoloxide web</Card.Title>
      <Card.Subtitle>Created by CYLON</Card.Subtitle>
      <Card.Text>To get started make your first  <Link to="/networks"><i>Device </i></Link></Card.Text>
      </Card>
    </div>
  );
}

import React from "react";
import Card from "react-bootstrap/Card";

export default function welcome() {
  return (
    <div className="bg-lite" style={{ height: "100vh" }}>
      <Card className="text-center text-white bg-dark mx-auto mt-5" style={{width:'20rem'}}>
      <Card.Title>Welcome to yolol-ide</Card.Title>
      <Card.Subtitle>Created by CYLON</Card.Subtitle>
      </Card>
    </div>
  );
}

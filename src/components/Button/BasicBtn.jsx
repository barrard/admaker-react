import React from "react";
import { Button } from "@/components/ui/button";

export default function BasicBtn(props) {
  const { text, onClick } = props;
  return (
    <Button onClick={onClick} variant="outline">
      {text}
    </Button>
  );
}

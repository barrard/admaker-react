import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import EditWordModal from "./EditWordModal";

export default function MyBadge(props) {
    const { iSeg, iWord, word, audioFile } = props;

    return (
        <Badge className="cursor-pointer  hover:bg-blue-500 transition-all duration-200 hover:shadow-md hover:scale-105 hover:text-white" variant="outline">
            <EditWordModal iSeg={iSeg} iWord={iWord} word={word} audioFile={audioFile}></EditWordModal>
        </Badge>
    );
}

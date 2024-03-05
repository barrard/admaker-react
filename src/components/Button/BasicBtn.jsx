import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function BasicBtn(props) {
    const { text, onClick, title, style = {}, className = "", disable = false } = props;
    const MyButton = (
        <Button disabled={disable} className={className} style={style} onClick={onClick} variant="outline">
            {text}
        </Button>
    );

    if (title) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>{MyButton}</TooltipTrigger>
                    <TooltipContent>
                        <p>{title}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }
    return MyButton;
}

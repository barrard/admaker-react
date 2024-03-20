import React, { useState, useContext, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Ban } from "lucide-react";
import CanvasContext from "../Context/CanvasContext";

import { BasicBtn } from "../Button";

export default function EditWordModal(props) {
    const { word, audioFile, iSeg, iWord, open, setOpen } = props;
    const { setYOUR_AUDIO_FILES, YOUR_AUDIO_FILES } = useContext(CanvasContext);

    const [currentWord, setCurrentWord] = useState(word); // Initial word
    const [newWord, setNewWord] = useState(word);

    const saveBtnRef = useRef();

    function handleSaveNewWord() {
        setCurrentWord(newWord);
        //find the item in the array
        const audioIndex = YOUR_AUDIO_FILES.findIndex((af) => af.savedFileName === audioFile.savedFileName);
        const editedAudio = YOUR_AUDIO_FILES[audioIndex];

        //edit in place
        editedAudio.audioJson.segments[iSeg].words[iWord].word = newWord;
        //add back to the array
        YOUR_AUDIO_FILES[audioIndex] = editedAudio;
        //save as new array
        setYOUR_AUDIO_FILES([...YOUR_AUDIO_FILES]);
        setOpen(false);
    }

    function handleChange(e) {
        setNewWord(e.target.value);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            setOpen(false);
            handleSaveNewWord();
        }
    }

    return (
        <Dialog open={open}>
            <DialogTrigger onClick={() => setOpen((o) => !o)}>{word}</DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Editing word "{word}"</DialogTitle>
                    <DialogDescription>Hint: Don't change the word too much</DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="newWord" className="sr-only">
                            New Word
                        </Label>
                        <Input id="newWord" type="text" placeholder="Edit Word" value={newWord} onKeyDown={handleKeyDown} onChange={handleChange} />
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose onClick={handleSaveNewWord} ref={saveBtnRef}>
                        <BasicBtn text={<Check className="text-green-500" size={18} />} title="Save" />
                    </DialogClose>
                    <DialogClose>
                        <BasicBtn onClick={() => setOpen(false)} text={<Ban className="text-red-500" size={18} />} title="Cancel" />
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

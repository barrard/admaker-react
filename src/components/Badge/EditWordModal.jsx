import React, { useState, useContext } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Ban } from "lucide-react";
import CanvasContext from "../Context/CanvasContext";

import { BasicBtn } from "../Button";

export default function EditWordModal(props) {
    const { word, audioFile, iSeg, iWord } = props;
    const { setYOUR_AUDIO_FILES, YOUR_AUDIO_FILES } = useContext(CanvasContext);

    const [currentWord, setCurrentWord] = useState(word); // Initial word
    const [newWord, setNewWord] = useState(word);

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
    }

    return (
        <Dialog>
            <DialogTrigger>{word}</DialogTrigger>

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
                        <Input id="newWord" type="text" placeholder="Edit Word" value={newWord} onChange={(e) => setNewWord(e.target.value)} />
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose>
                        <BasicBtn onClick={handleSaveNewWord} text={<Check className="text-green-500" size={18} />} title="Save" />
                    </DialogClose>
                    <DialogClose>
                        <BasicBtn text={<Ban className="text-red-500" size={18} />} title="Cancel" />
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

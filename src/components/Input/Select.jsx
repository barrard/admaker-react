import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import React from "react";

export default function MySelect(props) {
    const { values, label, setValue, value } = props;

    return (
        <div className="form-group">
            <label className="text-gray-900 font-bold text-base mb-2" htmlFor="y-axis">
                {label}:
            </label>
            <Select onValueChange={setValue} value={value}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(values).map((v) => (
                        <SelectItem key={v} value={v}>
                            {values[v]}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

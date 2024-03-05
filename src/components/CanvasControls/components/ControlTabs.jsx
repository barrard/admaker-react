import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ControlTabs({ tabs = [], contents = [], setTab, tab }) {
    const onTabChange = (value) => {
        setTab(value);
    };

    return (
        <Tabs value={tab} onValueChange={onTabChange} defaultValue={tab} className="w-[400px] border border-green-500">
            <TabsList>
                {tabs.map((tab, i) => {
                    const { name, value } = tab;

                    return (
                        <TabsTrigger key={i} value={name}>
                            {value}
                        </TabsTrigger>
                    );
                })}
            </TabsList>

            {contents.map((content, i) => {
                const { name, value } = content;

                return (
                    <TabsContent key={i} value={name}>
                        {value}
                    </TabsContent>
                );
            })}
        </Tabs>
    );
}

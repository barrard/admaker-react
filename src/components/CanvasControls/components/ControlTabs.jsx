import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ControlTabs({ tabs = [], contents = [], setTab, tab }) {
    const onTabChange = (value) => {
        setTab(value);
    };

    return (
        <Tabs value={tab} onValueChange={onTabChange} defaultValue={tab} className="w-[400px] border border-green-500">
            <TabsList>
                {tabs.map((tab) => {
                    const { name, value } = tab;

                    return <TabsTrigger value={name}>{value}</TabsTrigger>;
                })}
            </TabsList>

            {contents.map((content) => {
                const { name, value } = content;

                return <TabsContent value={name}>{value}</TabsContent>;
            })}
        </Tabs>
    );
}

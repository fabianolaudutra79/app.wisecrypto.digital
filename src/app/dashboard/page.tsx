"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const DashboardPage = () => {
  const [agents, setAgents] = useState([
    { id: 1, name: 'Agent 1', status: 'Active' },
    { id: 2, name: 'Agent 2', status: 'Inactive' },
  ]);
  const [newAgentName, setNewAgentName] = useState('');
  const [n8nUrl, setN8nUrl] = useState('');

  useEffect(() => {
    // Load N8N URL from environment variable
    setN8nUrl(process.env.NEXT_PUBLIC_N8N_URL || '');
  }, []);

  const handleAddAgent = () => {
    if (newAgentName.trim() !== '') {
      const newAgent = {
        id: agents.length + 1,
        name: newAgentName,
        status: 'Active', // Default status
      };
      setAgents([...agents, newAgent]);
      setNewAgentName('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-4xl bg-card p-8 rounded-xl shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
          <h2 className="text-2xl font-bold text-primary">Integration Agents</h2>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{agent.id}</TableCell>
                  <TableCell>{agent.name}</TableCell>
                  <TableCell>{agent.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-foreground mb-2">Add New Agent</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="text"
                placeholder="Agent Name"
                value={newAgentName}
                onChange={(e) => setNewAgentName(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleAddAgent} className="bg-accent text-accent-foreground hover:bg-teal-700 transition-colors">
                Add Agent
              </Button>
            </div>
          </div>
           {n8nUrl && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">N8N Integration</h3>
              <p className="text-sm text-muted-foreground">
                Your N8N instance is running at: <a href={n8nUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{n8nUrl}</a>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;


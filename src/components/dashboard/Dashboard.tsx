
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchTab } from './SearchTab';
import { InsertTab } from './InsertTab';
import { UpdateTab } from './UpdateTab';
import { DeleteTab } from './DeleteTab';
import { LogOut, Search, Plus, Edit, Trash2, User, Stethoscope } from 'lucide-react';

interface DashboardProps {
  currentUser: string;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HealthCare Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {currentUser}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-4 w-4" />
                <span className="text-sm">{currentUser}</span>
              </div>
              <Button 
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-none border-b">
              <TabsTrigger 
                value="search" 
                className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </TabsTrigger>
              <TabsTrigger 
                value="insert"
                className="flex items-center space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                <Plus className="h-4 w-4" />
                <span>Insert</span>
              </TabsTrigger>
              <TabsTrigger 
                value="update"
                className="flex items-center space-x-2 data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
              >
                <Edit className="h-4 w-4" />
                <span>Update</span>
              </TabsTrigger>
              <TabsTrigger 
                value="delete"
                className="flex items-center space-x-2 data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="search" className="mt-0">
                <SearchTab />
              </TabsContent>
              <TabsContent value="insert" className="mt-0">
                <InsertTab />
              </TabsContent>
              <TabsContent value="update" className="mt-0">
                <UpdateTab />
              </TabsContent>
              <TabsContent value="delete" className="mt-0">
                <DeleteTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

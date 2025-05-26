
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { insertData } from '@/utils/database';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const InsertTab: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState('');
  const [attributes, setAttributes] = useState('');
  const [values, setValues] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const availableTables = ['Account', 'Appointments', 'Messages', 'HealthRecord'];

  const handleInsert = async () => {
    if (!selectedTable) {
      toast({
        title: "Table Required",
        description: "Please select a table to insert data",
        variant: "destructive",
      });
      return;
    }

    if (!availableTables.includes(selectedTable)) {
      toast({
        title: "Access Denied",
        description: "Don't have access to that table.",
        variant: "destructive",
      });
      return;
    }

    if (!attributes || !values) {
      toast({
        title: "Missing Information",
        description: "Please provide both attributes and values",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const attributeList = attributes.split(',').map(attr => attr.trim());
      const valueList = values.split(',').map(val => val.trim());

      if (attributeList.length !== valueList.length) {
        toast({
          title: "Mismatch Error",
          description: "Number of attributes and values must match",
          variant: "destructive",
        });
        return;
      }

      const success = insertData(selectedTable, attributeList, valueList);
      
      if (success) {
        console.log(`Data successfully inserted into ${selectedTable}`);
        toast({
          title: "Insert Successful",
          description: `Data successfully inserted into ${selectedTable}`,
        });
        
        // Clear form
        setAttributes('');
        setValues('');
      } else {
        toast({
          title: "Insert Failed",
          description: "Failed to insert data into the table",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during insertion",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Plus className="h-6 w-6 text-green-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Insert Data</h2>
          <p className="text-gray-600">Add new records to the healthcare database</p>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <p className="text-sm text-green-800">
          <strong>Available Tables:</strong> {availableTables.join(', ')}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="insert-table">Enter a table to insert data</Label>
          <Select value={selectedTable} onValueChange={setSelectedTable}>
            <SelectTrigger>
              <SelectValue placeholder="Choose table..." />
            </SelectTrigger>
            <SelectContent>
              {availableTables.map((table) => (
                <SelectItem key={table} value={table}>{table}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="attributes">Enter the name attribute/s separated by comma?</Label>
          <Input
            id="attributes"
            placeholder="e.g., name, email, phone"
            value={attributes}
            onChange={(e) => setAttributes(e.target.value)}
          />
          <p className="text-xs text-gray-500">Separate multiple attributes with commas</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="values">Enter the values separated by comma</Label>
          <Input
            id="values"
            placeholder="e.g., John Doe, john@email.com, 123-456-7890"
            value={values}
            onChange={(e) => setValues(e.target.value)}
          />
          <p className="text-xs text-gray-500">Separate multiple values with commas</p>
        </div>
      </div>

      <Button 
        onClick={handleInsert}
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700"
      >
        {isLoading ? "Inserting..." : "Insert Data"}
      </Button>
    </div>
  );
};


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateData } from '@/utils/database';
import { Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const UpdateTab: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState('');
  const [attribute, setAttribute] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const availableTables = ['Account', 'Appointments', 'Messages', 'HealthRecord'];

  const handleUpdate = async () => {
    if (!selectedTable) {
      toast({
        title: "Table Required",
        description: "Please select a table to update data",
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

    if (!attribute || !currentValue || !newValue) {
      toast({
        title: "Missing Information",
        description: "Please fill in all update fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = updateData(selectedTable, attribute, currentValue, newValue);
      
      if (success) {
        console.log(`Data successfully updated into ${selectedTable}`);
        toast({
          title: "Update Successful",
          description: `Data successfully updated in ${selectedTable}`,
        });
        
        // Clear form
        setAttribute('');
        setCurrentValue('');
        setNewValue('');
      } else {
        toast({
          title: "Update Failed",
          description: "Failed to update data in the table",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during update",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Edit className="h-6 w-6 text-yellow-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Update Data</h2>
          <p className="text-gray-600">Modify existing records in the healthcare database</p>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>Available Tables:</strong> {availableTables.join(', ')}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="update-table">Enter a table to update data</Label>
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
          <Label htmlFor="attribute">Enter the name of the attribute</Label>
          <Input
            id="attribute"
            placeholder="e.g., name, email, status"
            value={attribute}
            onChange={(e) => setAttribute(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="current-value">What is the current value?</Label>
          <Input
            id="current-value"
            placeholder="Enter current value to find the record"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="new-value">Enter the new value</Label>
          <Input
            id="new-value"
            placeholder="Enter the new value"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        </div>
      </div>

      <Button 
        onClick={handleUpdate}
        disabled={isLoading}
        className="bg-yellow-600 hover:bg-yellow-700"
      >
        {isLoading ? "Updating..." : "Update Data"}
      </Button>
    </div>
  );
};

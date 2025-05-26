
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { searchTable } from '@/utils/database';
import { Search, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SearchTab: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState('');
  const [searchAttribute, setSearchAttribute] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const availableTables = ['Account', 'Appointments', 'Messages', 'HealthRecord'];

  const handleSearch = async () => {
    if (!selectedTable || !searchAttribute || !searchValue) {
      toast({
        title: "Missing Information",
        description: "Please fill in all search fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log(`Searching ${selectedTable} for ${searchAttribute} = ${searchValue}`);
      const searchResults = searchTable(selectedTable, searchAttribute, searchValue);
      setResults(searchResults);
      
      if (searchResults.length === 0) {
        toast({
          title: "No Results",
          description: "No records found matching your search criteria",
        });
      } else {
        toast({
          title: "Search Complete",
          description: `Found ${searchResults.length} record(s)`,
        });
      }
    } catch (error) {
      toast({
        title: "Search Error",
        description: "An error occurred while searching",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderResults = () => {
    if (results.length === 0) return null;

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Results from: {selectedTable}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(result).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="text-sm font-medium text-gray-600">{key}</div>
                      <div className="text-sm text-gray-900">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Search className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Search Records</h2>
          <p className="text-gray-600">Search for specific records in the healthcare database</p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Available Tables:</strong> {availableTables.join(', ')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="table-select">Select a table to search</Label>
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
          <Label htmlFor="attribute">Search by (i.e name)?</Label>
          <Input
            id="attribute"
            placeholder="Enter attribute name"
            value={searchAttribute}
            onChange={(e) => setSearchAttribute(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="value">Enter the value</Label>
          <Input
            id="value"
            placeholder="Enter search value"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <Button 
        onClick={handleSearch}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isLoading ? "Searching..." : "Search Records"}
      </Button>

      {renderResults()}
    </div>
  );
};

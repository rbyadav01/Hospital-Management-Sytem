
// Simulate database operations using localStorage to replicate MySQL functionality

export const initializeDatabase = () => {
  console.log("Initializing HealthCareOrgDB...");
  
  // Check if tables exist (simulate checking 21 tables)
  const tables = localStorage.getItem('databaseTables');
  const tableCount = tables ? JSON.parse(tables).length : 0;
  
  if (tableCount !== 21) {
    console.log(`Missing ${21 - tableCount} tables...rebuilding`);
    
    // Initialize all 21 tables with sample data
    const initialTables = {
      Account: [
        { account_id: '1', MembershipNumber: '123', DateCreated: '2020-01-01', email: 'john@email.com', password: 'password123' },
        { account_id: '2', MembershipNumber: '456', DateCreated: '2020-02-15', email: 'sarah@email.com', password: 'mypassword' },
        { account_id: '3', MembershipNumber: '789', DateCreated: '2020-03-20', email: 'mike@email.com', password: 'securepass' }
      ],
      Appointments: [
        { appointment_id: '1', Patient: '1', Doctor: '1', Location: '123 Medical St', Date: '2024-01-15', Time: '10:00 AM' },
        { appointment_id: '2', Patient: '2', Doctor: '2', Location: '456 Health Ave', Date: '2024-01-16', Time: '2:00 PM' },
        { appointment_id: '3', Patient: '3', Doctor: '1', Location: '789 Care Blvd', Date: '2024-01-17', Time: '9:00 AM' }
      ],
      Messages: [
        { message_id: '1', Patient: '1', Doctor: '1', Subject: 'Lab Results', Message: 'Your test results are normal' },
        { message_id: '2', Patient: '2', Doctor: '2', Subject: 'Follow-up', Message: 'Please schedule a follow-up appointment' },
        { message_id: '3', Patient: '3', Doctor: '1', Subject: 'Prescription', Message: 'Your prescription is ready for pickup' }
      ],
      HealthRecord: [
        { record_id: '1', Patient: '1', PrimaryDoctorName: 'Dr. Smith', BloodType: 'A+', Allergies: 'None' },
        { record_id: '2', Patient: '2', PrimaryDoctorName: 'Dr. Johnson', BloodType: 'O-', Allergies: 'Penicillin' },
        { record_id: '3', Patient: '3', PrimaryDoctorName: 'Dr. Smith', BloodType: 'B+', Allergies: 'Peanuts' }
      ],
      Patient: [
        { user_id: '1', Name: 'John Doe', Phone: '555-0101', Address: '123 Main St', Insurance: 'BlueCross' },
        { user_id: '2', Name: 'Sarah Wilson', Phone: '555-0102', Address: '456 Oak Ave', Insurance: 'Aetna' },
        { user_id: '3', Name: 'Mike Brown', Phone: '555-0103', Address: '789 Pine Rd', Insurance: 'Cigna' }
      ],
      Doctor: [
        { doctor_id: '1', Name: 'Dr. Smith', Specialty: 'Internal Medicine', Phone: '555-0201' },
        { doctor_id: '2', Name: 'Dr. Johnson', Specialty: 'Cardiology', Phone: '555-0202' }
      ],
      Medication: [
        { medication_id: '1', HealthRecord: '1', Name: 'Aspirin', Dosage: '81mg daily' },
        { medication_id: '2', HealthRecord: '2', Name: 'Lisinopril', Dosage: '10mg daily' },
        { medication_id: '3', HealthRecord: '3', Name: 'Metformin', Dosage: '500mg twice daily' }
      ],
      MedicalCondition: [
        { condition_id: '1', HealthRecord: '1', Name: 'Hypertension', Status: 'Controlled' },
        { condition_id: '2', HealthRecord: '2', Name: 'Diabetes', Status: 'Managed' },
        { condition_id: '3', HealthRecord: '3', Name: 'High Cholesterol', Status: 'Treated' }
      ],
      TestResults: [
        { test_id: '1', HealthRecord: '1', Name: 'Blood Pressure', Comments: 'Normal range' },
        { test_id: '2', HealthRecord: '2', Name: 'Blood Sugar', Comments: 'Slightly elevated' },
        { test_id: '3', HealthRecord: '3', Name: 'Cholesterol Panel', Comments: 'Within normal limits' }
      ]
    };

    // Add remaining empty tables to reach 21 total
    const additionalTables = [
      'Insurance', 'Billing', 'Prescription', 'Lab', 'Radiology', 
      'Surgery', 'Nursing', 'Pharmacy', 'Emergency', 'Outpatient',
      'Inpatient', 'Staff'
    ];

    additionalTables.forEach(tableName => {
      initialTables[tableName] = [];
    });

    // Store tables
    Object.entries(initialTables).forEach(([tableName, data]) => {
      localStorage.setItem(tableName, JSON.stringify(data));
    });

    localStorage.setItem('databaseTables', JSON.stringify(Object.keys(initialTables)));
    localStorage.setItem('accounts', JSON.stringify(initialTables.Account));
    localStorage.setItem('transactions', JSON.stringify([]));

    console.log(`Executed ${Object.keys(initialTables).length} table creation queries`);
    console.log(`Executed ${Object.values(initialTables).reduce((acc, table) => acc + table.length, 0)} data insertion queries`);
    console.log("Executed 0 transaction queries");
  }
  
  console.log("Set up process finished");
};

export const searchTable = (tableName: string, attribute: string, value: string): any[] => {
  try {
    const tableData = JSON.parse(localStorage.getItem(tableName) || '[]');
    
    // Special handling for complex queries as per Python version
    if (tableName === 'Appointments') {
      const appointments = tableData.filter((item: any) => 
        item[attribute] && item[attribute].toString().toLowerCase().includes(value.toLowerCase())
      );
      const patients = JSON.parse(localStorage.getItem('Patient') || '[]');
      const doctors = JSON.parse(localStorage.getItem('Doctor') || '[]');
      
      return appointments.map((apt: any) => {
        const patient = patients.find((p: any) => p.user_id === apt.Patient);
        const doctor = doctors.find((d: any) => d.doctor_id === apt.Doctor);
        return {
          Patient: patient?.Name || 'Unknown',
          Doctor: doctor?.Name || 'Unknown',
          Address: apt.Location
        };
      });
    }
    
    if (tableName === 'Messages') {
      const messages = tableData.filter((item: any) => 
        item[attribute] && item[attribute].toString().toLowerCase().includes(value.toLowerCase())
      );
      const patients = JSON.parse(localStorage.getItem('Patient') || '[]');
      const doctors = JSON.parse(localStorage.getItem('Doctor') || '[]');
      
      return messages.map((msg: any) => {
        const patient = patients.find((p: any) => p.user_id === msg.Patient);
        const doctor = doctors.find((d: any) => d.doctor_id === msg.Doctor);
        return {
          Message: msg.Message,
          Subject: msg.Subject,
          Patient: patient?.Name || 'Unknown',
          Doctor: doctor?.Name || 'Unknown'
        };
      });
    }
    
    if (tableName === 'HealthRecord') {
      const records = tableData.filter((item: any) => 
        item[attribute] && item[attribute].toString().toLowerCase().includes(value.toLowerCase())
      );
      const medications = JSON.parse(localStorage.getItem('Medication') || '[]');
      const conditions = JSON.parse(localStorage.getItem('MedicalCondition') || '[]');
      const tests = JSON.parse(localStorage.getItem('TestResults') || '[]');
      
      return records.map((record: any) => {
        const medication = medications.find((m: any) => m.HealthRecord === record.record_id);
        const condition = conditions.find((c: any) => c.HealthRecord === record.record_id);
        const test = tests.find((t: any) => t.HealthRecord === record.record_id);
        
        return {
          'Primary Doctor': record.PrimaryDoctorName,
          'Medications': medication?.Name || 'None',
          'Medical Conditions': condition?.Name || 'None',
          'Tests': test?.Name || 'None',
          'Test Results': test?.Comments || 'None'
        };
      });
    }
    
    // Default search for other tables
    return tableData.filter((item: any) => 
      item[attribute] && item[attribute].toString().toLowerCase().includes(value.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching table:', error);
    return [];
  }
};

export const insertData = (tableName: string, attributes: string[], values: string[]): boolean => {
  try {
    const tableData = JSON.parse(localStorage.getItem(tableName) || '[]');
    
    const newRecord: any = {};
    attributes.forEach((attr, index) => {
      newRecord[attr] = values[index];
    });
    
    tableData.push(newRecord);
    localStorage.setItem(tableName, JSON.stringify(tableData));
    
    // Log transaction
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const query = `INSERT INTO ${tableName} (${attributes.join(', ')}) VALUES (${values.map(v => `'${v}'`).join(', ')})`;
    transactions.push({
      type: 'INSERT',
      table: tableName,
      query: query,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    return true;
  } catch (error) {
    console.error('Error inserting data:', error);
    return false;
  }
};

export const updateData = (tableName: string, attribute: string, currentValue: string, newValue: string): boolean => {
  try {
    const tableData = JSON.parse(localStorage.getItem(tableName) || '[]');
    
    const recordIndex = tableData.findIndex((item: any) => 
      item[attribute] && item[attribute].toString() === currentValue
    );
    
    if (recordIndex === -1) {
      return false;
    }
    
    tableData[recordIndex][attribute] = newValue;
    localStorage.setItem(tableName, JSON.stringify(tableData));
    
    // Log transaction
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const query = `UPDATE ${tableName} SET ${attribute} = '${newValue}' WHERE ${attribute} = '${currentValue}'`;
    transactions.push({
      type: 'UPDATE',
      table: tableName,
      query: query,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    return true;
  } catch (error) {
    console.error('Error updating data:', error);
    return false;
  }
};

export const deleteData = (tableName: string, attribute: string, value: string): boolean => {
  try {
    const tableData = JSON.parse(localStorage.getItem(tableName) || '[]');
    
    const filteredData = tableData.filter((item: any) => 
      !(item[attribute] && item[attribute].toString() === value)
    );
    
    if (filteredData.length === tableData.length) {
      return false; // No records were deleted
    }
    
    localStorage.setItem(tableName, JSON.stringify(filteredData));
    
    // Log transaction
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const query = `DELETE FROM ${tableName} WHERE ${attribute} = '${value}'`;
    transactions.push({
      type: 'DELETE',
      table: tableName,
      query: query,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    return true;
  } catch (error) {
    console.error('Error deleting data:', error);
    return false;
  }
};

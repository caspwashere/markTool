import React, { useState, useCallback } from 'react';
import { Upload, FileSpreadsheet, X, Download, Users, Database, CheckCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';


type AllowedHeaders = 'admissionNo' | 'surname' | 'name';
type AllowedHeadersArray = AllowedHeaders[];

type LearnerData = [admissionNo: string, surname: string, name: string];

const UploadView = () => {
  const [data, setData] = useState<LearnerData[]>([]);
  const [headers, setHeaders] = useState<AllowedHeadersArray>([]);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle file processing
  const processFile = async (file: File) => {
    setIsLoading(true);
    setError('');

    // Inside your async function:
    try {
      const arrayBuffer = await file.arrayBuffer();

      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheetName];

      const jsonData: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (jsonData.length < 2) throw new Error("Excel file must have headers and at least one data row");

      // Validate headers (optional)
      const rawHeaders = jsonData[0];
      const lowerHeaders = rawHeaders.map((h: string) => h.toLowerCase());
      const isValid = ['admissionno', 'surname', 'name'].every(h => lowerHeaders.includes(h));
      if (!isValid) throw new Error('Invalid headers: expected admissionNo, surname, name');

      const sampleHeaders: AllowedHeadersArray = ['admissionNo', 'surname', 'name'];
      const sampleData: LearnerData[] = jsonData.slice(1).map(row => [
        row[0]?.toString() || '',
        row[1]?.toString() || '',
        row[2]?.toString() || ''
      ]);

      setHeaders(sampleHeaders);
      setData(sampleData);
      setFileName(file.name);

      // Redirect to /edit with state
      navigate('/edit', {
        state: {
          headers: sampleHeaders,
          data: sampleData,
          fileName: file.name
        }
      });
    } catch (err: any) {
      setError(err.message || 'Error processing file');
      setData([]);
      setHeaders([]);
      setFileName('');
    } finally {
      setIsLoading(false);
    }
  };

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const excelFile = files.find(file => 
      file.type.includes('spreadsheet') || 
      file.name.endsWith('.xlsx') || 
      file.name.endsWith('.xls')
    );

    if (excelFile) {
      processFile(excelFile);
    } else {
      setError('Please drop a valid Excel file');
    }
  }, []);

  // File input handler
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Clear data
  const clearData = () => {
    setData([]);
    setHeaders([]);
    setFileName('');
    setError('');
  };

  // Export functionality (demo)
  const exportData = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }
    // Combine headers and data
    const worksheetData = [headers, ...data];
    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    // Create a workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // Trigger a file download
    XLSX.writeFile(workbook, "learners_results.xlsx");
  };

  const getHeaderDisplayName = (header: AllowedHeaders): string => {
    const displayNames = {
      admissionNo: 'Admission Number',
      surname: 'Surname',
      name: 'Name'
    };
    return displayNames[header];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 p-4 md:p-8">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-teal-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-green-300 rounded-full opacity-25 animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent mb-4">
            Learner Data Viewer
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Upload your Excel files and visualize learner data
          </p>
        </div>

        {/* Upload Area */}
        {!data.length && (
          <div
            className={`group relative border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-500 ${
              isDragging
                ? 'border-emerald-400 bg-emerald-50 scale-105 shadow-2xl'
                : 'border-emerald-200 bg-white/70 backdrop-blur-sm hover:border-emerald-300 hover:bg-emerald-25 hover:shadow-xl'
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-8">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="p-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-16 h-16 text-emerald-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-500 rounded-full animate-ping"></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  Drop your Excel file here
                </h3>
                <p className="text-gray-600 text-lg">
                  or click anywhere to browse and select a file
                </p>
                <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105">
                  <FileSpreadsheet className="w-6 h-6 mr-3" />
                  <span className="font-semibold">Choose Excel File</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                  Supports .xlsx files
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                  Supports .xls files
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mb-8">
              <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Processing Your File</h3>
            <p className="text-gray-500">Please wait while we analyze your Excel data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-6 mb-8 shadow-sm">
            <div className="flex items-center">
              <X className="w-6 h-6 text-red-500 mr-3" />
              <div>
                <h4 className="font-semibold text-red-800">Upload Error</h4>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Data Display */}
        {data.length > 0 && (
          <div className="space-y-8">
            {/* File Info Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                    <FileSpreadsheet className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{fileName}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {data.length} learners
                      </div>
                      <div className="flex items-center">
                        <Database className="w-4 h-4 mr-1" />
                        {headers.length} fields
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={exportData}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Export Data
                  </button>
                  <button
                    onClick={clearData}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-500 to-teal-600">
                      {headers.map((header, index) => (
                        <th
                          key={index}
                          className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
                        >
                          {getHeaderDisplayName(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-50">
                    {data.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="hover:bg-emerald-25 transition-colors duration-200 group"
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-8 py-5 text-sm text-gray-800 group-hover:text-emerald-800 transition-colors duration-200"
                          >
                            <div className="font-medium">{cell}</div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Enhanced Data Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">Total Learners</p>
                    <p className="text-3xl font-bold">{data.length}</p>
                  </div>
                  <Users className="w-10 h-10 text-emerald-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-teal-100 text-sm font-medium">Data Fields</p>
                    <p className="text-3xl font-bold">{headers.length}</p>
                  </div>
                  <Database className="w-10 h-10 text-teal-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Status</p>
                    <p className="text-xl font-bold">Ready</p>
                  </div>
                  <CheckCircle className="w-10 h-10 text-green-200" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadView;
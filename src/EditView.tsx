import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

type MarkEntry = {
  task1: string;
  task2: string;
  task3q1: string;
  task3q2: string;
  task3q3: string;
};

export default function EditView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { headers = [], data = [], fileName = '' } = location.state || {};
  const [marks, setMarks] = useState<MarkEntry[]>(
    data.map(() => ({
        task1: '',
        task2: '',
        task3q1: '',
        task3q2: '',
        task3q3: '',
    }))
    );
const handleMarkChange = (index: number, task: string, value: string) => {
   setMarks(prev => {
    const updated = [...prev];
    updated[index] = { ...updated[index], [task]: value };
    return updated;
  });
};

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 p-6">
  <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-x-auto p-8 border border-emerald-100">
    {/* Back Button */}
    <div className="mb-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-md shadow hover:from-emerald-600 hover:to-teal-600 transition"
      >
        ← Back to Upload
      </button>
    </div>

    <h2 className="text-3xl font-extrabold text-center text-emerald-700 mb-8">
      Editing: {fileName}
    </h2>

    <table className="w-full text-sm border-separate border-spacing-0">
      <thead>
        <tr className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
          {headers.map((h, i) => (
            <th key={i} className="px-6 py-3 text-left font-semibold border border-emerald-600">
              {h}
            </th>
          ))}
          <th className="px-6 py-3 text-left font-semibold border border-emerald-600">
            Task 1<br />
            <span className="text-emerald-100 text-xs">(10)</span>
          </th>
          <th className="px-6 py-3 text-left font-semibold border border-emerald-600">
            Task 2<br />
            <span className="text-emerald-100 text-xs">(30)</span>
          </th>
          <th className="px-6 py-3 text-left font-semibold border border-emerald-600">
            Task 3 - Q1<br />
            <span className="text-emerald-100 text-xs">(20)</span>
          </th>
          <th className="px-6 py-3 text-left font-semibold border border-emerald-600">
            Task 3 - Q2<br />
            <span className="text-emerald-100 text-xs">(10)</span>
          </th>
          <th className="px-6 py-3 text-left font-semibold border border-emerald-600">
            Task 3 - Q3<br />
            <span className="text-emerald-100 text-xs">(10)</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={i}
            className="odd:bg-white even:bg-emerald-50 hover:bg-emerald-100 transition duration-200"
          >
            {row.map((cell, j) => (
              <td key={j} className="border border-emerald-200 px-4 py-3 text-gray-700">
                {cell}
              </td>
            ))}
            <td className="border border-emerald-200 px-4 py-2">
              <input
                type="number"
                max={10}
                value={marks[i]?.task1 || ''}
                onChange={(e) => handleMarkChange(i, 'task1', e.target.value)}
                className="w-full border border-emerald-300 rounded-md px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </td>
            <td className="border border-emerald-200 px-4 py-2">
              <input
                type="number"
                max={30}
                value={marks[i]?.task2 || ''}
                onChange={(e) => handleMarkChange(i, 'task2', e.target.value)}
                className="w-full border border-emerald-300 rounded-md px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </td>
            <td className="border border-emerald-200 px-4 py-2">
              <input
                type="number"
                max={20}
                value={marks[i]?.task3q1 || ''}
                onChange={(e) => handleMarkChange(i, 'task3q1', e.target.value)}
                className="w-full border border-emerald-300 rounded-md px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </td>
            <td className="border border-emerald-200 px-4 py-2">
              <input
                type="number"
                max={10}
                value={marks[i]?.task3q2 || ''}
                onChange={(e) => handleMarkChange(i, 'task3q2', e.target.value)}
                className="w-full border border-emerald-300 rounded-md px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </td>
            <td className="border border-emerald-200 px-4 py-2">
              <input
                type="number"
                max={10}
                value={marks[i]?.task3q3 || ''}
                onChange={(e) => handleMarkChange(i, 'task3q3', e.target.value)}
                className="w-full border border-emerald-300 rounded-md px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Back Button */}
    <div className="mb-6 mt-5">
      <button
        onClick={() => {
            navigate('/results', {
  state: {
    data,   // learners data (array of arrays with Admission No, Surname, Name, etc.)
    marks,  // array of marks objects for all tasks and subtasks
  }
});
        }}
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-md shadow hover:from-emerald-600 hover:to-teal-600 transition"
      >
        Submit Results
      </button>
    </div>
    
  </div>
</div>
  );
}

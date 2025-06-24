import { useLocation, useNavigate } from 'react-router-dom';

type MarkEntry = {
  task1: string;
  task2: string;
  task3q1: string;
  task3q2: string;
  task3q3: string;
};

export default function ResultsView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data = [] as string[][], marks = [] as MarkEntry[] } = location.state || {};

  const formatMarkPct = (markStr: string, max: number) => {
    const mark = parseFloat(markStr) || 0;
    const pct = ((mark / max) * 100).toFixed(1);
    return { mark, pct };
  };

  const getCodeFromPct = (pct: number): string => {
    if (pct >= 80) return '7';
    if (pct >= 70) return '6';
    if (pct >= 60) return '5';
    if (pct >= 50) return '4';
    if (pct >= 40) return '3';
    if (pct >= 30) return '2';
    return '1';
  };

  const getAverage = (key: keyof MarkEntry, max: number) => {
  const total = marks.reduce((sum, entry) => sum + (parseFloat(entry?.[key] || '0') || 0), 0);
  const avgMark = (total / marks.length).toFixed(1);
  const avgPct = ((parseFloat(avgMark) / max) * 100).toFixed(1);
  return { mark: avgMark, pct: avgPct };
};

const avgT1 = getAverage('task1', 10);
const avgT2 = getAverage('task2', 30);
const avgT3q1 = getAverage('task3q1', 20);
const avgT3q2 = getAverage('task3q2', 10);
const avgT3q3 = getAverage('task3q3', 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-emerald-100">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-md shadow hover:from-emerald-600 hover:to-teal-600 transition"
        >
          ← Back to Edit
        </button>

        <h2 className="text-3xl font-extrabold text-emerald-700 mb-8 text-center">Results</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-emerald-300 rounded-lg table-fixed">
            <thead>
              <tr className="bg-emerald-200 text-emerald-900">
                <th
                  className="border border-emerald-300 px-2 py-1 max-w-[90px] truncate whitespace-nowrap overflow-hidden"
                  rowSpan={3}
                  style={{ width: 90 }}
                >
                  Admission No
                </th>
                <th
                  className="border border-emerald-300 px-2 py-1 max-w-[120px] truncate whitespace-nowrap overflow-hidden"
                  rowSpan={3}
                  style={{ width: 120 }}
                >
                  Surname
                </th>
                <th
                  className="border border-emerald-300 px-2 py-1 max-w-[120px] truncate whitespace-nowrap overflow-hidden"
                  rowSpan={3}
                  style={{ width: 120 }}
                >
                  Name
                </th>

                <th className="border border-emerald-300 px-2 py-1 text-center" colSpan={3}>
                  Task 1 (10)
                </th>
                <th className="border border-emerald-300 px-2 py-1 text-center" colSpan={3}>
                  Task 2 (30)
                </th>
                <th className="border border-emerald-300 px-2 py-1 text-center" colSpan={9}>
                  Task 3 (40)
                </th>
              </tr>

              <tr className="bg-emerald-100 text-emerald-900">
                {/* Task 1 */}
                <th className="border border-emerald-300 px-2 py-1 text-center" rowSpan={2}>
                  Mark
                </th>
                <th className="border border-emerald-300 px-2 py-1 text-center" rowSpan={2}>
                  %
                </th>
                <th className="border border-emerald-300 px-2 py-1 text-center" rowSpan={2}>
                  Code
                </th>

                {/* Task 2 */}
                <th className="border border-emerald-300 px-2 py-1 text-center" rowSpan={2}>
                  Mark
                </th>
                <th className="border border-emerald-300 px-2 py-1 text-center" rowSpan={2}>
                  %
                </th>
                <th className="border border-emerald-300 px-2 py-1 text-center" rowSpan={2}>
                  Code
                </th>

                {/* Task 3 subtasks */}
                <th className="border border-emerald-300 px-2 py-1 text-center" colSpan={3}>
                  Q1 (20)
                </th>
                <th className="border border-emerald-300 px-2 py-1 text-center" colSpan={3}>
                  Q2 (10)
                </th>
                <th className="border border-emerald-300 px-2 py-1 text-center" colSpan={3}>
                  Q3 (10)
                </th>
              </tr>

              <tr className="bg-emerald-100 text-emerald-900">
                {/* Task 3 Q1 */}
                <th className="border border-emerald-300 px-2 py-1 text-center">Mark</th>
                <th className="border border-emerald-300 px-2 py-1 text-center">%</th>
                <th className="border border-emerald-300 px-2 py-1 text-center">Code</th>

                {/* Task 3 Q2 */}
                <th className="border border-emerald-300 px-2 py-1 text-center">Mark</th>
                <th className="border border-emerald-300 px-2 py-1 text-center">%</th>
                <th className="border border-emerald-300 px-2 py-1 text-center">Code</th>

                {/* Task 3 Q3 */}
                <th className="border border-emerald-300 px-2 py-1 text-center">Mark</th>
                <th className="border border-emerald-300 px-2 py-1 text-center">%</th>
                <th className="border border-emerald-300 px-2 py-1 text-center">Code</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, i) => {
                const admissionNo = row[0] || '';
                const surname = row[1] || '';
                const name = row[2] || '';

                const t1 = formatMarkPct(marks[i]?.task1 || '', 10);
                const t2 = formatMarkPct(marks[i]?.task2 || '', 30);
                const t3q1 = formatMarkPct(marks[i]?.task3q1 || '', 20);
                const t3q2 = formatMarkPct(marks[i]?.task3q2 || '', 10);
                const t3q3 = formatMarkPct(marks[i]?.task3q3 || '', 10);

                return (
                  <tr
                    key={i}
                    className="odd:bg-white even:bg-emerald-50 hover:bg-emerald-100 transition duration-200"
                  >
                    <td className="border border-emerald-300 px-2 py-1 font-semibold text-emerald-700 truncate whitespace-nowrap overflow-hidden">
                      {admissionNo}
                    </td>
                    <td className="border border-emerald-300 px-2 py-1 truncate whitespace-nowrap overflow-hidden">
                      {surname}
                    </td>
                    <td className="border border-emerald-300 px-2 py-1 truncate whitespace-nowrap overflow-hidden">
                      {name}
                    </td>

                    {/* Task 1 */}
                    <td className="border border-emerald-300 px-2 py-1 text-center">{t1.mark}</td>
                    <td className="border border-emerald-300 px-2 py-1 text-center">{t1.pct}%</td>
                    <td className="border border-emerald-300 px-2 py-1 text-center">{getCodeFromPct(+t1.pct)}</td>

                    {/* Task 2 */}
                    <td className="border border-emerald-300 px-2 py-1 text-center">{t2.mark}</td>
                    <td className="border border-emerald-300 px-2 py-1 text-center">{t2.pct}%</td>
                    <td className="border border-emerald-300 px-2 py-1 text-center">{getCodeFromPct(+t2.pct)}</td>

                    {/* Task 3 Q1 */}
                    <td className="border border-emerald-300 px-2 py-1 text-center">{t3q1.mark}</td>
                    <td className="border border-emerald-300 px-2 py-1 text-center">{t3q1.pct}%</td>
                    <td className="border border-emerald-300 px-2 py-1 text-center">{getCodeFromPct(+t3q1.pct)}</td>

                    {/* Task 3 Q2 */}
                    <td className="border border-emerald-300 px-2 py-1 text-center">{t3q2.mark}</td>
                    <td className="border border-emerald-300 px-2 py-1 text-center">{t3q2.pct}%</td>
                    <td className="border border-emerald-300 px-2 py-1 text-center">{getCodeFromPct(+t3q2.pct)}</td>

                    {/* Task 3 Q3 */}
                    <td className="border border-emerald-300 px-2 py-1 text-center">{t3q3.mark}</td>
                    <td className="border border-emerald-300 px-2 py-1 text-center">{t3q3.pct}%</td>
                    <td className="border border-emerald-300 px-2 py-1 text-center">{getCodeFromPct(+t3q3.pct)}</td>
                  </tr>
                );
              })}

              <tr className="bg-emerald-200 text-emerald-900 font-semibold">
  <td className="border border-emerald-300 px-2 py-1 text-center" colSpan={3}>
    Class Average
  </td>

  {/* Task 1 */}
  <td className="border border-emerald-300 px-2 py-1 text-center">{avgT1.mark}</td>
  <td className="border border-emerald-300 px-2 py-1 text-center">{avgT1.pct}%</td>
  <td className="border border-emerald-300 px-2 py-1 text-center">-</td>

  {/* Task 2 */}
  <td className="border border-emerald-300 px-2 py-1 text-center">{avgT2.mark}</td>
  <td className="border border-emerald-300 px-2 py-1 text-center">{avgT2.pct}%</td>
  <td className="border border-emerald-300 px-2 py-1 text-center">-</td>

  {/* Task 3 Q1 */}
  <td className="border border-emerald-300 px-2 py-1 text-center">{avgT3q1.mark}</td>
  <td className="border border-emerald-300 px-2 py-1 text-center">{avgT3q1.pct}%</td>
  <td className="border border-emerald-300 px-2 py-1 text-center">-</td>

  {/* Task 3 Q2 */}
  <td className="border border-emerald-300 px-2 py-1 text-center">{avgT3q2.mark}</td>
  <td className="border border-emerald-300 px-2 py-1 text-center">{avgT3q2.pct}%</td>
  <td className="border border-emerald-300 px-2 py-1 text-center">-</td>

  {/* Task 3 Q3 */}
  <td className="border border-emerald-300 px-2 py-1 text-center">{avgT3q3.mark}</td>
  <td className="border border-emerald-300 px-2 py-1 text-center">{avgT3q3.pct}%</td>
  <td className="border border-emerald-300 px-2 py-1 text-center">-</td>
</tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

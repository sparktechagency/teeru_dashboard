import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";
import { IMonthlyStats } from "../Dashboard/Overview/UserOverview";
import { FadeLoader } from "react-spinners";

const Admin_Line_Chart = ({
  monthlyOverview,
  isFetching,
}: {
  monthlyOverview: IMonthlyStats[];
  isFetching: boolean;
}) => {
  if (isFetching) {
    return (
      <div className="h-96 flex items-center justify-center">
        <FadeLoader color="#507D18" />
      </div>
    );
  }
  return (
    <div className="w-full h-96 py-5 ">
      <ResponsiveContainer>
        <LineChart
          data={monthlyOverview}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#00000040" />
          <XAxis dataKey="monthName" />
          <YAxis
            domain={[0, (dataMax: number) => (dataMax > 1000 ? dataMax : 1000)]}
          />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="companies"
            stroke="#19363D" // Blue for companies
            strokeWidth={4}
            dot={{
              r: 0,
              stroke: "#19363D",
              strokeWidth: 0,
              fill: "#00000040",
            }} // Blue dots with white fill
            activeDot={{ r: 10 }} // Active dot style
          />
          <Line
            type="monotone"
            dataKey="userCount"
            stroke="#1EA94C" // Teal for service userCount
            strokeWidth={4}
            dot={{ r: 0, stroke: "#1EA94C", strokeWidth: 0, fill: "#00000040" }} // Teal dots with white fill
            activeDot={{ r: 10 }}
          />
          <Line
            type="monotone"
            dataKey="totalEarnings"
            stroke="#ACD03D" // Yellow for totalEarningss
            strokeWidth={4}
            dot={{ r: 0, stroke: "#ACD03D", strokeWidth: 0, fill: "#00000040" }} // Yellow dots with white fill
            activeDot={{ r: 10 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Admin_Line_Chart;

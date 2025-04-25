import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";

const data = [
  {
    name: "Jan",
    users: 300,
    earning: 100,
  },
  {
    name: "Feb",
    users: 900,
    earning: 700,
  },
  {
    name: "Mar",
    users: 500,
    earning: 300,
  },
  {
    name: "Apr",
    users: 800,
    earning: 600,
  },
  {
    name: "May",
    users: 1200,
    earning: 1000,
  },
  {
    name: "Jun",
    users: 1000,
    earning: 800,
  },
  {
    name: "Jul",
    users: 600,
    earning: 400,
  },
  {
    name: "Aug",
    users: 400,
    earning: 200,
  },
  {
    name: "Sep",
    users: 1100,
    earning: 900,
  },
  {
    name: "Oct",
    users: 800,
    earning: 600,
  },
  {
    name: "Nov",
    users: 600,
    earning: 400,
  },
  {
    name: "Dec",
    users: 1200,
    earning: 1000,
  },
];
const Admin_Line_Chart = () => {
  return (
    <div className="w-full h-96 py-5 ">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#00000040" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, "max"]} />
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
            dataKey="users"
            stroke="#1EA94C" // Teal for service users
            strokeWidth={4}
            dot={{ r: 0, stroke: "#1EA94C", strokeWidth: 0, fill: "#00000040" }} // Teal dots with white fill
            activeDot={{ r: 10 }}
          />
          <Line
            type="monotone"
            dataKey="earning"
            stroke="#ACD03D" // Yellow for earnings
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

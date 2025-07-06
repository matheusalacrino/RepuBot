const MetricCard = ({ title, value, change, icon, positive = false }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <div className="p-1.5 rounded-lg bg-gray-100">{icon}</div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-sm mt-1 ${positive ? "text-green-600" : "text-gray-600"}`}>
        {change}
      </p>
    </CardContent>
  </Card>
);

export default MetricCard;
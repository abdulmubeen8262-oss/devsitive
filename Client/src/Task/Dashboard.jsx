import DashboardNavbar from "../Task/DashboardNavbar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome to VetScribeAI
        </h1>

        <p className="mt-2 text-gray-500">
          Your dashboard is ready.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;

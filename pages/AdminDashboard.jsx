import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { adminService } from "../API_Services/index.js";
import { Button, Card, Badge, Spinner } from "../components/ui/index.jsx";

const PIE_COLORS = ["#4f46e5", "#7c3aed", "#2563eb", "#0891b2", "#059669"];

export default function AdminDashboard() {
  const queryClient = useQueryClient();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: () => adminService.getStats().then((r) => r.data),
  });

  const { data: pendingJobs, isLoading: jobsLoading } = useQuery({
    queryKey: ["pendingJobs"],
    queryFn: () => adminService.getPendingJobs().then((r) => r.data),
  });

  const { data: usersData } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: () => adminService.getAllUsers({ limit: 10 }).then((r) => r.data),
  });

  const jobStatusMutation = useMutation({
    mutationFn: ({ id, status }) => adminService.updateJobStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingJobs"]);
      queryClient.invalidateQueries(["adminStats"]);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id) => adminService.deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries(["adminUsers"]),
  });

  if (statsLoading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Users", value: stats?.totalUsers },
          { label: "Active Jobs", value: stats?.totalJobs },
          { label: "Applications", value: stats?.totalApplications },
          { label: "Pending Review", value: stats?.pendingJobs, highlight: true },
        ].map(({ label, value, highlight }) => (
          <Card key={label} className="text-center !p-4">
            <p className={`text-2xl font-bold ${highlight ? "text-orange-500" : "text-primary-600"}`}>
              {value ?? "—"}
            </p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Applications trend */}
        <Card>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Applications (Last 7 Days)</h2>
          {stats?.applicationsTrend?.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.applicationsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="_id" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No data yet</div>
          )}
        </Card>

        {/* Jobs by type */}
        <Card>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Jobs by Type</h2>
          {stats?.jobsByType?.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={stats.jobsByType}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {stats.jobsByType.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No data yet</div>
          )}
        </Card>
      </div>

      {/* Pending jobs */}
      <Card className="mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Pending Job Approvals
          {stats?.pendingJobs > 0 && (
            <span className="ml-2 bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full">
              {stats.pendingJobs}
            </span>
          )}
        </h2>

        {jobsLoading ? (
          <Spinner />
        ) : pendingJobs?.length === 0 ? (
          <p className="text-sm text-gray-400 py-4 text-center">All caught up! No pending jobs.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {pendingJobs?.map((job) => (
              <div key={job._id} className="flex items-start justify-between gap-4 p-3 bg-gray-50 rounded-lg flex-wrap">
                <div>
                  <p className="font-medium text-gray-900">{job.title}</p>
                  <p className="text-sm text-gray-500">
                    {job.company} · {job.postedBy?.name} ({job.postedBy?.email})
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="text-xs"
                    onClick={() => jobStatusMutation.mutate({ id: job._id, status: "approved" })}
                    loading={jobStatusMutation.isPending}
                  >
                    ✓ Approve
                  </Button>
                  <Button
                    variant="danger"
                    className="text-xs"
                    onClick={() => jobStatusMutation.mutate({ id: job._id, status: "rejected" })}
                    loading={jobStatusMutation.isPending}
                  >
                    ✗ Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Recent users */}
      <Card>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 px-2 text-xs text-gray-400 font-medium">User</th>
                <th className="text-left py-2 px-2 text-xs text-gray-400 font-medium">Role</th>
                <th className="text-left py-2 px-2 text-xs text-gray-400 font-medium">Verified</th>
                <th className="text-left py-2 px-2 text-xs text-gray-400 font-medium">Joined</th>
                <th className="py-2 px-2" />
              </tr>
            </thead>
            <tbody>
              {usersData?.users?.map((user) => (
                <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 px-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={user.photo || `https://ui-avatars.com/api/?name=${user.name}&size=28&background=4f46e5&color=fff`}
                        alt={user.name}
                        className="w-7 h-7 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-2">
                    <Badge color={user.role === "admin" ? "purple" : user.role === "recruiter" ? "blue" : "gray"}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="py-2.5 px-2">
                    <span className={user.isVerified ? "text-green-500" : "text-red-400"}>
                      {user.isVerified ? "✓" : "✗"}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-xs text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    {user.role !== "admin" && (
                      <Button
                        variant="danger"
                        className="text-xs !py-1"
                        onClick={() => {
                          if (confirm(`Delete ${user.name}? This cannot be undone.`)) {
                            deleteUserMutation.mutate(user._id);
                          }
                        }}
                        loading={deleteUserMutation.isPending}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Users, Plus, ShieldAlert, Trash2, ShieldCheck, Mail, Calendar } from "lucide-react";
import UserActions from "./UserActions";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== "ADMIN") return null;

  // Fetch all users
  const res = await pool.query(
    `SELECT id, name, email, role, "isBlocked", "emailVerified", "createdAt" FROM users ORDER BY "createdAt" DESC`
  );
  // Default to empty array if no results or createdAt missing from old schema
  const users = res.rows.map(user => ({
    ...user,
    createdAt: user.createdAt || new Date()
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-2">Manage Users</h1>
          <p className="font-body text-base text-ink-500">View and manage students, instructors, and admins.</p>
        </div>
        <Button variant="primary" href="/admin/users/new" className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Create User
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-ink-100 shadow-card overflow-hidden">
        <div className="p-6 border-b border-ink-100 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
            <Users className="h-5 w-5 text-brand-blue" />
            Platform Users ({users.length})
          </h2>
        </div>

        {users.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="font-display text-lg font-bold text-ink-900 mb-2">No users found</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-ink-50/50 border-b border-ink-100">
                  <th className="p-4 font-heading text-xs font-semibold text-ink-500 uppercase tracking-wider">User</th>
                  <th className="p-4 font-heading text-xs font-semibold text-ink-500 uppercase tracking-wider">Role</th>
                  <th className="p-4 font-heading text-xs font-semibold text-ink-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 font-heading text-xs font-semibold text-ink-500 uppercase tracking-wider">Joined</th>
                  <th className="p-4 font-heading text-xs font-semibold text-ink-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-ink-50/30 transition-colors">
                    <td className="p-4">
                      <div className="flex flex-col">
                        <Link href={`/admin/users/${user.id}`} className="font-display font-bold text-ink-900 hover:text-brand-blue transition-colors">
                          {user.name || "Unknown"}
                        </Link>
                        <span className="text-sm text-ink-500 flex items-center gap-1 mt-0.5">
                          <Mail className="h-3 w-3" /> {user.email}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'INSTRUCTOR' ? 'bg-brand-blue/10 text-brand-blue' :
                        'bg-ink-100 text-ink-700'
                      }`}>
                        {user.role || 'STUDENT'}
                      </span>
                    </td>
                    <td className="p-4">
                      {user.isBlocked ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md">
                          <ShieldAlert className="h-3 w-3" /> Blocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                          <ShieldCheck className="h-3 w-3" /> Active
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-ink-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-ink-400" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      {user.id !== session.user.id && (
                        <UserActions userId={user.id} isBlocked={user.isBlocked || false} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

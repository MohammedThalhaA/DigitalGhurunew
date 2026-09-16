import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import PrintInvoice from "@/components/student/PrintInvoice";
import Image from "next/image";

export default async function InvoicePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  // Fetch enrollment details
  let enrollment = null;

  try {
    // We only allow users to view their own invoices, or admins to view any.
    const enrRes = await pool.query(
      `SELECT e.*, c.title as "courseTitle", u.name, u.email, u.id as "userId" 
       FROM enrollments e 
       JOIN courses c ON e."courseId" = c.id 
       JOIN users u ON e."userId" = u.id
       WHERE e.id = $1`,
      [params.id]
    );

    if (enrRes.rows.length === 0) {
      return <div className="p-10 text-center font-heading text-red-500">Invoice not found or invalid enrollment ID.</div>;
    }

    enrollment = enrRes.rows[0];

    if ((session.user as any).role !== "ADMIN" && enrollment.userId.toString() !== session.user.id.toString()) {
      return <div className="p-10 text-center font-heading text-red-500">Unauthorized. You cannot view this invoice.</div>;
    }

  } catch (error) {
    console.error("Failed to fetch invoice:", error);
    return <div className="p-10 text-center font-heading text-red-500">Database error occurred.</div>;
  }

  const invoiceNumber = `INV-${new Date(enrollment.createdAt).getFullYear()}-${enrollment.id.toString().padStart(5, '0')}`;
  const dateFormatted = new Date(enrollment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  // Calculate fake tax for display (e.g. 18% GST)
  const total = parseFloat(enrollment.pricePaid);
  const basePrice = total / 1.18;
  const taxAmount = total - basePrice;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 print:py-0 print:bg-white">
      {/* Client component to trigger window.print() */}
      <PrintInvoice />
      
      {/* Screen-only back button */}
      <div className="w-full max-w-[800px] mb-6 print:hidden flex justify-between items-center px-4">
        <a href="/student/profile" className="text-brand-blue hover:underline font-heading font-semibold text-sm">
          &larr; Back to Profile
        </a>
        <button 
          className="bg-gradient-to-r from-[#FFB800] to-[#FF5C00] text-white px-6 py-2 rounded-lg font-heading font-bold hover:brightness-110 shadow-md transition-all"
        >
          Print / Save PDF
        </button>
      </div>

      <div className="w-full max-w-[800px] bg-white rounded-2xl shadow-xl print:shadow-none print:rounded-none p-10 md:p-16 text-ink-900 border border-ink-100 print:border-none print:p-0">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-16 border-b border-ink-100 pb-8 print:mb-8 print:pb-4">
          <div>
            <Image 
              src="/logo-final dG.webp" 
              alt="Digital Ghuru Logo" 
              width={220} 
              height={80} 
              className="h-20 w-auto object-contain mb-4"
              priority
            />
            <p className="font-body text-sm text-ink-500 max-w-[200px]">
              Advanced Digital Marketing & IT Training Institute
            </p>
          </div>
          <div className="text-right">
            <h1 className="font-display text-4xl font-bold text-brand-blue mb-2 uppercase tracking-wide">Invoice</h1>
            <p className="font-heading text-sm font-bold text-ink-600 mb-1">Invoice #: <span className="text-ink-900">{invoiceNumber}</span></p>
            <p className="font-heading text-sm font-bold text-ink-600">Date: <span className="text-ink-900">{dateFormatted}</span></p>
          </div>
        </div>

        {/* Billing Info */}
        <div className="flex justify-between mb-16 print:mb-8">
          <div>
            <h3 className="font-heading text-xs font-bold text-brand-orange uppercase tracking-[0.15em] mb-4 print:mb-2">Billed To</h3>
            <p className="font-heading text-lg font-bold text-ink-900 mb-1">{enrollment.name}</p>
            <p className="font-body text-sm text-ink-600">{enrollment.email}</p>
          </div>
          <div className="text-right">
            <h3 className="font-heading text-xs font-bold text-brand-orange uppercase tracking-[0.15em] mb-4 print:mb-2">Pay To</h3>
            <p className="font-heading text-lg font-bold text-ink-900 mb-1">Digital Ghuru</p>
            <p className="font-body text-sm text-ink-600">contact@digitalghuru.in</p>
            <p className="font-body text-sm text-ink-600">GSTIN: 29XXXXX9999X1Z5</p>
          </div>
        </div>

        {/* Line Items */}
        <div className="mb-16 print:mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-y-2 border-ink-900">
                <th className="py-4 px-2 font-heading text-xs font-bold text-ink-900 uppercase tracking-wider">Item Description</th>
                <th className="py-4 px-2 font-heading text-xs font-bold text-ink-900 uppercase tracking-wider text-center">Qty</th>
                <th className="py-4 px-2 font-heading text-xs font-bold text-ink-900 uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="py-6 px-2">
                  <p className="font-heading font-bold text-ink-900">{enrollment.courseTitle}</p>
                  <p className="font-body text-sm text-ink-500 mt-1">Full Lifetime Access + Certifications</p>
                </td>
                <td className="py-6 px-2 text-center font-body text-ink-900">1</td>
                <td className="py-6 px-2 text-right font-body font-bold text-ink-900">
                  ₹{basePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-16 print:mb-8">
          <div className="w-64 space-y-4 print:space-y-2">
            <div className="flex justify-between text-sm font-heading text-ink-600">
              <span>Subtotal:</span>
              <span className="font-bold text-ink-900">₹{basePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm font-heading text-ink-600">
              <span>GST (18%):</span>
              <span className="font-bold text-ink-900">₹{taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t-2 border-ink-900 pt-4 flex justify-between font-heading text-lg text-ink-900">
              <span className="font-bold">Total Paid:</span>
              <span className="font-black text-brand-blue">₹{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-ink-100 pt-8 text-center text-sm font-body text-ink-400 print:pt-4">
          <p>Thank you for choosing Digital Ghuru. This is a computer generated invoice and does not require a physical signature.</p>
        </div>

      </div>
    </div>
  );
}
